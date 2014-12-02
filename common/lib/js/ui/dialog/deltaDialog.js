/**
 * @fileoverview 对话框组件
 * @author zh (zhangguoqiang@baidu.com)
 *         dk (judongkun@baidu.com)
 * @date 2013-08-27
 * @version 1.0
 */

/**
 * @name Dialog
 * @class 对话框组件，内容支持text、element、iframeURL
 * @constructor
 * @extends Widget
 * @requires widget
 * @requires util
 * @param {Object}      config              // 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
 * @param {String}      config.prefix       // 对话框class前缀，默认ui-
 * @param {String}      config.title        // 对话框标题
 * @param {String}      config.contentType  // 对话框内容类型，参数支持text、element、iframe
 * @param {String|Node} config.content      // 对话框内容，支持传入html文本、文档内节点、iframeURL
 * @param {Boolean}     config.withModal    // 是否需要遮罩层
 * @param {Float}       config.modalOpacity // 遮罩层透明，0-1之间浮点数
 * @param {String}      config.position     // 相对viewport的位置，目前只支持居中
 * @param {Integer}     config.width        // 对话框宽度
 * @param {Integer}     config.zIndex       // 对话框的深度
 * @param {Integer}     config.duration     // 显示/隐藏的经过时间
 * @param {Object}      config.posOffset    // 位置偏移量对象，{'left':0, 'right': 0}
 * @param {Json}        config.tpl          // 组件模板对象，默认是定义好的DIALOG
 * 
 * @example
 * var dialog = new Dialog({...});
 * dialog.bind('close', function(){...})
 * dialog.render();
 * dialog.show();
 */

