
 
/**
 * @fileoverview 省份、城市 选择组件
 * @authors dk (judongkun@baidu.com)
 * @date    2013-09-26
 * @version 1.0
 */

// var util = require('util/util.js');
// var widget = require('util/widget.js');
// var areaData = require('util/areaData.js');

/**
 * @name AreaSelect
 * @class 省份、城市 选择组件
 * @constructor
 * @extends Widget
 * @requires widget
 * @requires util
 * @requires areaData
 * @param {Object}         config             // 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
 * @param {String|Node}    config.provinceEl  // 省份select节点
 * @param {String|Node}    config.bindEl      // 城市select节点
 * @param {String}         config.defProvince // 默认选择的省份
 * @param {String}         config.defCity     // 默认选择的城市
 *
 * @example
 * var areaSelect = new AreaSelect({...});
 * areaSelect.bind('renderafter', function(){...});
 * areaSelect.render();
 */
define('ui.areaSelect', ['util', 'widget','util.areaData'], function(util, widget,areaData){   
    var areaSelect = widget({
        Options: {
            provinceEl: '#province',
            cityEl: '#city',
            defProvince: '',
            defCity: ''
        },

        // 实例化时自动执行init
        _init: function() {
            var that = this;
            that.isRendered = false;
            that.isDestroyed = false;
            that._action();
        },

        // 绑定交互行为
        _action: function() {
            var that = this;
            that.bind('renderafter', function() {

                that.provinceEl.change(function() {
                    // 重新渲染城市select options
                    that.initCitySelect(that.cityEl, $(this).val(), '');

                    // 如果组件销毁了，则清掉函数自身事件
                    that.isDestroyed && that.provinceEl.unbind('change', arguments.callee);
                });
            });
        },

        /**
         * 初始化城市select
         * @param  {String|Node} cityEl       // 城市select节点
         * @param  {String}      provinceName // 城市名称   
         * @param  {String}      chooseName   // 默认城市名称
         */
        initCitySelect: function(cityEl, provinceName, chooseName) {
            var _options = '<option value="">选择城市</option>';
            provinceName && $.map(areaData.CITIES[provinceName] || [], function(a) {
                var _selected = (a == chooseName) ? ' Selected="Selected"' : '';
                _options += '<option title="' + a + '" value="' + a + '"' + _selected + '>' + a + '</option>';
            });
            $(cityEl).html(_options);
        },

        /**
         * 初始化省份select
         * @param  {String|Node} provinceEl  // 省份select节点
         * @param  {String}      chooseName  // 默认省份名称
         */
        initProvinceSelect: function(provinceEl, chooseName) {
            var _options = '<option value="">选择省份</option>';
            $.map(areaData.PROVINCES, function(a) {
                var _selected = (a == chooseName) ? ' Selected="Selected"' : '';
                _options += '<option title="' + a + '" value="' + a + '"' + _selected + '>' + a + '</option>';
            });
            provinceEl.html(_options);
        },

        // 渲染到dom中
        render: function() {
            var that = this;
            if (that.isRendered) return;
            that.trigger('renderbefore');
            that.isRendered = true;

            that.initProvinceSelect(that.provinceEl, that.defProvince);
            that.initCitySelect(that.cityEl, that.defProvince, that.defCity);

            that.trigger('renderafter');
        },

        // 销毁areaSelect
        destroy: function() {
            var that = this;
            if (that.isDestroyed) return;
            that.trigger('destroybefore');

            // 置状态
            that.isRendered = false;
            that.isDestroyed = true;

            that.trigger('destroyafter');
        }
    });
    return areaSelect;
});
;define("ui.combobox", ["module", "util", "widget"], function(module){


/**
* @fileoverview 模拟select组件
* @author zh（zhangguoqiang@baidu.com）
* @date 2013-10-02
*/

var util = require('util');
var widget = require('widget');

/**
* @name Combobox
* @class select模拟
* @constructor
* @extends Widget
* @requires widget
* @requires util
* @param {Object} config 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
* @param {String} config.selectId 下拉框id
* @example
* var dialog = new Combobox({...});
*/
var Combobox = widget({
    Options: {
        selectId: ''   
    },
    _init: function(){
        if(!this.selectId || !$('#' + this.selectId).length){
            try{
                throw new Error( this.selectId + '元素不存在，请检查');
            }catch(e){
                alert(e);
            }
        }

        this.selectNode = $('#' + this.selectId);
        this.data = [];
        this.data = this.serialize();
        this.render();
        this.setWidth();
        this.hideSelect();
        this._action();

    },
    _action: function(){
        var _this = this;
        this.combobox.delegate('li', 'click', function(e){
            var selectLi = $(this);
            _this.setVal(selectLi.attr('data-value'));
            _this.trigger("onselected", [selectLi.attr('data-value'), selectLi.text()]);
            _this.combobox.find('span').html(selectLi.text());
            _this.hideList();
        });
        this.combobox.delegate('span', 'click', function(e){
            _this.toggleList();
        });
        //点击其余位置收起
        $(document.body).click(function(e){
            var target = e.target;
            if(target == _this.combobox.find('span')[0]){
                return false;
            }
            _this.hideList();
        });
    },
    render: function(){
        var html = [
                    '<span class="ui-combobox">',
                        '<span>' + this.selectNode.find('option:selected').text() + '</span>',
                            '<ul style="display:none;">'
                    ].join('');

        $.each(this.data, function(index, option){
            html += '<li data-value="' + option.val + '"><a href="javascript:void(0);">' + option.text + '</a></li>';
        });
        html += [
                    '</ul>',
                '</span>'
                ].join('');
        this.combobox = $(html).insertAfter(this.selectNode);
    },

    refresh:function(){
        var html = "";
        var selected = this.selectNode.find('option:selected');
        this.data = this.serialize();
        this.combobox.find("span").html(selected.text());
        
        $.each(this.data, function(index, option){
            html += '<li data-value="' + option.val + '"><a href="javascript:void(0);">' + option.text + '</a></li>';
        });

        this.combobox.find("ul").html(html);
        //this.setWidth();
        this.trigger("onselected", [selected.val(), selected.text()]);
    },

    setWidth: function(){
        var list = this.combobox.find('ul');
        var span = this.combobox.find('span');
        var width = list.width() - parseInt(span.css('padding-left')) - parseInt(span.css('padding-right'));
        span.width(width);
    },
    setVal: function(val){
        this.selectNode.val(val);
    },
    hideSelect: function(){
        this.selectNode.hide();
    },
    showList: function(){
        this.combobox.find('ul').show();
    },
    hideList: function(){
        this.combobox.find('ul').hide();
    },
    toggleList: function(){
        this.combobox.find('ul').toggle();
    },
    serialize: function(){
        var arr = [];
        this.selectNode.find('option').each(function(index, option){
            arr.push({
                index: option.index,
                text: option.text,
                val: option.value,
                selected: option.selected
            });
        });
        return arr;
    }
});
module.exports = Combobox;


});
;/**
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
;/**
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
;
define('ui.dialog', ['util', 'widget'], function(util, widget){    
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

    // 默认模板
    var DIALOG = {

        // 定义dialog模板字符串
        'DIALOGTPL': [
            '<div class="dialog-sya-bx">',
                '<div class="dialog-bd">',
                    '<div class="dialog-main content"></div>',
                '</div>',
                '<div class="dialog-act"><a href="javascript:void(0)" title="关闭" data-type="close" class="dialog-close J_dialog-close">关闭</a></div>',
                '<div class="dialog-ft"><span class="s"></span></div>',
            '</div>'

        ].join(''),

        // 定义dialog标题模板字符串
        'DIALOGHDTPL': [
            '<div class="dialog-hd">',
            '<h5 class="t"><b class="ico dialog-ico"></b><span class="title">{%title%}</span></h5>',
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
            that.title && $(util.format(that.tpl.DIALOGHDTPL, that.options)).insertBefore(that.dialog.find('.dialog-bd'));
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
;define('ui.bdSecurityEdit', ['require', 'exports', 'module', 'util', 'widget'], function(require, exports, module, util, widget){    
/**
 * @fileoverview BdSecurityEdit安全控件
 * @authors dk (judongkun@baidu.com)
 * @date    2013-08-29
 * @version 1.0
 */
