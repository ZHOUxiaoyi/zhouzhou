
/**
 * widget ui组件基类
 * @class
 * @param  {Object} proto  会将该object挂载在这个widget返回函数的prototype上
 * @param  {Object|Null} method 该widget的的一些类型及继承父类、插件
 * @return {Function}	返回这个widget包装后的function
 */

define('widget', ['util'], function(util){
	var widget = function(proto, method) {
		proto = util.mix(proto || {}, {
			'el': '',
			'_init': util.blankFunction, //构造函数
			'Options': {} //默认选项
		});
		method = util.mix(method || {}, {
			'superClass': util.Class //继承
		});
		var $super = method.superClass,
		fn = function(options) {
			var me = this;
			
			options = options || {};
			me.options = me.setOptions(options, options.el || me.el);
			
			//me.type = method.type;
			//fn.superClass._init && fn.superClass._init.call(me, options); //执行父构造器
			me._init && me._init.call(me, options); //执行构造器
			
		}
		util.inherits(fn, $super); //继承$super
		fn.extend(util.mix(proto, widget._method)); //挂载默认的扩展原型
		return fn;
	};
	widget._method = {
		/**
		 * setOptions 设置默认options,会从dom中获取data-options作为options
		 * @param {Object|Null} options options参数
		 * @param {Element|Null} element 需要获取options的dom元素
		 * return {Object} 返回合并后的options
		 */
		setOptions: function(options, element) {
			if (util.isElement(element)) {
				options = util.mix(options, new Function('return ' + $(element).attr('data-options'))() || {}); //从element那获取参数
			}

			if (options) {
				options = util.mix(util.mix({},this.Options), options, true);
				util.mix(this, options, true);
			}
			return options;
		},
		/**
		 * dispose 析构函数 
		 * 析构时派发ondispose事件并调用基类的dispose来做销毁
		 * @return {Undefined}
		 */
		dispose: function() {
			this.trigger("ondispose") && util.Class.prototype.dispose.call(this);
		}
	};
	return widget;
});
