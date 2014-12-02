define("ui.vcode", ["require", "exports", "module", "util", "widget", "util.rule","ui.validator"],function(require, exports, module){



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