var util = require('util');
var widget = require('widget');


/**
 * BdSecurityEdit类
 * @param {Json}   options                      // 下面是配置说明
 * @param {String} options.baseEl               // 已有input，填input节点。没有input，填相对节点，安全控件会生成在节点后面
 * @param {String} options.securityId           // 安全控件Id
 * @param {String} options.securityClassName    // 安全控件样式
 * @param {String} options.inputId              // 密码inputId
 * @param {String} options.inputName            // 密码name
 * @param {String} options.inputClassName       // 密码样式名
 * 
 * @param {String} options.parameters.mode      // 0为密文模式，1为明文模式
 * // 选择控件在加密时使用的公钥，该公钥用于Output2和Output6的结果输出
 * // 合法范围是0到9，如果输入非法，使用0号密钥
 * @param {String} options.parameters.input1
 * @param {String} options.parameters.input2    // 设置加密用的扰动值
 * @param {String} options.parameters.maxlength // 最大可输入的字符数。合法范围是0到100 ，默认为40
 * /////////////////////////////////////////////// 注：parameters参数需要后端给出，特别是input2干扰值需要后端配对
 * 
 * @example
 * var bdSecurityEdit = new BdSecurityEdit({
 *     'baseEl': '#security',
 *     'securityId': '#securityId',
 *     'securityClassName': 'securityClassName',
 *     'inputId': '#inputId',
 *     'inputName': 'inputName',
 *     'inputClassName': 'inputClassName',
 *     'parameters': {
 *         'mode': '<%mode%>',
 *         'input1': '<%input1%>',
 *         'input2': '<%input2%>',
 *         'maxlength': '<%maxlength%>'
 *     }
 * });
 * bdSecurityEdit.bind('renderafter', function(){
 *     console.info(bdSecurityEdit.getPw());
 * });
 * bdSecurityEdit.render();
 */

