define("ui.combobox", ["module", "util", "widget"], function(module){


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