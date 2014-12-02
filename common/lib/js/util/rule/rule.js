define("util.rule", ["require", "exports", "module"], function(require, exports, module){



var RULES = {
    required: {
        rule: function(ele) {
            var t = ele.attr("type");
            switch (t) {
                case "checkbox":
                case "radio":
                    var n = ele.attr("name");
                    var eles = this.formNode.find('input[name="' + n + '"]');
                    return util.some(ele, function(item) {
                        return item.attr("checked");
                    });
                default:
                    var v = ele.val();
                    if (!v) {
                        return false;
                    }
                    return true;
            }
        },
        triggerMethod: ['blur'],
        tip: '请输入%s'
    },
    trimAll: {
        rule: function(ele){
            var val = ele.val().replace(/\s+/g, '');
            ele.val(val);
            return true;
        },
        tip: ' %s去除空格'
    },
    minLength: {
        rule: function(ele, num){
            return ele.val().length >= num;
        },
        tip: '输入的%s长度不能小于%s位'
    },
    maxLength: {
        rule: function(ele, num){
            return ele.val().length <= num;
        },
        tip: '输入的%s长度不能大于%s位'
    },
    minValue: {
        rule: function(ele, num){
            return parseFloat(ele.val()) >= num;
        },
        tip: '%s不能小于%s'
    },
    name: {
        rule: /^[\u2FFF-\u9FFF]+(?:·[\u2FFF-\u9FFF]+)*$/,
        tip: '%s格式不正确'
    },
    identity: {
        rule: function(ele){
            var val = ele.val().replace(/\s+/g, '');
            ele.val(val);
            if(/^\d{15}$|^\d{17}[0-9a-zA-Z]$/.test(val)){
                return true;
            }
            return false;
        },
        tip: '%s格式为15或18位数字'
    },
    email: {
        rule: /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/,
        tip: '邮箱格式错误'
    },
    mobile: {
        rule: /^1[34578]\d{9}$/,
        tip: '手机号码格式错误'
    },
    number: {
        rule: /^[0-9]+$/,
        tip: '%s必须为数字'
    },
    integer: {
        rule: /^[0-9]+$/,
        tip: '%s必须为整数'
    },
    pwd: {
        rule: /^[\w\~\!\@\#\$\%\^\&\*\(\)\+\`\-\=\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?0-9a-zA-z]{6,20}$/,
        tip: '%s应该由6-20个英文字母、数字或符号组成'
    },
    newPwd: {
        rule: function(ele){
            var val = ele.val();
            if(val.length<6||val.length>20){
                return false;
            }else if(/\s/.test(val)){
                return false;
            }else if(/^(?:[a-zA-Z]+||[0-9]+||[\~\!\@\#\$\%\^\&\*\(\)\+\`\-\=\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?]+)$/.test(val)){
                return false;
            }
            return true;
        },
        tip: '%s应该由6-20个英文字母、数字或符号组成'
    },
    select:{
        rule: function(ele){
            var val = ele.val().replace(/\s+/g, '');
            if(val==''){
                return false;
            }
            return true;
        },
        tip: '%s请选择地区'
    },
    confirm: {
        rule: function(a ,b){
            return a.val() == b.val();
        },
        tip: '两次%s输入不一致'
    },
    trueName: {
        rule: {
            type: ['trimAll', 'required', 'name', ['minLength', 2], ['maxLength', 16]],
            desc: '姓名'
        }
    },
    buyAmount: {
        rule: {
            type: ['required', 'integer', ['minValue', 1]],
            desc: '金额'
        }
    },
    identityCard: {
        rule: {
            type: ['required', 'identity'],
            desc: '身份证'
        }
    },
    mobileNo: {
        rule:{
            type: ['trimAll', 'required', ['minLength', 11], ['maxLength', 11], 'mobile'],
            desc: '手机号码',
            triggerMethod: ['bulr', 'keyup']
        }
    },
    creditNo: {
        rule:{
            type: ['trimAll', 'required', 'number', ['minLength', 6], ['maxLength', 19]],
            desc: '卡号'
        }
    },
    bankCode: {
        rule:{
            type: ['trimAll', 'required', ['minLength', 4], ['maxLength', 4]],
            desc: '银行卡'
        }
    },
    vcodeNo: {
        rule:{
            type: ['trimAll', 'required', ['minLength', 4], ['maxLength', 4]],
            desc: '验证码'
        }
    },
    vcodeNoLicai: {
        rule:{
            type: ['trimAll', 'required', ['minLength', 6], ['maxLength', 6]],
            desc: '验证码'
        }
    },
    payPwd: {
        rule:{
            type: ['required', 'pwd'],
            desc: '支付密码'
        }
    },
    newPayPwd: {
        rule:{
            type: ['required', 'newPwd'],
            desc: '支付密码'
        }
    },
    addressSelect: {
        rule:{
            type: ['select'],
            desc: '选择地址'
        }
    },
    payPwdConfirm: {
        rule:{
            type: ['required', ['confirm', $('#pay-pwd')], 'pwd'],
            desc: '支付密码'
        }
    },
    mailCode: {
        rule:{
            type: ['required', 'number', ['minLength', 6], ['maxLength', 6]],
            desc: '邮政编码'
        }
    },
    answer: {
        rule:{
            type: ['required', ['minLength', 2], ['maxLength', 20]],
            desc: '安全问题答案',
            triggerMethod: ['bulr', 'keyup']
        }
    }
};

var ruleFactory = {
    getRule: function(ruleName){
        return RULES[ruleName].rule || function(){
            return true;
         };
    },
    setRule: function(ruleName, rule){
        RULES[ruleName] = rule;
    },
    getTip: function(ruleName){
        return RULES[ruleName].tip || '';
    },
    setTip: function(ruleName, tip){
        RULES[ruleName].tip = tip;
    }
}

module.exports = ruleFactory;


});