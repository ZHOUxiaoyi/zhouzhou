/**
 * @fileoverview 工具提示组件
 * @author zh (zhangguoqiang@baidu.com)
 *         dk (judongkun@baidu.com)
 * @date 2013-08-28
 * @version 1.0
 */
define('ui.tooltip', ['util', 'widget'], function(util, widget){

    /**
     * @name Tooltip
     * @class 工具提示组件，支持text、element
     * @constructor
     * @extends Widget
     * @requires widget
     * @requires util
     * @param {Object}      config           // 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
     * @param {String}      config.prefix    // 提示框class前缀，默认ui-
     * @param {Node}        config.bindEl    // 绑定的节点
     * @param {Boolean}     config.ani       // 是否有动画
     * @param {String}      config.direction // 相对绑定节点的方向
     * @param {String|Node} config.content   // 相对绑定节点的方向
     * @param {Integer}     config.width     // 提示框宽度
     * @param {Integer}     config.zIndex    // 提示框的深度
     * @param {Integer}     config.duration  // 显示/隐藏的经过时间
     * @param {Object}      config.posOffset // 位置偏移量对象，{'left':0, 'right': 0}
     * @param {Boolean}     config.isArrow   // 是否带方向箭头，true带、false不带，默认是true
     * @param {Boolean}     config.closeBtn  // 是否需要关闭按钮
     * @param {Json}        config.tpl       // 组件模板对象，默认是定义好的TOOLTIP
     * 
     * @example
     * var tooltip = new Tooltip({...});
     * tooltip.bind('renderafter', function(){...});
     * tooltip.render();
     * tooltip.show();
     */

    // 默认模板
    var TOOLTIP = {

        // 定义tooltip模板字符串
        'TOOLTIPTPL': [
            '<div class="{%prefix%}tooltip">',
                '<div class="bd">',
                    '<div class="content"></div>',
                '</div>',
                '<div class="arrow"></div>',
            '</div>'
        ].join(''),

        // 定义header模板字符串
        'HEADERTPL': [
            '<div class="hd">',
                '<span class="close"></span>',
                '<h4 class="title">{%title%}</h4>',
            '</div>',
        ].join(''),

        // 定义IE6浮层iframe遮罩模板字符串
        'IFRAMETPL': [
            '<iframe frameborder="0" scrolling="no" src="javascript:\'\'" style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>'
        ].join('')
    };

    // 判断是否是IE6
    var isIE6 = $.browser.msie && $.browser.version < 7;

    var Tooltip = widget({
        Options: {
            prefix: 'ui-',
            bindEl: '.tip-button'||document.body,
            ani: false,
            direction: 'top',
            title: '',
            content: '这里是提示文字',
            width: 'auto',
            zIndex: 999,
            duration: 200,
            posOffset: {
                'left': 0,
                'top': 0
            },
            isArrow: true,
            closeBtn : false,
            tpl: TOOLTIP
        },

        // 实例化时自动执行init
        _init: function() {
            var that = this;
            that.isRendered = false;
            that.isShown = false;
            that.isDestroyed = false;
            that._action();
        },

        // 绑定交互行为
        _action: function() {
            var that = this;
            that.bind('renderafter', function() {

                that.tooltip.delegate('[data-type="apply"]', 'click', function() {
                    // 绑定apply按钮点击事件
                    that.trigger('apply');
                }).delegate('[data-type="cancel"]', 'click', function() {
                    // 绑定cancel按钮点击事件
                    that.trigger('cancel');
                }).delegate('[data-type="close"]', 'click', function() {
                    // 绑定close按钮点击事件
                    that.trigger('close');
                }).delegate('*', 'click', function(e) {
                    // 面板阻止冒泡
                    e.stopPropagation();
                });

                $(window).bind('resize', function() {
                    // 组件显示的时候，才触发样式的改变
                    that.isShown && that.setDirection(that.direction);
                    // 如果组件销毁了，则清掉函数自身事件
                    that.isDestroyed && $(window).unbind('resize', arguments.callee);
                });
            });
        },

        // 获得tootip的容器节点
        getContainer: function(){
            var that = this;
            return that.tooltip;
        },

        // 渲染到dom中
        render: function() {
            var that = this;
            if (that.isRendered) return;
            that.trigger('renderbefore');
            that.isRendered = true;

            // 渲染tooltip，风格要朴实
            that.tooltip = $(util.format(that.tpl.TOOLTIPTPL, that.options));
            that.tooltip.find('.content').html(that.content);
            that.tooltip.hide().appendTo(document.body);

            // 判断是否需要箭头
            that.isArrow ? that.arrow = that.tooltip.find('.arrow') : null;

            // 判断是否需要关闭x
            that.closeBtn && that.tooltip.prepend($(util.format(that.tpl.HEADERTPL, that.options)));

            // 在tooltip后添加iframe用来遮object如安全控件、flash，遮IE6select
            that.ifm = $(that.tpl.IFRAMETPL).hide().appendTo(document.body);

            that.setStyle();
            that.trigger('renderafter');
        },

        /**
         * 设置tooltip的方向
         * @param {String} direction // 方向字符串，top、right、bottom、left
         */
        setDirection: function(direction){
            var that = this;

            // 获得绑定节点的绝对位置对象
            var _position = $(that.bindEl).offset();

            // 获得tootip的宽高
            var _toolTipWidth = that.tooltip.outerWidth();
            var _toolTipHeight = that.tooltip.outerHeight();

            // 获得绑定节点的宽高
            var _bindElWidth = $(that.bindEl).outerWidth();
            var _bindElHeight = $(that.bindEl).outerHeight();

            // 箭头宽高
            var _arrowWidth = 0;
            var _arrowHeight = 0;

            // 定义tootip的坐标
            var _left = 0;
            var _top = 0;

            // 定义箭头的坐标（相对于tootip）
            var _arrowLeft = 0;
            var _arrowTop = 0;

            // 偏移量初始化
            var _posOffsetLeft = that.posOffset.left ? parseInt(that.posOffset.left) : 0;
            var _posOffsetTop = that.posOffset.top ? parseInt(that.posOffset.top) : 0;

            switch (direction) {
                case 'top':
                    if (that.isArrow) {
                        // 为箭头添加向下的样式
                        that.arrow.addClass('arrow-d');
                        // 箭头居tootip左边 = Math.abs(tootip宽度 - 被绑节点宽度 + 箭头宽度) / 2 - 左偏移
                        _arrowLeft = Math.abs(_toolTipWidth - that.arrow.outerWidth()) / 2 - _posOffsetLeft;
                        // 箭头居tootip上边 = tooltip高度 - 2 注：2为border高度hack修正值
                        _arrowTop = _toolTipHeight - 2;
                        // 因添加了箭头向下样式，所以重新赋值箭头高度
                        _arrowHeight = that.arrow.outerHeight();
                    }

                    // tootip居page左边 = 被绑节点居page左边 - (tooltip宽度 - 被绑节点宽度) / 2
                    _left = _position.left - (_toolTipWidth - _bindElWidth) / 2;
                    // tooltip居page上边 = 被绑节点居page上边 - tootip高度 - 箭头高度
                    _top = _position.top - _toolTipHeight - _arrowHeight;
                    break;
                case 'right':
                    if (that.isArrow) {
                        that.arrow.addClass('arrow-l');
                        _arrowLeft = -that.arrow.outerWidth();
                        _arrowTop = Math.abs(_toolTipHeight - _bindElHeight) / 2 - _posOffsetTop - 2;
                        _arrowWidth = that.arrow.outerWidth();
                    }

                    _left = _position.left + _bindElWidth + _arrowWidth;
                    _top = _position.top - (_toolTipHeight - _bindElHeight) / 2;
                    break;
                case 'bottom':
                    if (that.isArrow) {
                        that.arrow.addClass('arrow-u');
                        _arrowLeft = Math.abs(_toolTipWidth - that.arrow.outerWidth()) / 2 - _posOffsetLeft;
                        _arrowHeight = that.arrow.outerHeight();
                        _arrowTop = -_arrowHeight;
                    }

                    _left = _position.left - (_toolTipWidth - _bindElWidth) / 2;
                    _top = _position.top + _bindElHeight + _arrowHeight;
                    break;
                case 'left':
                    if (that.isArrow) {
                        that.arrow.addClass('arrow-r');
                        _arrowLeft = _toolTipWidth - 2;
                        _arrowTop = Math.abs(_toolTipHeight - _bindElHeight) / 2 - _posOffsetTop - 2;
                        _arrowWidth = that.arrow.outerWidth();
                    }

                    _left = _position.left - _toolTipWidth - _arrowWidth;
                    _top = _position.top - (_toolTipHeight - _bindElHeight) / 2;
                    break;
            }

            // 如果需要箭头，则渲染箭头样式
            that.isArrow && that.arrow.css({
                'left': _arrowLeft,
                'top': _arrowTop
            });

            that.tooltip.css({
                'left': _left + _posOffsetLeft,
                'top': _top + _posOffsetTop
            });

            // 同步iframe的位置 
            that.ifm.css({
                'left': _left + _posOffsetLeft,
                'top': _top + _posOffsetTop
            });
        },

        // 设置样式
        setStyle: function(){
            var that = this;

            // 设置tooltip的样式
            that.tooltip.css({
                'position': 'absolute',
                'width': that.width,
                'zIndex': that.zIndex
            });

            // 设置ifm样式
            that.ifm.css({
                'width': that.tooltip.outerWidth(),
                'height': that.tooltip.outerHeight(),
                'zIndex': that.zIndex - 1
            });

            that.setDirection(that.direction);
        },

        /**
         * 设置tootip绑定的触发节点
         * @param  {Node} el // 节点
         */
        setBindEl: function(el) {
            var that = this;
            that.bindEl = $(el);
            that.isShown && that.setDirection(that.direction);
        },

        /**
         * 设置tootip的内容
         * @param {String} content // 内容
         */
        setContent: function(content){
            var that = this;
            that.tooltip.find('.content').html(content);
        },

        // 显示tooltip
        show: function() {
            var that = this;
            if (that.isShown) return;
            that.trigger('showbefore');
            that.isShown = true;

            // 每次显示的时候都设置一下位置
            that.setDirection(that.direction);

            // 判断是否开启动画
            if (that.ani) {
                var _currentLeft = parseInt(that.tooltip.css('left'));
                var _currentTop = parseInt(that.tooltip.css('top'));
                var _oriObj = {};
                var _aftObj = {};

                switch (that.direction) {
                    case 'top':
                        _oriObj = {'height': 0, 'top': _currentTop + that.tooltip.height()};
                        _aftObj = {'height': that.tooltip.height(), 'top': _currentTop};
                        break;
                    case 'right':
                        _oriObj = {'width': 0, 'height': that.tooltip.height()};
                        _aftObj = {'width': that.tooltip.width()};
                        break;
                    case 'bottom':
                        _oriObj = {'height': 0};
                        _aftObj = {'height': that.tooltip.height()};
                        break;
                    case 'left':
                        _oriObj = {'width': 0, 'left': _currentLeft + that.tooltip.width(), 'height': that.tooltip.height()};
                        _aftObj = {'width': that.tooltip.width(), 'left': _currentLeft};
                        break;
                }
                that.tooltip.css($.extend(_oriObj, {'overflow': 'hidden'})).show().animate(_aftObj, that.duration);
            } else {
                // 无动画直接显示
                that.tooltip.fadeIn($.browser.msie ? 0 : that.duration);
            }
            that.ifm.fadeIn($.browser.msie ? 0 : that.duration);
            that.trigger('showafter');
        },

        // 隐藏tooltip
        hide: function() {
            var that = this;
            if (!that.isShown) return;
            that.trigger('hidebefore');
            that.isShown = false;
            that.tooltip.hide();
            that.ifm.hide();
            that.trigger('hideafter');
        },

        // 销毁tooltip
        destroy: function() {
            var that = this;
            if (that.isDestroyed) return;
            that.trigger('destroybefore');

            // 置状态
            that.isShown = false;
            that.isRendered = false;
            that.isDestroyed = true;

            // 移除事件
            that.tooltip.undelegate('*', 'click');

            // 移除节点
            that.tooltip.remove();
            that.ifm.remove();

            that.tooltip = null;
            that.ifm = null;
            that.arrow = null;

            that.trigger('destroyafter');
        }
    });

    return Tooltip;
});