// 安全控件下载地址和版本号
var CONFIG = {
    CAB_URL: '/static/common/download/baiedit.cab',      // 用于IE自动安装，baiedit.cab
    EXE_URL: '/static/common/download/baiedit.exe',      // 用于IE点击下载，baiedit.exe
    XPI_URL: '/static/common/download/baiedit1.0.1.exe', // 用于非IE浏览器，baiedit1.0.1.exe
    VERSION: '1,0,0,6'  // 用于IE自动安装cab的版本号 1,0,3,0是线上控件版本号; 1,0,0,6是线下控件版本号
};

/**
 * 系统和浏览器是否支持安全控件
 * @return {Boolean}  // true支持，false不支持
 */
var isSupportBaiedit = (function() {
    var _ua = navigator.userAgent.toLowerCase();
    var _pf = navigator.platform.toLowerCase();

    /**
     * 白名单
     * 只支持win32系统下的IE、chorme、firefox
     */
    var _win32 = /win32/.test(_pf);

    // 判断ie
    var _ie = !! window.ActiveXObject;
    // 判断chrome
    // var _chrome = /chrome\/([\d.]*)/.test(_ua);
    /*去除对于chrome的支持，因chrome升级*/
    /*提供对于搜狗的支持*/
    var _sougou = /metasr/.test(_ua);
    // 判断火狐
    var _firefox = /firefox/.test(_ua);

    return _win32 && (_ie || _sougou || _firefox);
})();

/**
 * 查看浏览器是否安装了安全控件
 * @return {Boolean}  // true安装了，false没安装
 */
var checkSecurityEdit = function(){
    var _support = false;
    try {
        if ( !! window.ActiveXObject) {
            /**
             * IE浏览器判断方式
             * 
             * 通过检测ActiveX的progID来检测是否安装了安全控件，
             * 此progID与系统注册表键值clsid唯一对应，与其它控件重复的概率几乎为零
             */
            _support = !! new ActiveXObject('SecEdit.EditCtrl.1');
        } else {
            // 非IE浏览器判断方式
            _support = !! navigator.mimeTypes['application/x-baidu-secedit'];
        }
    } catch (e) {}
    return _support;
};

