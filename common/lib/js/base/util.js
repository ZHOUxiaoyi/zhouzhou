/**
* @fileoverview js底层方法
* @author zh（zhangguoqiang@baidu.com）
* @date 2013-08-05
*/

define('util', [], function() {

	var util = util || {};

	util.isString = function (source) {
		return '[object String]' == Object.prototype.toString.call(source);
	};
	util.isArray = function (source) {
		return '[object Array]' == Object.prototype.toString.call(source);
	};
	util.isFunction = function(source){
		return '[object Function]' == Object.prototype.toString.call(source);
	};

	util.isElement = function (source) {
		return !!(source && source.nodeName && source.nodeType == 1);
	};

	util.mix = function(des, src, override) {
		for (i in src) {
			if (override || !(i in des)) {
				des[i] = src[i];
			}
		}
		return des;
	};

	//排除函数作用域链干扰
	util.blankFunction = function () {};

	//使subClass继承superClass的prototype
	util.inherits = function(subClass, superClass){
		var key, proto, 
			selfProps = subClass.prototype, 
			clazz = new Function();
			
		clazz.prototype = superClass.prototype;
		proto = subClass.prototype = new clazz();

		for (key in selfProps) {
			proto[key] = selfProps[key];
		}
		subClass.prototype.constructor = subClass;
		subClass.superClass = superClass.prototype;

		subClass.extend = function(json) {
			for (var i in json) proto[i] = json[i];
			return subClass;
		}
		
		return subClass;
	};

	util.format = function(tpl,data){
		var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' + 'with(obj||{}){__p.push(\'' + tpl.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/{%([\s\S]+?)%}/g, function(match, code) {
			return "'," + code.replace(/\\'/g, "'") + ",'";
		}).replace(/<%([\s\S]+?)%>/g, function(match, code) {
			return "');" + code.replace(/\\'/g, "'").replace(/[\r\n\t]/g, ' ') + "__p.push('";
		}).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\t/g, '\\t') + "');}return __p.join('');";
		var func = new Function('obj', tmpl);
		return data ? func(data) : func;
	};

	util.Event = function (type, target) {
		this.type = type;
		this.returnValue = true;
		this.target = target || null;
		this.currentTarget = null;
	};
	util.Class = function(){};

	util.Class.prototype.dispose = function() {
		for(var property in this){
			typeof this[property] != "function" && delete this[property];
		}
	};

	util.Class.prototype.bind = function(type, handler){
		if (typeof handler != "function") {
			return;
		}

		!this.__listeners && (this.__listeners = {});

		var i, t = this.__listeners;

		type.indexOf("on") && (type = "on" + type);

		typeof t[type] != "object" && (t[type] = []);

		// 避免函数重复注册
		for (i = t[type].length - 1; i >= 0; i--) {
			if (t[type][i] === handler) return handler;
		};

		t[type].push(handler);

		return handler;
	};
	util.Class.prototype.unbind = function(type,handler){
		var i,
			t = this.__listeners;
		if (!t) return;

		// remove all event listener
		if (typeof type == "undefined") {
			for (i in t) {
				delete t[i];
			}
			return;
		}

		type.indexOf("on") && (type = "on" + type);

		// 移除某类事件监听
		if (typeof handler == "undefined") {
			delete t[type];
		} else if (t[type]) {

			for (i = t[type].length - 1; i >= 0; i--) {
				if (t[type][i] === handler) {
					t[type].splice(i, 1);
				}
			}
		}
	};

	util.Class.prototype.trigger = function(event,options){

		util.isString(event) && (event = new util.Event(event));

		!this.__listeners && (this.__listeners = {});

		// 将 options extend到event中去传递
		options = options || {};
		for (var i in options) {
			event[i] = options[i];
		}

		var i, n, me = this, t = me.__listeners, p = event.type;
		event.target = event.target || (event.currentTarget = me);

		// 支持非 on 开头的事件名
		p.indexOf("on") && (p = "on" + p);

		typeof me[p] == "function" && me[p].apply(me, arguments);

		if (typeof t[p] == "object") {
			for (i=0, n=t[p].length; i<n; i++) {
				t[p][i] && t[p][i].apply(me, arguments);
			}
		}
		return event.returnValue;
	};

	util.each = function(obj, fn){
		var returnValue, key, item; 
	    if ('function' == typeof fn) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                item = obj[key];
	                returnValue = fn.call(obj, item, key);
	        
	                if (returnValue === false) {
	                    break;
	                }
	            }
	        }
	    }
	    return obj;
	};

	util.some = function(arr, fn, bind){
		if(Array.prototype.some){
			return [].some.call(arr,fn,bind);
		}
		for(var i = 0, l = arr.length; i < l; i++){
			if(fn.call(bind,arr[i], i, arr)){
				return true;
			}
		}
		return false;
	};
	util.every = function(arr, fn, bind){
		if(Array.prototype.every){
			return [].every.call(arr,fn,bind);
		}
		for(var i = 0, l = arr.length; i < l; i++){
			if(!fn.call(bind,arr[i], i, arr)){
				return false;
			}
		}
		return true;
	};

	util.str2obj = function(str){
		return (new Function("return (" + str + ")"))();
	};
	return util;
});
