
 
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