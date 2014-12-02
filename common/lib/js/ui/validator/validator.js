define("ui.validator", ["require", "module", "util", "widget", "util.rule"],  function(require, module){


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