var BdSecurityEdit = widget({
    Options: {
        'baseEl': '',
        'securityId': '',
        'securityClassName': '',
        'inputId': '',
        'inputName': '',
        'inputClassName': '',
        'parameters': {
            'mode': '0',
            'input1': '9',
            'input2': new Date().getTime(),
            'maxlength': '14'
        }
    },

    // 实例化时自动执行init
    _init: function() {
        var that = this;
        that.isRendered = false;
        that.isDestroyed = false;
        that._action();
    },

    // 绑定交互行为
    _action: function() {
        var that = this;
        that.bind('renderafter', function() {

            // 如果支持安全控件，则为安全控件绑定事件
            if (isSupportBaiedit) {

                /**
                 * 对于chrome、Firefox下的安全控件版本，目前已知bug：
                 * 1、focus事件会触发两次，其中有一次无效触发，特征为timestamp为0;
                 * 2、blur事件触发一次，特征为timestamp为0。
                 * 
                 * 对于IE下的安全控件版本，目前已知bug：
                 * 1、focus时会瞬时blur;
                 */
                that.bdSecurityEdit ? that.bdSecurityEdit.get(0).onfocus = function(e) {
                    (!! window.ActiveXObject || e.timeStamp) && that.trigger('focus');
                    // 如果组件销毁了，则清掉函数自身事件
                    that.isDestroyed && that.bdSecurityEdit.unbind('focus', arguments.callee);
                } : '';

                that.bdSecurityEdit ? that.bdSecurityEdit.get(0).onblur = function(e) {
                    that.trigger('blur');
                    // 如果组件销毁了，则清掉函数自身事件
                    that.isDestroyed && that.bdSecurityEdit.unbind('blur', arguments.callee);
                } : '';

                // 如果点击了下载链接，则开启计时器，轮询检测控件是否安装，检测到则刷新页面
                that.downloadUrl && that.downloadUrl.click(function(e){
                    e.stopPropagation();
                    that.timer = setInterval(function() {
                        if (checkSecurityEdit()) {
                            clearInterval(that.timer);
                            window.location.reload();
                        }
                    }, 1000);
                    that.downloadUrl.unbind('click', arguments.callee);
                });
            } else {
                // 如果不支持安全控件，则给input绑定事件

                that.passwordInput.focus(function() {
                    that.trigger('focus');
                }).blur(function() {
                    that.trigger('blur');
                });
            }
        });
    },

    // 渲染到dom中
    render: function() {
        var that = this;
        if (that.isRendered) return;
        that.trigger('renderbefore');

        // 渲染password input到baseEl后面，如果已经有password input则直接将其赋值给that.passwordInput
        if ($(that.inputId).get(0)) {
            that.passwordInput = $(that.inputId);
        } else {
            that.passwordInput = $('<input type="password" name="' + that.inputName + '" class="' + that.inputClassName + '" id="' + that.inputId + '" autocomplete="off" />');
            that.passwordInput.insertAfter($(that.baseEl));
        }

        // 渲染是否含有控件的hidden input标识
        var _controlValue = isSupportBaiedit ? 1 : 0;
        $('<input type="hidden" name="hasSecurityControl" value="' + _controlValue + '" /><input type="hidden" name="pcMac" value="1" />').insertAfter(that.passwordInput);

        // 如果系统和浏览器支持安装安全控件，则创建并渲染之
        isSupportBaiedit && that.createController();

        // V8引擎，JS执行的速度可能大于控件渲染速度
        setTimeout(function() {
            that.trigger('renderafter');
        }, 0);
    },

    // 创建安全控件实体
    createController: function() {
        var that = this;

        // 把密码input“隐藏”
        that.passwordInput.css({
            height: '1px',
            width: '1px',
            visibility: 'hidden',
            padding: 0,
            border: 'none'
        }).attr('tabindex', -1);

        // 如果已经安装控件，直接渲染
        if (checkSecurityEdit()) {
            that.bdSecurityEdit = $(that._packageController());
            that.bdSecurityEdit.insertAfter($(that.baseEl));
        } else {
            // 如果没有安装控件，则提供下载链接
            that.downloadUrl = $(that._packageDownloadUrl());
            that.downloadUrl.insertAfter($(that.baseEl));
        }
    },

    /**
     * 组装控件
     * @return {String} // 控件html字符串
     */
    _packageController: function() {
        var that = this;
        var _aDom = [];

        // 如果浏览器支持window.ActiveXObject
        if ( !! window.ActiveXObject) {

            _aDom.push('<object id="' + that.securityId + '" class="' + that.securityClassName + '"');
            _aDom.push(' data="data:application/x-oleobject;base64,VUKKSDYys0SPJ/oa7KqIRBAHAADYEwAA2BMAAA==" classid="clsid:E0E9F6EF-871B-42AE-89C9-CD6AF7A2E5D3" codebase="' + CONFIG.CAB_URL + '#version=' + CONFIG.VERSION + '">');
            for (var paraName in that.parameters) {
                _aDom.push('<param name="' + paraName + '" value="' + that.parameters[paraName] + '" />');
            }
            _aDom.push("</object>");
        } else {

            // 其它浏览器
            _aDom.push('<object id="' + that.securityId + '" class="' + that.securityClassName + '"');
            _aDom.push(' type="application/x-baidu-secedit"');
            for (var paraName in that.parameters) {
                _aDom.push(" " + paraName + '="' + that.parameters[paraName] + '"');
            }
            _aDom.push('></object>');
        }
        return _aDom.join('');
    },

    /**
     * 组装不支持控件
     * @return {String}  // 控件下载地址html字符串
     */
    _packageDownloadUrl: function() {
        var that = this;
        var _aDom = [];
        _aDom.push('<span class="' + that.securityClassName + '">');
        var _url = !! window.ActiveXObject ? CONFIG.EXE_URL : CONFIG.XPI_URL;
        _aDom.push('<a href="' + _url + '" target="_blank">请点击下载安全控件</a>');
        _aDom.push('</span>');
        return _aDom.join('');
    },

    /**
     * 获得MD5的用户输入。
     * 算法是：MD5(MD5(MD5(用户输入)) + Input2)
     * @return {String}      // MD5的用户输入
     */
    getVerify: function() {
        return this.bdSecurityEdit.get(0).Output1;
    },

    /**
     * 获得用公钥加密的用户输入。
     * 算法是：RSA(MD5(MD5(用户输入)), 公钥)
     * @return {String}      // 公钥加密的用户输入
     */
    getEncrypt: function() {
        return this.bdSecurityEdit.get(0).Output2;
    },

    /**
     * 获得用户机器的MAC地址
     * @return {String}      // MAC地址
     */
    getMac: function() {
        return this.bdSecurityEdit.get(0).Output3;
    },

    /**
     * 获得用户输入的字符个数
     * @return {Number}      // 字符数
     */
    getLength: function() {
        return this.bdSecurityEdit.get(0).Output4;
    },

    /**
     * 获得用户输入密码的安全级别。
     * 只有Output5的值是0或-1时，才表示用户输入的密码是安全的。
     * 文本模式下，该值始终为0。
     * @return {Number}      // 级别数字 0或-1时代表安全
     */
    getLevel: function() {
        return this.bdSecurityEdit.get(0).Output5;
    },

    /**
     * 获得用公钥加密的用户输入。
     * 算法是：RSA(用户输入, 公钥)
     * 注：passPort就用的这个。
     * @return {String}      // 公钥加密的用户输入
     */
    getPw: function() {
        return this.bdSecurityEdit.get(0).Output6;
    },

    // 清空用户输入，不会返回任何数据。
    clearInput: function() {
        this.bdSecurityEdit.get(0).Output7;
    },

    // 销毁安全控件
    destroy: function() {
        var that = this;
        if (that.isDestroyed) return;
        that.trigger('destroybefore');

        // 置状态
        that.isRendered = false;
        that.isDestroyed = true;

        // 移除事件
        that.timer && clearInterval(that.timer);

        // 移除节点
        that.passwordInput.remove();
        that.bdSecurityEdit.remove();
        that.downloadUrl && that.downloadUrl.remove();

        that.trigger('destroyafter');
    }
});

