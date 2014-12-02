define('ui.bdSecurityEdit', ['require', 'exports', 'module', 'util', 'widget'], function(require, exports, module, util, widget){    
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
    VERSION: '1,0,3,0'  // 用于IE自动安装cab的版本号 1,0,3,0是线上控件版本号; 1,0,0,6是线下控件版本号
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