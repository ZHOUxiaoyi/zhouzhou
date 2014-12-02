/**
 * @fileoverview 通用数字格式化方法
 * @authors dk (judongkun@baidu.com)
 * @date    2013-09-02
 * @version 1.0
 */
define('util.numFormat', [], function(){
    var numFormat = {

        /**
         * 获取以0做前缀补齐长度的数字串,如果要补齐的数字原始长度大于要补齐位的总长度，则原数字不做截断，原样输出
         * @param  {String} str    // 要做补齐的数字(可选，默认为空)
         * @param  {Number} digits // 补齐后的总位数(可选，默认为undefined，此时不添加前缀0)
         * @return {String}        // 格式化后的字符串
         * @example
         * numFormat.getZeroPrefixedNum(1, 3);   // '001'
         * numFormat.getZeroPrefixedNum(123, 2); // '123'
         */
        getZeroPrefixedNum: function(str, digits) {
            var _zeroStrArr = [];
            str = (typeof(str) == 'undefined' ? '' : str) + '';
            for (var i = 0; i < digits; ++i) {
                _zeroStrArr.push(0);
            }

            return _zeroStrArr.join('').substr(0, digits - str.toString().length) + str;
        },

        /**
         * 将指定字符串中所包含的数字格式化为以指定分隔符逆序每3位间隔一次的字串(注：请确保使用十进制计数）
         * @param  {String} str       // 要格式化的字符串(可选，默认为空)
         * @param  {String} separator // 间隔符(可选，默认为半角逗号)
         * @return {String}           // 格式化后的字符串
         * @example
         * numFormat.getSignSeparatedNum('同时在线：12345678 人'); // '同时在线：12,345,678 人'
         * numFormat.getSignSeparatedNum('12345.123456');          // '12,345.123456'(注：浮点数的小数部分将不会被间隔处理)
         * numFormat.getSignSeparatedNum('1234567890', '|');       // '1|234|567|890'
         */
        getSignSeparatedNum: function(str, separator) {
            str = (typeof(str) == 'undefined' ? '' : str) + '';
            separator = typeof(separator) == 'undefined' ? ',' : separator;

            return str.replace(/(\d+)(\.\d+)?/g, function(num, a, b) {
                return (a.length > 3 ? (a.indexOf(separator) < 0 || a.indexOf(separator) > 3 ? arguments.callee(null, a.replace(/(\d+)(\d{3})/, '$1' + separator + '$2')) : a) : a) + (b || '');
            });
        },

        /**
         * 将指定字符串格式化为金钱数字样式(单位：元，精确到分，即小数点后两位)
         * @param  {String} str       // 要格式化的字符串(可选，默认为空)
         * @param  {String} separator // 间隔符(可选，默认为半角逗号)
         * @return {String}           // 格式化后的字符串
         * @example
         * numFormat.getMoneyLikeNum(0);          // 0.00
         * numFormat.getMoneyLikeNum('0');        // 0.00
         * numFormat.getMoneyLikeNum('0.09');     // 0.00
         * numFormat.getMoneyLikeNum('9');        // 0.09
         * numFormat.getMoneyLikeNum('12345678'); // 123,456.78
         * numFormat.getMoneyLikeNum('123.8871'); // 1.23
         */
        getMoneyLikeNum: function(str, separator) {
            var _res = '';
            str = (typeof(str) == 'undefined' ? '' : str) + '';

            if (str.indexOf('.') > -1) {
                str = str / 100 + '';
                var _pointPos = str.indexOf('.');
                _res = str.substr(0, _pointPos) + '.' + str.substr(_pointPos + 1, 2);
            } else {
                str = this.getZeroPrefixedNum(str, 3);
                _res = str.length > 2 ? str.substr(0, str.length - 2) + '.' + str.substr(str.length - 2, 2) : str;
            }

            return this.getSignSeparatedNum(_res, separator);
        }
    };

    return numFormat;
});