window['isSupportBaiedit'] = isSupportBaiedit;
window['checkSecurityEdit'] = checkSecurityEdit;
module.exports = BdSecurityEdit;


});
;/**
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
;define("ui.validator", ["require", "module", "util", "widget", "util.rule"],  function(require, module){


/**
* @fileoverview 表单验证组件
* @author zh（zhangguoqiang@baidu.com）
* @date 2013-08-29
*/

var util = require('util');
var widget = require('widget');
var ruleFactory = require('util.rule');

/**
* @name Validator
* @class 表单校验
* @constructor
* @extends Widget
* @requires widget
* @requires util
* @param {Object} config 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
* @param {String} config.formId 表单id
* @param {String} config.tipClass 描述className
* @param {String} config.errClass 错误className
* @param {Boolean} config.checkBeforeSubmit 提交前是否校验
* @param {Boolean} config.breakWhenError 校验未通过时，是否停止校验
* @param {Object} config.rules 表单规则 {表单项id:{}}
* @example
* var validator = new Validator({...});
*/
var Validator = widget({
	Options: {
		formId: '',
        itemClass: 'form-item',
		tipClass: 'form-tip',
        focusClass: 'form-item-focus',
        warningClass: 'form-item-warning',
        errClass: 'form-item-error',
		successClass: 'form-item-success',
        defaultTriggerMethod: 'blur',
		checkBeforeSubmit: true,
		breakWhenError: false,
        defaultActionAfterValite: function(ele, validator, flag, msg){
            var formItem = this.getFormitem(ele);
            var formTip = this._getTipNode(ele);
            this.clearStatus(ele);
            if(!flag){
                if('required' == validator){
                    formItem.addClass(this.warningClass);
                }else{
                    formItem.addClass(this.errClass);
                }
                formTip.html(msg);
            }else{
                formItem.addClass(this.successClass);
                formTip.html('');
            }
        },
        defaultActionAfterValiteAll: function(){
            //避免重复提交，需要使用form.submit
            this.formNode[0].submit();
        }
	},
	_init: function(){
		if(!this.formId || !$('#' + this.formId).length){
			try{
				throw new Error( this.formId + '表单元素不存在，请检查');
			}catch(e){
				alert(e);
			}
		}
		this.formNode = $('#' + this.formId);
        this.validators = this._colloectValidator();
		this._action();
	},
	_action: function(){
		var _this = this;
        this.formNode.bind('submit', function(event){
            event.preventDefault();
            //提交前是否校验
            if(_this.checkBeforeSubmit){
                var isValid = _this.validateAll();
                if(isValid){
                    _this.submit();
                }
            }else{
                _this.submit();
            }
        });
        $.each(this.validators, function(domId, validator){
            var ele = $('#' + domId);
            var triggerMethod = validator[triggerMethod] ? validator[triggerMethod] : _this.defaultTriggerMethod;
            triggerMethod = util.isString(triggerMethod)?[triggerMethod]:triggerMethod;
            for(var i = 0, len = triggerMethod.length; i < len; i++){
                ele.bind(triggerMethod[i], function(){
                    _this._validate(ele, validator);
                });
            }
            
            ele.bind('focus', function(){
                _this.clearStatus(ele);
                _this._getTipNode(ele).html('');
            });
        });

        this.bind('onvalidatebefore', function(e, args){
            
        });
        this.bind('onvalidateafter', function(e, args){
            this.defaultActionAfterValite.apply(_this, args);
        });
        this.bind('onvalidateallafter', function(e, args){
            //console.log(args)
        });
        this.bind('onvalidateallbefore', function(e, args){
            //console.log(args)
        });
	},
	//元素是否隐藏，ele为jquery或dom对象
	_isElementHidden: function(ele){
		var ele = ele[0] || ele;
		return !ele.offsetHeight;
	},
    _supportPlacehoder: function(){
        return "placeholder" in document.createElement("input");
    },
    _getTipNode: function(ele){
        var formItem = ele.parents('.' + this.itemClass);
        return formItem.find('.' + this.tipClass).length ? formItem.find('.' + this.tipClass) : $('<span class="' + this.tipClass + '"></span>').appendTo(ele.parent());
    },
	//绑定校验事件
	unbindAll: function(){

	},
	validateAll: function(){
        this.trigger('validateallbefore');
		var flag = true;
		for(var id in this.validators){
			var ele = $('#' + id);
			var rule = this.validators[id];
			var flagPrivate = this._validate(ele, rule);
			flag = (flag && flagPrivate);
			//如果设置了校验出错中断，跳出循环
			if(this.breakWhenError && !flagPrivate){
				break;
			}
		}
        this.trigger('validateallafter', flag);
		return flag;
	},
    _dealMsg: function(msg, data){
        var i = 0;
        while (msg && typeof data[i] !== "undefined") {
            msg = msg.replace(/%s/, data[i++]);
        }
        return msg;
    },
	//ele
	_validate: function(ele, ruleConf){
        this.trigger('validatebefore', [ele, ruleConf]);
		var _this = this;
		//如果元素隐藏，自动返回true
		if(this._isElementHidden(ele)){
			return true;
		}
		var flag = false;
		var rules = ruleConf.type;
        var ruleName = '';
        var msg = '';
        var msgData = '';
		if(util.isString(rules)){
			rules = [rules];
		}
		flag = (!rules) ? true : !util.some(rules, function(rule){
			ruleName = util.isArray(rule) ? rule[0] : rule;
			var ruleAction = ruleFactory.getRule(ruleName);
            msg = ruleFactory.getTip(ruleName);
            msgData = [ele.attr('data-desc') || ruleConf.desc || ''];
            if(util.isArray(rule)){
                for (var i = 1, len = rule.length; i < len; i++) {
                    msgData[msgData.length] = rule[i];
                }
            }
			var flagPrivate = util.isFunction(ruleAction) ? _this._validateFunction(ele, rule) : _this._validateReg(ele, ruleAction);

			return !flagPrivate;
		});
		
        this.trigger('validateafter', [ele, ruleName, flag, ruleConf.errorMsg || this._dealMsg(msg, msgData)]);

		return flag;
	},
	_validateFunction: function(ele, rulecfg) {
        var args = [ele];
        if (util.isArray(rulecfg)) {
            var ruleName = rulecfg[0];
            for (var i = 1, l = rulecfg.length; i < l; i++) {
                args[args.length] = rulecfg[i];
            }
        } else {
            var ruleName = rulecfg;
            args[args.length] = ele;
        }
        var rule = ruleFactory.getRule(ruleName);
        return rule.apply(this, args)
    },
    _validateReg: function(ele, rule) {
        var val = ele.val();
        return rule.test(val);
    },
    _colloectValidator: function(){
    	var _this = this;
    	var obj = {};
    	var eles = this.formNode.find('[data-validator]');
    	$.each(eles, function(index, ele){
    		var id = $(ele).attr('id');
    		var ruleName = $(ele).attr('data-validator');
    		var rule = ruleFactory.getRule(ruleName);
    		if('object' == typeof rule){
    			if(rule instanceof RegExp){
    				obj[id] = {
    					type: ruleName
    				};

    			}else{
    				obj[id] = rule;
    			}
    		}else if('function' == typeof rule){
    			obj[id] = {
    				type: ruleName
    			};
    		}
    	});
    	return obj;
    },
    getFormitem: function(ele){
        return ele.parents('.' + this.itemClass);
    },
    clearStatus: function(ele){
        this.getFormitem(ele).attr('class', this.itemClass);
    },
	enableSubmit: function(){

	},
	disableSubmit: function(){

	},
    serialize: function(replacer, encode){
        var elements = this.formNode[0].elements,
        replacer = replacer || function (value, name) {
            return value;
        },
        data = {},
        item, itemType, itemName, itemValue, 
        opts, oi, oLen, oItem;
        
        /**
         * 向缓冲区添加参数数据
         * @private
         */
        function addData(name, value) {
            data[name] = value;
        }
        
        for (var i = 0, len = elements.length; i < len; i++) {
            item = elements[i];
            itemName = item.name;
            
            // 处理：可用并包含表单name的表单项
            if (!item.disabled && itemName) {
                itemType = item.type;
                if(encode){
                    itemValue = String(item.value).replace(/[#%&+=\/\\\ \　\f\r\n\t]/g, function(all) {
                        return '%' + (0x100 + all.charCodeAt()).toString(16).substring(1).toUpperCase();
                    });    
                }else{
                    itemValue = item.value;
                }
                
            
                switch (itemType) {
                // radio和checkbox被选中时，拼装queryString数据
                case 'radio':
                case 'checkbox':
                    if (!item.checked) {
                        break;
                    }
                    
                // 默认类型，拼装queryString数据
                case 'textarea':
                case 'text':
                case 'password':
                case 'hidden':
                case 'file':
                case 'select-one':
                    addData(itemName, replacer(itemValue, itemName));
                    break;
                    
                // 多行选中select，拼装所有选中的数据
                case 'select-multiple':
                    opts = item.options;
                    oLen = opts.length;
                    for (oi = 0; oi < oLen; oi++) {
                        oItem = opts[oi];
                        if (oItem.selected) {
                            addData(itemName, replacer(oItem.value, itemName));
                        }
                    }
                    break;
                }
            }
        }
        return data;
    },
	submit: function(){
		//调用默认参数，提交表单
        this.defaultActionAfterValiteAll();

	}
});
module.exports = Validator;

});
;define("ui.vcode", ["require", "exports", "module", "util", "widget", "util.rule","ui.validator"],function(require, exports, module){



/**
* @fileoverview 表单验证组件
* @author zh（zhangguoqiang@baidu.com）
* @date 2013-08-29
*/

var util = require('util');
var widget = require('widget');
var ruleFactory = require('util.rule');
var Validator = require('ui.validator');

/**
* @name Vcode
* @class 验证码组件
* @constructor
* @extends Widget
* @requires widget
* @requires util
* @param {Object} config 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
* @param {String} config.formId 表单id
* @param {String} config.tipClass 描述className
* @param {String} config.errClass 错误className
* @param {Boolean} config.checkBeforeSubmit 提交前是否校验
* @param {Boolean} config.breakWhenError 校验未通过时，是否停止校验
* @param {Object} config.rules 表单规则 {表单项id:{}}
* @example
* var dialog = new Validator({...});
*/
var Vcode = widget({
	Options: {
        btnId: '',
        ajaxUrl: '',
        params: {},
        timeout: 60,
        btnText: '点此免费获取',
        successText: '验证码已发送至您的手机',
        itemClass: 'form-item',
        tipClass: 'form-tip',
        warningClass: 'form-item-warning',
        errClass: 'form-item-error',
        successClass: 'form-item-success',
        defaultActionAfterValite: function(ele, validator, flag, msg){
            var formItem = this.getFormitem(ele);
            var formTip = this._getTipNode(ele);
            this.clearStatus(ele);
            if(!flag){
                if('required' == validator){
                    formItem.addClass(this.warningClass);
                }else{
                    formItem.addClass(this.errClass);
                }
                formTip.html(msg);
            }else{
                formItem.addClass(this.successClass);
                formTip.html('');
            }
        },
        defaultActionAfterRequest: function(ele, data){
            var _this = this;
            if(0 == data.ret){
                _this._getTipNode(ele).html(_this.successText);
                _this.getFormitem(ele).addClass(_this.successClass);
            }else if ('50000' === data.ret){
                _this.unlogin && _this.unlogin();
            }else{
                _this.clearStatus(ele);
                _this._getTipNode(ele).html(data.ret_msg);
                _this.getFormitem(ele).addClass(_this.errClass);
            }
        },
        SendAndDo:null
	},
	_init: function(){
		if(!this.formId || !$('#' + this.formId).length){
			try{
				throw new Error( this.formId + '表单元素不存在，请检查');
			}catch(e){
				alert(e);
			}
		}
		this.formNode = $('#' + this.formId);
        this.btnNode = $('#' + this.btnId);
        this.btnNode.val(this.btnText);
        this.validators = this._colloectValidator();
		this._action();
	},
	_action: function(){
        var _this = this;
		this.btnNode.bind('click', function(){
            var isValid = _this.validateAll();
            if(isValid){
                _this.SendAndDo && _this.SendAndDo();
                _this._sendRequest();
                _this.countDown();
            }
        });
        this.bind('onvalidatebefore', function(e, args){
            
        });
        this.bind('onvalidateafter', function(e, args){
            this.defaultActionAfterValite.apply(_this, args);
        });
        this.bind('onvalidateallafter', function(e, args){
            //console.log(args)
        });
        this.bind('onvalidateallbefore', function(e, args){
            //console.log(args)
        });
	},
    _colloectValidator: function(){
        var obj = {};
        $.each(this.params, function(index, id){
            var ruleName = $('#' + id).attr('data-validator');
            if(!ruleName){
                return false;
            }
            var rule = ruleFactory.getRule(ruleName);
            if('object' == typeof rule){
                if(rule instanceof RegExp){
                    obj[id] = {
                        type: ruleName
                    };

                }else{
                    obj[id] = rule;
                }
            }else if('function' == typeof rule){
                obj[id] = {
                    type: ruleName
                };
            }
        });
        return obj;
    },
    _sendRequest: function(){
        var params = [];
        var _this = this;
        var ele = _this.btnNode;
        $.each(this.params, function(index, id){
            params.push(index + '=' + $('#' +  id).val());
        });
        params = params.join('&');
        $.get(this.ajaxUrl + '?' + params, function(data){
            _this.defaultActionAfterRequest(ele, data);
        });
    },
    countDown: function(){
        var _this = this;
        var i = 0;
        _this.setDisable();
        _this.btnNode.val(_this.timeout - i + '秒后重新发送');
        _this.timer = setInterval(function(){
            if(_this.timeout - 1 == i){
                _this.stopCountDown();
                return false;
            }
            i++;
            _this.btnNode.val(_this.timeout - i + '秒后重新发送');
        }, 1000);
    },
    stopCountDown: function(){
        var _this = this;
        clearInterval(_this.timer);
        _this.btnNode.val(_this.btnText);
        _this.setEnable();
    },
    setDisable: function(){
        this.btnNode.attr('disabled', true);
    },
    setEnable: function(){
        this.btnNode.removeAttr('disabled');
    }
	
},
{
    'superClass': Validator //继承
});
module.exports = Vcode;


});