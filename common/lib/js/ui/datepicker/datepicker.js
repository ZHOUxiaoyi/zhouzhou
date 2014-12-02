/**
 * @fileoverview 日历选择组件
 * @authors dk (judongkun@baidu.com)
 * @date    2013-09-03
 * @version 1.0
 */
define('ui.datepicker', ['util', 'widget', 'ui.tooltip', 'util.timeFormat'], function(util, widget, tooltip, timeFormat){


/**
 * @name Datepicker
 * @class 日历选择组件
 * @constructor
 * @extends Widget=
 * @requires widget
 * @requires util
 * @requires tooltip
 * @requires timeFormat
 * @param {Object}      config             // 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
 * @param {String}      config.prefix      // 提示框class前缀，默认ui-blank-
 * @param {Node}        config.bindEl      // 绑定的节点
 * @param {String}      config.datePattern // 日期格式yyyy-MM-dd
 * @param {String}      config.today       // 日期基准点
 * @param {Object}      config.range       // 日期区间minDate yyyy-MM-dd、maxDate yyyy-MM-dd
 * @param {Boolean}     config.ani         // 是否有动画
 * @param {String}      config.direction   // 相对绑定节点的方向
 * @param {String|Node} config.content     // 相对绑定节点的方向
 * @param {Integer}     config.width       // 提示框宽度
 * @param {Integer}     config.zIndex      // 提示框的深度
 * @param {Integer}     config.duration    // 显示/隐藏的经过时间
 * @param {Object}      config.posOffset   // 位置偏移量对象，{'left':0, 'right': 0}
 * @param {Boolean}     config.isArrow     // 是否带方向箭头，true带、false不带，默认是true
 * @param {Boolean}     config.closeBtn    // 是否需要关闭按钮
 * 
 * @example
 * var datepicker = new Datepicker({...});
 * datepicker.bind('renderafter', function(){...});
 * datepicker.render();
 * datepicker.show();
 */

// 默认模板
var CALENDAR = {

    // 日历模板字符串
    'CALENDARTPL': [
        '<div class="ui-calendar">',
            '<div class="hd">',
                '<a href="javascript:void(0);" class="left-btn" title="上一月" c-event="headerSwitch" c-type="DATE" c-handler="NEXT"></a>',
                '<a href="javascript:void(0);" class="hd-content" title="点击选择月" c-event="headerContent" c-type="DATE">{%hd%}</a>',
                '<a href="javascript:void(0);" class="right-btn" title="下一月" c-event="headerSwitch" c-type="DATE" c-handler="PREV"></a>',
            '</div>',
            '<div class="bd">{%bd%}</div>',
            '<div class="ft">',
              '<a href="javascript:void(0);" c-handler="pickUp" c-event="pickUp" c-type="TODAY" title="点击选择今日">今日：{%ft%}</a>',
            '</div>',
        '</div>',
    ].join(''),

    // 日期模板字符串
    'DATETPL': [
        '<div class="week">',
            '<span class="weekday">日</span>',
                '<span>一</span>',
                '<span>二</span>',
                '<span>三</span>',
                '<span>四</span>',
                '<span>五</span>',
                '<span class="weekday">六</span>',
        '</div>',
        '<div class="day">',
            '{%days%}',
        '</div>',
    ].join(''),

    // 年月模板字符串
    'YMTPL': [
        '<div class="year-month">',
            '{%yms%}',
        '</div>'
    ].join(''),

    // 单元模板字符串
    'CELLTPL': [
        '<a href="javascript:void(0);" class="{%size%}{%color%}{%disabled%}{%selected%}{%now%}" c-event="{%pickUp%}" c-type="{%type%}" c-value="{%value%}">{%valueText%}</a>'
    ].join('')
};

var Datepicker = widget({
    Options: {
        prefix: 'ui-blank-',
        bindEl: '.calendar-btn',
        datePattern: 'yyyy-MM-dd',
        today: new Date(),
        range: {
            minDate: '',
            maxDate: ''
        },
        ani: false,
        direction: 'bottom',
        title: '',
        content: '',
        width: 204,
        zIndex: 999,
        duration: 0,
        posOffset: {
            'left': 0,
            'top': 0
        },
        isArrow: false,
        closeBtn : false
    },

    // 实例化时自动执行init
    _init: function() {
        var that = this;

        that.isRendered = false;
        that.isShown = false;
        that.isDestroyed = false;

        // 全局记录当前操作的年、月、日
        that.curYear = '';
        that.curMonth = '';
        that.curDate = '';

        // 重置today参数,指导零点
        that.today.setHours(0, 0, 0, 0);

        // 初始化选择日期为today
        that.selectedDate = timeFormat.buildTime(that.today || new Date());
        that.selectedDate.setHours(0, 0, 0, 0);

        // 同步当前操作日期
        that.setDisplayDate(that.selectedDate);

        that._action();
    },

    // 绑定交互行为
    _action: function(){
        var that = this;
        that.bind('renderafter', function() {

            // 在外层容器上绑定代理事件
            var _container = that.tooltip.getContainer();

            // 代理点击头部区的事件
            _container.delegate('[c-event="headerContent"]', 'click', function(e) {
                e.stopPropagation();
                var _cType = $(this).attr('c-type');

                /**
                 * MONTH 点击后将渲染内容为年份选择区
                 * DATE  点击后将渲染内容为月份选择区
                 */
                switch (_cType) {
                    case 'MONTH':
                        that.renderCalendarBody('YEAR', _container);
                        break;
                    case 'DATE':
                        that.renderCalendarBody('MONTH', _container);
                        break;
                    default:
                }
            });

            // 代理向前、向后的点击事件
            _container.delegate('[c-event="headerSwitch"]', 'click', function(e) {
                e.stopPropagation();
                var _cType = $(this).attr('c-type');
                var _cHandler = $(this).attr('c-handler');

                // 准备显示日期为当前年、当前月的1日零点
                var _displayDate = new Date(that.curYear, that.curMonth, 1, 0, 0, 0, 0);

                /**
                 * YEAR  向前、向后选择移动10年
                 * MONTH 向前、向后选择1年
                 * DATE  向前、向后选择1月
                 */
                switch (_cType) {
                    case 'YEAR':
                        _displayDate.setYear(_displayDate.getFullYear() + (_cHandler == 'NEXT' ? -10 : 10));
                        break;
                    case 'MONTH':
                        _displayDate.setYear(_displayDate.getFullYear() + (_cHandler == 'NEXT' ? -1 : 1));
                        break;
                    case 'DATE':
                        _displayDate.setMonth(_displayDate.getMonth() + (_cHandler == 'NEXT' ? -1 : 1));
                        break;
                    default:
                }
                // 同步当前操作的年、月、日
                that.setDisplayDate(_displayDate);

                that.renderCalendarBody(_cType, _container);
            });
            
            // 代理日期内容单元点击事件
            _container.delegate('[c-event="pickUp"]', 'click', function(e) {
                e.stopPropagation();

                var _cType = $(this).attr('c-type');
                var _cValue = $(this).attr('c-value');

                /**
                 * YEAR  选择年份，进去对应的月份选择区
                 * MONTH 选择月份，进入对应的日期选择区
                 * DATE  选择日期
                 * TODAY 选择今天
                 */
                switch (_cType) {
                    case 'YEAR':
                        that.curYear = parseInt(_cValue);
                        that.renderCalendarBody('MONTH', _container);
                        break;
                    case 'MONTH':
                        that.curMonth = parseInt(_cValue);
                        that.renderCalendarBody('DATE', _container);
                        break;
                    case 'DATE':
                        // 更新已选择的日期样式
                        $.map($('.small', _container), function(a) {
                            $(a).removeClass('selected');
                        });
                        $(this).addClass('selected');
                        that.curDate = parseInt(_cValue);

                        // 同步当前选择的日期
                        that.selectedDate = new Date(that.curYear, that.curMonth, that.curDate, 0, 0, 0, 0);

                        /**
                         * 派发选择的日期
                         * @date {String} // datePattern格式的日期字符串
                         */
                        that.trigger('pickup', {
                            date: timeFormat.formatTimePoint(that.selectedDate, that.datePattern)
                        });
                        break;
                    case 'TODAY':
                        // 更新已选择的日期样式
                        $.map($('.small', _container), function(a) {
                            $(a).removeClass('selected');
                            $(a).hasClass('now') && !$(a).hasClass('selected') && $(a).addClass('selected');
                        });

                        // 同步当前选择的日期
                        that.selectedDate = new Date(that.today.setHours(0, 0, 0, 0));

                        /**
                         * 派发选择的日期
                         * @date {String} // datePattern格式的日期字符串
                         */
                        that.trigger('pickup', {
                            date: timeFormat.formatTimePoint(that.selectedDate, that.datePattern)
                        });
                        break;
                    default:
                }
            });
        });
    },

    /**
     * 更新当前操作的年、月、日
     * @param {Date} date // 日期对象
     */
    setDisplayDate: function(date) {
        var that = this;
        that.curYear = date.getFullYear();
        that.curMonth = date.getMonth();
        that.curDate = date.getDate();
    },
    /***
    *作用同setDisplayDate
    * @param {year} number // 年
    * @param {month} number // 月，从0开始
    * @param {date} number // 日
    ***/
    setDate: function(year, month, date){
        var that = this;
        that.curYear = year;
        that.curMonth = month;
        that.curDate = date;
        that.selectedDate = new Date(year, month, date);
    },
    /**
     * 创建日历结构
     * @return {String} // 日历html结构字符串
     */
    buildCalendar: function(){
        var that = this;
        var cData = {
            'hd': timeFormat.formatTimePoint(that.selectedDate, 'yyyy年M月'),
            'bd': that.buildDaysPanel(),
            'ft': timeFormat.formatTimePoint(that.today, 'yyyy年M月d日 ')
        };

        return util.format(CALENDAR.CALENDARTPL, cData);
    },

    /**
     * 创建日期面板
     * @return {String} // 日期面板html结构字符串 
     */
    buildDaysPanel: function() {
        var that = this;
        // 获得本月要构建的日期第一天
        var _displayDate = new Date(that.curYear, that.curMonth, 1, 0, 0, 0, 0);

        // 面板起始日期，默认是前7天
        var _preDayCount = _displayDate.getDay() || 7;

        // 一页显示42个日期，减去本月前要构建的天数，剩余的是要构建本月的
        var _leftDayCount = 42 - _preDayCount;
        var _days = [];

        // 构建日期
        for (var i = -_preDayCount; i < _leftDayCount; ++i) {
            var _date = new Date(_displayDate.getTime() + i * 24 * 3600 * 1000);

            // 检测日期是否在限制日期外
            var _minDate = (that.range.minDate ? timeFormat.buildTime(that.range.minDate) : '');
            var _maxDate = (that.range.maxDate ? timeFormat.buildTime(that.range.maxDate) : '');
            var _checkMin = true;
            var _checkMax = true;
            if(_minDate){
                _checkMin = _minDate.getTime() <= _date.getTime();
            }
            if(_maxDate){
                _checkMax = _date.getTime() <= _maxDate.getTime();
            }
            var _disabled = _date.getMonth() != _displayDate.getMonth() || !_checkMin || !_checkMax;

            var dData = {
                'size': 'small',
                'color': _date.getDay() % 6 ? '' : ' weekday',
                'disabled': _disabled ? ' disabled' : '',
                'selected': _date.getTime() == that.selectedDate.getTime() ? ' selected' : '',
                'now': _date.getTime() == that.today.getTime() ? ' now' : '',
                'pickUp': _disabled ? '' : 'pickUp',
                'type': 'DATE',
                'value': _date.getDate(),
                'valueText': _date.getDate()
            };
            _days.push(util.format(CALENDAR.CELLTPL, dData));
        }

        return util.format(CALENDAR.DATETPL, {days: _days.join('')});
    },

    /**
     * 创建月份选择面板
     * @return {String} // 月份选择面板html字符串
     */
    buildMonthsPanel: function(){
        var that = this;
        var _months = [];

        // 构建月份
        for (var i = 0; i < 12; ++i) {
            var mData = {
                'size': 'big',
                'color': '',
                'disabled': '',
                'selected': (that.curYear == that.selectedDate.getFullYear() && i == that.selectedDate.getMonth()) ? ' selected' : '',
                'now': (that.curYear == that.today.getFullYear() && i == that.today.getMonth()) ? ' now' : '',
                'pickUp': 'pickUp',
                'type': 'MONTH',
                'value': i,
                'valueText': i + 1 + '月'
            }
            _months.push(util.format(CALENDAR.CELLTPL, mData));
        }

        return util.format(CALENDAR.YMTPL, {yms: _months.join('')});
    },

    /**
     * 创建年份选择面板
     * @return {String} // 年份选择面板html字符串
     */
    buildYearsPanel: function(){
        var that = this;

        // 面板其实年份
        var _startYear = that.curYear - that.curYear % 10;
        var _years = [];

        // 构建年份
        for (var i = -1; i <= 10; ++i) {
            var yData = {
                'size': 'big',
                'color': '',
                'disabled': (i + 1) % 11 ? '' : ' disabled',
                'selected': (_startYear + i) == that.selectedDate.getFullYear() ? ' selected' : '',
                'now': (_startYear + i) == that.today.getFullYear() ? ' now' : '',
                'pickUp': (i + 1) % 11 ? 'pickUp' : '',
                'type': 'YEAR',
                'value': _startYear + i,
                'valueText': _startYear + i
            }
            _years.push(util.format(CALENDAR.CELLTPL, yData));
        }

        return util.format(CALENDAR.YMTPL, {yms: _years.join('')});
    },

    /**
     * 渲染日历内容区
     * @param  {String} type      // YEAR年、MONTH月、DATE日
     * @param  {Node}   container // 日历最外层容器，用来获得内部标识节点
     */
    renderCalendarBody: function(type, container){
        var that = this;
        var _header = $('.hd-content', container);
        var _leftBtn = $('.left-btn', container);
        var _rightBtn = $('.right-btn', container);
        var _body = $('.bd', $('.ui-calendar', container));
        var _tpl = '';

        // 同步c-type标识属性，这样就可以同步元素点击事件
        _header.attr('c-type', type);
        _leftBtn.attr('c-type', type);
        _rightBtn.attr('c-type', type);

        switch (type) {
            case 'YEAR':
                _header.addClass('disabled');
                _header.html((that.curYear - that.curYear % 10) + '-' + (that.curYear - that.curYear % 10 + 9));
                _header.attr('title', '');
                _leftBtn.attr('title', '向前十年');
                _rightBtn.attr('title', '向后十年');

                _tpl = that.buildYearsPanel();
                break;
            case 'MONTH':
                _header.removeClass('disabled');
                _header.html(that.curYear);
                _header.attr('title', '点击选择年');
                _leftBtn.attr('title', '上一年');
                _rightBtn.attr('title', '下一年');

                _tpl = that.buildMonthsPanel();
                break;
            case 'DATE':
                _header.removeClass('disabled');
                _header.html(that.curYear + '年' + (that.curMonth + 1) + '月');
                _header.attr('title', '点击选择月');
                _leftBtn.attr('title', '上一月');
                _rightBtn.attr('title', '下一月');

                _tpl = that.buildDaysPanel();
                break;
            default:
        }

        // 渲染内容区
        _body.fadeOut(150, function(){
            _body.html(_tpl).fadeIn(150);
        });
    },

    // 渲染到dom中
    render: function(){
        var that = this;
        if (that.isRendered) return;
        that.trigger('renderbefore');

        // 创建tootip层承载日历
        that.tooltip = new tooltip($.extend(that.options, {
            content: that.buildCalendar()
        }));
        // 注：所有after事件需要由tootip同步
        var _eventArr = ['renderafter', 'showafter', 'hideafter', 'destroyafter', 'apply', 'cancel', 'close'];

        // 事件与状态和tooltip同步
        $.map(_eventArr, function(evtType) {
            that.tooltip.bind(evtType, function() {
                that.isRendered = that.tooltip.isRendered;
                that.isShown = that.tooltip.isShown;
                that.isDestroyed = that.tooltip.isDestroyed;
                that.trigger(evtType);
            });
        });

        that.tooltip.render();
    },

    /**
     * 设置日历绑定的触发节点
     * @param  {Node} el // 节点
     */
    setBindEl: function(el){
        var that = this;
        this.bindEl = el;
        that.tooltip && that.tooltip.setBindEl(el);
    },

    /**
     * 获得绑定的触发节点
     * @return {Node}  // 节点
     */
    getBindEl: function() {
        var that = this;
        return that.tooltip.bindEl;
    },

    // 显示datepicker
    show: function() {
        var that = this;
        if (that.isShown) return;
        that.trigger('showbefore');
        that.tooltip.show();
    },

    // 隐藏datepicker
    hide: function() {
        var that = this;
        if (!that.isShown) return;
        that.trigger('hidebefore');
        that.tooltip.hide();
    },

    // 销毁datepicker
    destoy: function() {
        var that = this;
        if (that.isDestroyed) return;
        that.trigger('destroybefore');

        // 置状态
        that.isShown = false;
        that.isRendered = false;
        that.isDestroyed = true;

        // 移除事件
        that.tooltip.getContainer().undelegate('*', 'click');

        that.tooltip.destoy();
    }
});

return Datepicker;

});