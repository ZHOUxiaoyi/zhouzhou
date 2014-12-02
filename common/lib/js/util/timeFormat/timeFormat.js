/**
 * @fileoverview 通用时间格式化组件，可提供对时间点、时间段的格式化输出
 * @authors dk (judongkun@baidu.com)
 * @date    2013-09-02
 * @version 1.0
 */

define('util.timeFormat', ['util.numFormat'], function(numFormat){

    /**
     * 根据num获得对应的汉字
     * @param  {Number} num  // 数字
     * @return {String}      // 汉字
     */
    var getCnNum = function(num) {
        var cnNum = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        return num < 11 ? cnNum[num] : (num < 20 ? '十' + cnNum[num % 10] : cnNum[Math.floor(num / 10)] + '十' + cnNum[num % 10]);
    };

    /**
     * 根据月份数组下标获得对应的汉字月份或英文月份
     * @param  {Number}   month    // 月份数组下标
     * @param  {Boolean}  isAbbr   // 月份属否缩写
     * @param  {String}   language // 语言类型，现支持CH、EN
     * @return {String}            // 月份字符串
     */
    var getMonthStr = function(month, isAbbr, language) {
        switch (language) {
            case 'CH':
                return getCnNum(month + 1) + '月';
            case 'EN':
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month].substr(0, isAbbr ? 3 : undefined);
            default:
                return '';
        }
    };

    /**
     * 根据星期获得对应的汉字星期或英文星期
     * @param  {Number}   weekday  // 星期
     * @param  {Boolean}  isAbbr   // 星期是否缩写 
     * @param  {String}   language // 语言类型，现支持CH、EN
     * @return {String}            // 星期字符串
     */
    var getWeekdayStr = function(weekday, isAbbr, language) {
        switch (language) {
            case 'CH':
                return (isAbbr ? '周' : '星期') + (weekday ? getCnNum(weekday) : '日');
            case 'EN':
                return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekday].substr(0, isAbbr ? 3 : undefined);
            default:
                return '';
        }
    };

    /**
     * 根据日期获得对应的汉字日期或英文日期
     * @param  {Number}  date     // 日期
     * @param  {String}  language // 语言类型，现支持CH、EN
     * @return {String}           // 日期字符串
     */
    var getDateStr = function(date, language) {
        switch (language) {
            case 'CH':
                return getCnNum(date) + '日';
            case 'EN':
                return date + (date % 10 < 4 && Math.floor(date / 10) != 1 ? ['th', 'st', 'nd', 'rd'][date % 10] : 'th');
            default:
                return '';
        }
    };


    var timeFormat = {

        /**
         * 根据time构造时间对象，time不合法时将抛出异常
         * @param  {Number|String|Date} time  // 时间(可选，默认为客户端当前时间)
         * @return {Date}                     // Date对象
         * 
         * 火狐对毫秒格式支持的不完善，解决方法请用时间戳构造毫秒级
         * @example
         * timeFormat.buildTime('2013-09-02 19:56:00.0'); // 构造时间Date {Mon Sep 02 2013 19:56:00 GMT+0800}
         * timeFormat.buildTime('1378122960000');         // 构造时间Date {Mon Sep 02 2013 19:56:00 GMT+0800}
         * timeFormat.buildTime(1378122960000);           // 构造时间Date {Mon Sep 02 2013 19:56:00 GMT+0800}
         */
        buildTime: function(time) {
            var builtTime;

            switch (typeof(time)) {
                case 'number':
                    builtTime = new Date(parseInt(time));
                    break;
                case 'string':
                    builtTime = Number(time) ? arguments.callee(parseInt(time)) : new Date(time.replace(/-/g, '/').replace('+0800', ''));
                    break;
                default:
                    builtTime = time instanceof Date ? time : new Date();
            }

            if (builtTime == 'Invalid Date') {
                throw new Error('[timeFormat]: Invalid Date!');
            }

            return builtTime;
        },

        /**
         * 根据指定模式及指定语言格式化时间点(请参阅示例描述)
         * @param  {Number|String|Date} time   // 要格式化的时间(可选，此值将经由buildTime()方法处理，默认为客户端当前时间)
         * @param  {String} formatPattern      // 格式化模式串(可选，默认为“yyyy/MM/dd HH:mm:ss”)
         * @param  {String} language           // 语言，取值“CH”(中文)、“EN”(英文)(可选，默认为中文)
         * @return {String}                    // 格式化后的时间字符串
         * 
         * formatPattern附加说明：
         *          y : 不包含纪元的年输出，如“1”、“12”
         *         yy : 不包含纪元的年输出，不足两位时以前缀0补足，如“01”、“12”
         *    yyy(3+) : 包含纪元的年输出，以前缀0补足余位，如“2001”、“002012”
         *          M : 月，如“1”、“12”
         *         MM : 月，不足两位时以前缀0补足，如“01”、“12”
         *        MMM : 月，中文输出中文数字月表示，如“一月”、“十二月”；英文输出英文月简写，如“Jan”、“Dec”
         *   MMMM(4+) : 月，中文输出中文数字月表示，如“一月”、“十二月”；英文输出英文月全写，如“January”、“December”
         *          d : 日期，如“1”、“10”、“22”
         *         dd : 日期，不足两位时以前缀0补足，如“01”、“10”、“22”
         *    ddd(3+) : 日期，中文输出中文数字月表示，如“一日”、“十日”、“二十二日”；英文输出英文日表示，如“1st”、“10th”、“22nd”
         *          w : 星期，中文输出中文星期简写，如“周一”、“周日”；英文输出英文星期简写，如“Mon”、“Sun”
         *     ww(2+) : 星期，中文输出中文星期全写，如“星期一”、“星期日”；英文输出英文星期全写，如“Monday”、“Sunday”
         *          h : 小时（12时制），如“1”、“8”
         *     hh(2+) : 小时（12时制），不足两位时以前缀0补足，如“01”、“08”
         *          H : 小时（24时制），如“1”、“20”
         *     HH(2+) : 小时（24时制），不足两位时以前缀0补足，如“01”、“20”
         *          m : 分，如“1”、“30”
         *     mm(2+) : 分，不足两位时以前缀0补足，如“01”、“30”
         *          s : 秒，如“1”、“30”
         *     ss(2+) : 秒，不足两位时以前缀0补足，如“01”、“30”
         *          f : 毫秒，截取一位毫秒值，如“0”、“1”，注意：此处是截取值
         *         ff : 毫秒，截取两位毫秒值，不足两位时以前缀0补足，如“00”、“01”、“10”，注意：此处是截取值
         *    fff(3+) : 毫秒，取全部三位毫秒值，不足三位时以前缀0补足，如“001”、“010”、“456”
         * 
         * @example
         * var t = timeFormat.buildTime('2013-09-02 19:56:00.02');       // 构造待格式化的时间
         * timeFormat.formatTimePoint(t);                                // '2013/09/02 19:56:00'(默认格式化模式)
         * timeFormat.formatTimePoint(t, 'yy-MM-dd hh:mm:ss.f');         // '13-09-02 07:56:00.0'
         * timeFormat.formatTimePoint(t, 'yyyyy-MM-dd HH:mm:ss.ff');     // '02013-09-02 19:56:00.02'
         * timeFormat.formatTimePoint(t, 'yyyy-MM-dd w');                // '2013-09-02 周一'
         * timeFormat.formatTimePoint(t, 'yyyy年 MMM ddd ww');           // '2013年 九月 二日 星期一'
         * timeFormat.formatTimePoint(t, 'yyyy MMM ddd w', 'EN');        // '2013 Sep 2nd Mon'
         * timeFormat.formatTimePoint(t, 'yyyy MMMM dddd ww', 'EN');     // '2013 September 2nd Monday'
         */
        formatTimePoint: function(time, formatPattern, language) {
            time = this.buildTime(time);
            formatPattern = formatPattern || 'yyyy/MM/dd HH:mm:ss';
            language = /^(CH|EN)$/i.test(language) ? language.toUpperCase() : 'CH';

            // Hours/Minutes/Seconds.
            var timeSlices = {
                'h+': time.getHours() > 12 ? time.getHours() - 12 : time.getHours(),
                'H+': time.getHours(),
                'm+': time.getMinutes(),
                's+': time.getSeconds()
            };

            for (var timeSlice in timeSlices) {
                formatPattern = formatPattern.replace(new RegExp(timeSlice, 'g'), function(matchStr) {
                    return numFormat.getZeroPrefixedNum(timeSlices[timeSlice], Math.min(2, matchStr.length));
                });
            }

            // Milliseconds.
            formatPattern = formatPattern.replace(/f+/g, function(matchStr) {
                return numFormat.getZeroPrefixedNum(time.getMilliseconds(), 3).substr(0, Math.min(matchStr.length, 3));
            });

            // Year.
            formatPattern = formatPattern.replace(/y+/g, function(matchStr) {
                return matchStr.length < 3 ? numFormat.getZeroPrefixedNum(time.getFullYear() % 1000, Math.min(matchStr.length, 2)) : numFormat.getZeroPrefixedNum(time.getFullYear(), matchStr.length);
            });

            // Month.
            formatPattern = formatPattern.replace(/M+/g, function(matchStr) {
                return matchStr.length < 3 ? numFormat.getZeroPrefixedNum(time.getMonth() + 1, matchStr.length) : getMonthStr(time.getMonth(), matchStr.length == 3, language);
            });

            // Date.
            formatPattern = formatPattern.replace(/d+/g, function(matchStr) {
                return matchStr.length < 3 ? numFormat.getZeroPrefixedNum(time.getDate(), matchStr.length) : getDateStr(time.getDate(), language);
            });

            // Weekday.
            formatPattern = formatPattern.replace(/w+/g, function(matchStr) {
                return getWeekdayStr(time.getDay(), matchStr.length < 2, language);
            });

            return formatPattern;
        },

        /**
         * 根据指定模式格式化时间段(请参阅示例描述)
         * @param  {Number|String|Date} startTime    // 要格式化的时间(可选，此值将经由buildTime()方法处理，默认为客户端当前时间)
         * @param  {Number|String|Date} endTime      // 范围的结束时间(可选，此值将经由buildTime()方法处理，默认为客户端当前时间)
         * @param  {String} formatPattern            // 格式化模式串(可选，默认为“d天h小时m分s秒f毫秒”，
         *                                              并且此时将尽可能完整地输出有意义的时间段描述)
         * @return {String}                          // 格式化后的时间段字符串
         *
         * formatPattern参数说明：
         *      d(n+) : 天分量，以前缀0补足余位，如“10”、“0010”
         *          h : 小时分量(24时制)，如“1”、“30”
         *     hh(2+) : 小时分量(24时制)，不足两位时以前缀0补足，如“01”、“30”
         *          m : 分分量，如“1”、“30”
         *     mm(2+) : 分分量，不足两位时以前缀0补足，如“01”、“30”
         *          s : 秒分量，如“1”、“30”
         *     ss(2+) : 秒分量，不足两位时以前缀0补足，如“01”、“30”
         *          f : 毫秒分量，如“0”、“10”、“100”，注意：此处非截取值
         *         ff : 毫秒分量，不足两位时以前缀0补足，如“01”、“10”、“100”，注意：此处非截取值
         *     ff(3+) : 毫秒分量，不足三位时以前缀0补足，如“001”、“010”、“100”，注意：此处非截取值
         *
         * @example
         * var st = timeFormat.buildTime('2013-09-02 0:0:0.0');       // 构造待格式化的时间段起始时间
         * var et = timeFormat.buildTime('2013-09-03 08:09:10.012');  // 构造待格式化的时间段结束时间
         *                                                               (与起始时间相差86950123毫秒)
         * timeFormat.formatTimeSpan(st, et);                         // '1天8小时9分10秒'(默认格式化模式)
         * timeFormat.formatTimeSpan(et, st);                         // '-1天8小时9分10秒'(默认格式化模式)
         * timeFormat.formatTimeSpan(st, et, 'd天h小时m分s秒f毫秒');  // '1天8小时9分10秒12毫秒'
         * timeFormat.formatTimeSpan(st, et, 'm分s秒ff毫秒');         // '1929分10秒12毫秒'
         * timeFormat.formatTimeSpan(st, et, 's秒fff毫秒');           // '115750秒012毫秒'
         * timeFormat.formatTimeSpan(st, et, 'd天s秒');               // '1天29350秒'
         * timeFormat.formatTimeSpan(st, et, 'hh:mm:ss');             // '32:09:10'
         * 
         * timeFormat.formatTimeSpan('2013-09-02 0:0:0.0', '2013-09-02 21:1:1.0');    // '21小时1分1秒'(默认格式化模式)
         * timeFormat.formatTimeSpan('2013-09-02 0:0:0.0', '2013-09-02 1:30:0.0');    // '1小时30分'(默认格式化模式)
         * timeFormat.formatTimeSpan('2013-09-02 0:0:0.0', '2013-09-03 0:30:0.0');    // '1天30分'(默认格式化模式)
         * timeFormat.formatTimeSpan('2013-09-02 0:0:0.0', '2013-09-03 0:30:0.1');    // '1天30分100毫秒'(默认格式化模式)
         */
        formatTimeSpan: function(startTime, endTime, formatPattern) {
            var oriFormatPattern = formatPattern;
            startTime = this.buildTime(startTime);
            endTime = this.buildTime(endTime);
            formatPattern = formatPattern || 'd天h小时m分s秒f毫秒';

            var timeDifference = Math.abs(endTime.getTime() - startTime.getTime());
              var timeSlices = [
                { pattern: /d+/g, rate: 24 * 60 * 60 * 1000 },
                { pattern: /h+/g, rate: 60 * 60 * 1000 },
                { pattern: /m+/g, rate: 60 * 1000 },
                { pattern: /s+/g, rate: 1000 },
                { pattern: /f+/g, rate: 1 }
              ];

            for (var i = 0; i < timeSlices.length; ++i) {
                timeSlices[i].value = timeDifference;
                for (var j = 0; j < i; ++j) {
                    if (formatPattern.match(timeSlices[j].pattern)) {
                        timeSlices[i].value -= timeSlices[j].value * timeSlices[j].rate;
                    }
                }
                timeSlices[i].value = Math.floor(timeSlices[i].value / timeSlices[i].rate);
            }

            for (var i = 0; i < timeSlices.length; ++i) {
                formatPattern = formatPattern.replace(timeSlices[i].pattern, function(matchStr) {
                    var subLen = Math.min(matchStr.length, (i == 0 ? Infinity : (i == 4 ? 3 : 2)));
                    return numFormat.getZeroPrefixedNum(timeSlices[i].value, subLen);
                });
            }

            formatPattern = oriFormatPattern ? formatPattern : formatPattern.replace(/(\d+)(?:天|小时|分|秒|毫秒)/g, function(matchStr, num) {
                return Number(num) ? matchStr : '';
            });
            return (endTime >= startTime ? '' : '-') + formatPattern;
        },

        /**
         * 根据指定模式格式化起止时间(请参阅示例描述)
         * @param  {Number|String|Date} startTime   // 要格式化的起始时间(可选，此值将经由buildTime()方法处理，默认为客户端当前时间)
         * @param  {Number|String|Date} endTime     // 要格式化的结束时间(可选，此值将经由buildTime()方法处理，默认为客户端当前时间)
         * @param  {String} startTimePattern        // 起始时间格式化模式串(可选，默认为“yyyy/MM/dd HH:mm:ss”)
         * @param  {String} endTimePattern          // 结束时间格式化模式串(可选，默认同起始时间格式化模式串)
         * @param  {String} separator               // 分隔符(可选，默认为“-”)
         * @param  {String} language                // 语言，取值“CH”(中文)、“EN”(英文)(可选，默认为中文)
         * @return {String}                         // 格式化后的起止时间字符串
         * @example
         * var st = '2013-09-02 21:30:0';
         * var et = '2013-09-02 22:00';
         * timeFormat.formatStartEndTime(st, et);                     // '2013/09/02 21:30:00-2013/09/02 22:00:00'(默认格式化模式)
         * timeFormat.formatStartEndTime(st, et, 'HH:mm');            // '21:30-22:00'
         * timeFormat.formatStartEndTime(st, et, 'HH:mm', 'hh:mm');   // '21:30-10:00'
         * timeFormat.formatStartEndTime(st, et, 'HH:mm', null, '~'); // '21:30~22:00'
         */
        formatStartEndTime: function(startTime, endTime, startTimePattern, endTimePattern, separator, language) {
            startTime = this.buildTime(startTime);
            endTime = this.buildTime(endTime);
            separator = ((separator == null || typeof(separator) == 'undefined') ? '-' : separator).toString();
            startTimePattern = startTimePattern || 'yyyy/MM/dd HH:mm:ss';
            endTimePattern = endTimePattern || startTimePattern;

            return this.formatTimePoint(startTime, startTimePattern, language) + separator + this.formatTimePoint(endTime, endTimePattern, language);
        },

        /**
         * 根据指定模式格式化时间差(请参阅示例描述)
         * @param  {Number} timeDifference   // 要格式化的时间差(必选，单位：毫秒)
         * @param  {String} formatPattern    // 格式化模式串(可选，默认为“d天h小时m分s秒f毫秒”，
         *                                      并且此时将尽可能完整地输出有意义的时间段描述)
         * @return {String}                  // 格式化后的时间差字符串
         * @example
         * timeFormat.formatTimeDifference(2000);                    // '2秒'(默认格式化模式)
         * timeFormat.formatTimeDifference(5400000);                 // '1小时30分'(默认格式化模式)
         * timeFormat.formatTimeDifference(5400000, 'hh:mm:ss');     // '01:30:00'
         */
        formatTimeDifference: function(timeDifference, formatPattern) {
            if (timeDifference == null || typeof(timeDifference) == 'undefined') {
                throw new Error('[timeFormat]: Invalid arguments!');
            }
            return this.formatTimeSpan(0, timeDifference, formatPattern);
        }
    };

    return timeFormat;
});