define('ui.delta.dialog', ['util', 'widget'], function(util, widget){    

// 默认模板
var DIALOG = {

    // 定义dialog模板字符串
    'DIALOGTPL': [
        '<div class="{%prefix%}dialog">',
            '<div class="bd">',
                '<div class="content"></div>',
            '</div>',
        '</div>'
    ].join(''),

    // 定义dialog标题模板字符串
    'DIALOGHDTPL': [
        '<div class="hd">',
            '<span class="close" title="关闭" data-type="close"></span>',
            '<h4 class="title">{%title%}</h4>',
        '</div>'
    ].join(''),

    // 定义浮层iframe遮罩模板字符串
    'IFRAMETPL': [
        '<iframe frameborder="0" scrolling="no" src="javascript:\'\'" style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>'
    ].join(''),

    // 定义modal模板字符串
    'MODALTPL': [
        '<div class="{%prefix%}modal" style="top:0;left:0;background-color:#000;">',
        '</div>'
    ].join('')
};

// 判断是否是IE6
var isIE6 = $.browser.msie && $.browser.version < 7;

var Dialog = widget({
    Options: {
        prefix: 'ui-',
        title: '标题',
        contentType: 'text',
        content: '内容',
        withModal: true,
        modalOpacity: .15,
        position: 'center',
        width: 520,
        maxWidth: 520,
        zIndex: 9999,
        duration: 200,
        posOffset: {
            'left': 0,
            'top': 0
        },
        tpl: DIALOG
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

            that.dialog.delegate('[data-type="apply"]', 'click', function() {
                // 绑定apply按钮点击事件
                that.trigger('apply');
            }).delegate('[data-type="cancel"]', 'click', function() {
                // 绑定cancel按钮点击事件
                that.trigger('cancel');
            }).delegate('[data-type="close"]', 'click', function() {
                // 绑定close按钮点击事件
                that.trigger('close');
            });

            $(window).bind('resize', function() {
                // 组件显示的时候，才触发样式的改变
                that.isShown && that.setCenter();

                // 如果组件销毁了，则清掉函数自身事件
                that.isDestroyed && $(window).unbind('resize', arguments.callee);
            });

            // IE6遮罩需要随window scrollbar而滑动
            that.withModal && isIE6 && $(window).bind('scroll', function() {
                // 组件显示的时候，才触发样式的改变
                that.isShown && that.modal.css({
                    'top': document.documentElement.scrollTop,
                    'left': document.documentElement.scrollLeft
                });

                // 如果组件销毁了，则清掉函数自身事件
                that.isDestroyed && $(window).unbind('scroll', arguments.callee);
            });
        });
    },

    /**
     * 渲染字符串内容
     * @param  {String} text // 要渲染的字符串内容
     */
    renderText: function(text) {
        var that = this;
        that.setContent(text);
    },

    /**
     * 渲染html片段内容
     * @param  {Node} element // 要渲染的html片段内容
     */
    renderElement: function(element) {
        var that = this;
        that.setContent(element);
    },

    /**
     * 渲染iframe内容
     * @param  {String} iframe // iframe地址
     */
    renderIframe: function(iframe) {
        // TBD
    },

    // 渲染到dom中
    render: function() {
        var that = this;
        if (that.isRendered) return;
        that.trigger('renderbefore');
        that.isRendered = true;

        // 渲染dialog，根据type判断插入什么类型的数据
        that.dialog = $(util.format(that.tpl.DIALOGTPL, that.options));
        that.title && $(util.format(that.tpl.DIALOGHDTPL, that.options)).insertBefore(that.dialog.find('.bd'));
        switch (that.contentType) {
            case 'text':
                that.renderText(that.content);
            case 'element':
                that.renderElement(that.content);
                break;
            case 'iframe':
                that.renderIframe(that.content);
                break;
        }
        that.dialog.hide().appendTo(document.body);

        // 如果需要遮罩，则创建遮罩层
        if (that.withModal) {
            that.modal = $(util.format(that.tpl.MODALTPL, that.options)).hide().appendTo(document.body);
            // 将遮罩填充iframe，遮object如安全控件、flash，遮IE6select
            that.modal.html(that.tpl.IFRAMETPL);
        } 

        // 没有遮罩的情况，在dialog后添加iframe用来遮object如安全控件、flash，遮IE6select
        if (!that.withModal) {
            that.ifm = $(that.tpl.IFRAMETPL).hide().appendTo(document.body);
        }

        that.setStyle();
        that.trigger('renderafter');
    },

    /**
     * 设置.title的内容
     * @param {String} title // text
     */
    setTitle: function(title){
        var that = this;
        that.title = title;
        that.dialog.find('.title').html(title);
    },

    /**
     * 设置.content的内容
     * @param {String} content // text、element
     */
    setContent: function(content) {
        var that = this;
        that.content = content;
        that.dialog.find('.content').html(content);
    },

    /**
     * 获得视口宽高
     * @return {Object} // width宽、height高
     */
    getViewportSize: function() {
        var that = this;
        var obj = {'width': 0, 'height': 0};
        var _docDe = document.documentElement;
        var _docBd = document.body;
        if (document.compatMode && document.compatMode == 'CSS1Compat') {
            obj.width = _docDe.clientWidth;
            obj.height = _docDe.clientHeight;
        } else if (_docBd && (_docBd.scrollLeft || _docBd.scrollTop)) {
            obj.width = _docBd.clientWidth;
            obj.height = _docBd.clientHeight;
        }
        return obj;
    },

    // 将dialog设置viewport居中
    setCenter: function() {
        var that = this;
        var _viewportSize = that.getViewportSize();
        var _left = _viewportSize.width - parseInt(that.dialog.outerWidth());
        var _top = _viewportSize.height - parseInt(that.dialog.outerHeight());

        // 偏移量
        var _offsetLeft = that.posOffset.left ? that.posOffset.left : 0;
        var _offsetTop = that.posOffset.top ? that.posOffset.top : 0;
        that.dialog.css({
            'left': (function() {
                return isIE6 ? _left / 2 + _offsetLeft + document.documentElement.scrollLeft : _left / 2 + _offsetLeft;
            })(),
            'top': (function() {
                return isIE6 ? _top / 2 + _offsetTop + document.documentElement.scrollTop : _top / 2 + _offsetTop;
            })()
        });

        // 如果有遮罩，设置遮罩覆盖viewport
        that.withModal && that.modal.css({
            'width': _viewportSize.width,
            'height': _viewportSize.height,
            'top': (function() {
                return isIE6 ? document.documentElement.scrollTop : 0;
            })()
        });

        // 如果没有遮罩，需要将ifm同步到dialog的位置
        !that.withModal && that.ifm.css({
            'left': (function() {
                return isIE6 ? _left / 2 + _offsetLeft + document.documentElement.scrollLeft : _left / 2 + _offsetLeft;
            })(),
            'top': (function() {
                return isIE6 ? _top / 2 + _offsetTop + document.documentElement.scrollTop : _top / 2 + _offsetTop;
            })()
        });
    },

    // 设置样式
    setStyle: function() {
        var that = this;

        // 设置dialog的样式
        that.dialog.css({
            'position': isIE6 ? 'absolute' : 'fixed',
            'width': (function() {
                if (isIE6) {
                    return that.width === 'auto' ? that.maxWidth : that.width;
                }
                return that.width;
            })(),
            'maxWidth': that.maxWidth,
            'zIndex': that.zIndex
        });

        // 如果有遮罩，设置遮罩的样式 
        that.withModal && that.modal.css({
            'position': isIE6 ? 'absolute' : 'fixed',
            'opacity': that.modalOpacity,
            'zIndex': that.zIndex - 1
        });

        // 如果没有遮罩，设置ifm样式
        !that.withModal && that.ifm.css({
            'width': that.dialog.outerWidth(),
            'height': that.dialog.outerHeight(),
            'zIndex': that.zIndex - 1
        });

        that.setCenter();
    },

    // 获得dialog的容器节点
    getContainer: function(){
        var that = this;
        return that.dialog;
    },

    /**
     * 显示dialog
     * 如果有遮罩，遮罩显示与dialog保持递进效果，即先遮罩后dialog
     */
    show: function() {
        var that = this;
        if (that.isShown) return;
        that.trigger('showbefore');
        that.isShown = true;
        // 每次显示的时候都设置一下位置
        that.setCenter();
        that.dialog.show();
        that.withModal ? that.modal.fadeIn(that.duration * 0.75) : that.ifm.fadeIn(that.duration);
        that.trigger('showafter');
    },

    /**
     * 隐藏dialog
     * 瞬间隐藏dialog及dialog iframe，防止多次触发其它操作
     */
    hide: function() {
        var that = this;
        if (!that.isShown) return;
        that.trigger('hidebefore');
        that.isShown = false;
        that.dialog.hide();
        that.withModal ? that.modal.fadeOut(that.duration) : that.ifm.hide();
        that.trigger('hideafter');
    },

    // 销毁dialog
    destroy: function() {
        var that = this;
        if (that.isDestroyed) return;
        that.trigger('destroybefore');

        // 置状态
        that.isShown = false;
        that.isRendered = false;
        that.isDestroyed = true;

        // 移除事件
        that.dialog.undelegate('*', 'click');

        // 移除节点
        that.dialog.remove();
        that.withModal ? that.modal.remove() : that.ifm.remove();

        that.dialog = null;
        that.modal = null;
        that.ifm = null;

        that.trigger('destroyafter');
    }
});

return Dialog;

});