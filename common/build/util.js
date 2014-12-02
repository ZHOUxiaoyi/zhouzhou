/**
 * 省市区县数据
 * @authors dk (judongkun@baidu.com)
 * @date    2013-09-18
 * @version 1.0 // 华夏code版
 *
 * @example
 * areas.COUNTRIES
 * areas.MAIN_CITIES
 * areas.PROVINCES
 * areas.CITIES
 */
define('util.areaData', [], function(){
var areas = {
    // 国家
    'COUNTRIES': [['中国', '080'], ['香港', '00862'], ['美国', '001']],
    // 主要城市
    'MAIN_CITIES': '北京,上海,重庆,深圳,广州'.split(','),
    // 省
    'PROVINCES': [],
    // 市
    'CITIES': {}
};

var sData = '北京市::北京市:;北京市辖县:;;天津市::天津市:;天津市辖县:;;河北省::石家庄市:;唐山市:;秦皇岛市:;邯郸市:;邢台市:;保定市:;张家口市:;承德市:;沧州市:;廊坊市:;衡水市:;华北石油:;鹿泉市:;;山西省::太原市:;大同市:;阳泉市:;长治市:;晋城市:;朔州市:;晋中市:;运城市:;忻州市:;临汾市:;吕梁市:;榆次市:;;内蒙古自治区::呼和浩特市:;包头市:;乌海市:;赤峰市:;通辽市:;鄂尔多斯市:;呼伦贝尔市:;巴彦淖尔市:;乌兰察布市:;伊克昭盟:;满洲里:;准格尔:;哲里木盟:;锡盟:;乌盟:;阿盟:;二连浩特:;兴安盟:;锡林郭勒盟:;乌兰察布盟:;阿拉善盟市:;;辽宁省::沈阳市:;大连市:;鞍山市:;抚顺市:;本溪市:;丹东市:;锦州市:;营口市:;阜新市:;辽阳市:;盘锦市:;铁岭市:;朝阳市:;葫芦岛市:;;吉林省::长春市:;吉林市:;四平市:;辽源市:;通化市:;白山市:;松原市:;白城市:;延边自治州:;;黑龙江省::哈尔滨市:;齐齐哈尔市:;鸡西市:;鹤岗市:;双鸭山市:;大庆市:;伊春市:;佳木斯市:;七台河市:;牡丹江市:;黑河市:;绥化市:;大兴安岭地区:;尚志市:;延寿县:;巴彦县:;木兰县:;依兰县:;通河县:;方正县:;五常市:;;上海市::上海市:;上海市辖县:;;江苏省::南京市:;无锡市:;徐州市:;常州市:;苏州市:;南通市:;连云港市:;淮安市:;盐城市:;扬州市:;镇江市:;泰州市:;宿迁市:;淮阴:;江阴市:;张家港市:;;浙江省::杭州市:;宁波市:;温州市:;嘉兴市:;湖州市:;绍兴市:;金华市:;衢州市:;舟山市:;台州市:;丽水市:;诸暨市:;义乌市:;;安徽省::合肥市:;芜湖市:;蚌埠市:;淮南市:;马鞍山市:;淮北市:;铜陵市:;安庆市:;黄山市:;滁州市:;阜阳市:;宿州市:;巢湖市:;六安市:;亳州市:;池州市:;宣城市:;宿县:;;福建省::福州市:;厦门市:;莆田市:;三明市:;泉州市:;漳州市:;南平市:;龙岩市:;宁德市:;;江西省::南昌市:;景德镇市:;萍乡市:;九江市:;新余市:;鹰潭市:;赣州市:;吉安市:;宜春市:;抚州市:;上饶市:;;山东省::济南市:;青岛市:;淄博市:;枣庄市:;东营市:;烟台市:;潍坊市:;济宁市:;泰安市:;威海市:;日照市:;莱芜市:;临沂市:;德州市:;聊城市:;滨州市:;菏泽地区:;;河南省::郑州市:;开封市:;洛阳市:;平顶山市:;安阳市:;鹤壁市:;新乡市:;焦作市:;濮阳市:;许昌市:;漯河市:;三门峡市:;南阳市:;商丘市:;信阳市:;周口市:;驻马店市:;济源:;;湖北省::武汉市:;黄石市:;十堰市:;宜昌市:;襄樊市:;鄂州市:;荆门市:;孝感市:;荆州市:;黄冈市:;咸宁市:;随州市:;三峡:;天门市:;仙桃市:;恩施州:;秭归县:;五峰县:;潜江:;潜江市:;枝江市:;兴山县:;大冶市:;当阳市:;神农架:;神农架林区:;宜都市:;远安县:;长阳县:;省直辖行政单位:;;湖南省::长沙市:;株洲市:;湘潭市:;衡阳市:;邵阳市:;岳阳市:;常德市:;张家界市:;益阳市:;郴州市:;永州市:;怀化市:;娄底市:;湘西土家族苗族自治州:;;广东省::广州市:;韶关市:;深圳市:;珠海市:;汕头市:;佛山市:;江门市:;湛江市:;茂名市:;肇庆市:;惠州市:;梅州市:;汕尾市:;河源市:;阳江市:;清远市:;东莞市:;中山市:;顺德:;潮州市:;揭阳市:;云浮市:;;广西壮族自治区::南宁市:;柳州市:;桂林市:;梧州市:;北海市:;防城港市:;钦州市:;贵港市:;玉林市:;百色市:;贺州市:;河池市:;来宾市:;崇左市:;平果铝:;;海南省::海口市:;三亚市:;临高县:;乐东县:;东方市:;琼中县:;保亭县:;五指山市:;白沙县:;儋州市:;定安县:;琼山市:;万宁市:;琼海市:;陵水县:;澄迈县:;屯昌县:;文昌市:;昌江县:;省直辖县级行政单位:;;重庆市::重庆市:;重庆市辖县:;重庆市辖其他市:;万县:;涪陵市:;巫溪县:;大足县:;奉节县:;石柱土家族自治县:;綦江县:;丰都县:;云阳县:;彭水苗族土家族自治县:;荣昌县:;酉阳土家族苗族自治县:;双桥市:;垫江县:;江津市:;开县:;万州市:;璧山县:;巫山县:;忠县:;万盛市:;永川市:;潼南县:;铜梁县:;武隆县:;黔江市:;长寿市:;合川市:;南川市:;梁平县:;秀山土家族苗族自治县:;城口县:;;四川省::成都市:;自贡市:;攀枝花市:;泸州市:;德阳市:;绵阳市:;广元市:;遂宁市:;内江市:;乐山市:;南充市:;眉山市:;宜宾市:;广安市:;达州市:;雅安市:;巴中市:;资阳市:;广汉:;阿坝州:;甘孜州:;凉山州:;凉汕:;;贵州省::贵阳市:;六盘水市:;遵义市:;安顺市:;六盘山:;铜仁地区:;黔西南州:;毕节地区:;黔东南州:;黔南州:;;云南省::昆明市:;曲靖市:;玉溪市:;保山市:;昭通市:;丽江市:;思茅市:;临沧市:;东川:;宝山:;邵通:;楚雄州:;红河州:;文山州:;西双版纳州:;大理州:;德宏州:;怒江州:;迪庆州:;;西藏自治区::拉萨市:;昌都地区:;山南地区:;日喀则地区:;那曲地区:;阿里地区:;林芝地区:;樟木口岸:;;陕西省::西安市:;铜川市:;宝鸡市:;咸阳市:;渭南市:;延安市:;汉中市:;榆林市:;安康市:;商洛市:;神府:;;甘肃省::兰州市:;嘉峪关市:;金昌市:;白银市:;天水市:;武威市:;张掖市:;平凉市:;酒泉市:;庆阳市:;定西市:;长庆:;陇南地区:;临夏州:;甘南州:;玉门市:;;青海省::西宁市:;海东地区:;海北州:;黄南州:;海南州:;果洛州:;玉树州:;海西州:;格尔木市:;铝厂:;;宁夏回族自治区::银川市:;石嘴山市:;吴忠市:;固原市:;中卫市:;银南:;;新疆维吾尔自治区::乌鲁木齐市:;克拉玛依市:;吐鲁番地区:;哈密地区:;昌吉回族自治州:;博尔塔拉蒙古自治州:;巴音郭楞蒙古自治州:;阿克苏地区:;克孜勒苏柯尔克孜自治州:;喀什地区:;和田地区:;伊犁哈萨克自治州:;塔城地区:;阿勒泰地区:;巴州:;石河子市:;五家渠市:;阿拉尔市:;库尔勒市:;图木舒克市:;省直辖行政单位:;石油专业:;;台湾省::台湾省:;;香港特别行政区::香港特别行政区:';

var ps = sData.split(';;');
for (var i = 0; i < ps.length; i++) {
    var psData = ps[i].split('::');
    // 一级(省、直辖市)数组
    areas.PROVINCES.push(psData[0]);
    var cityAr = [];
    // 二级(区、市)json对象
    areas.CITIES[psData[0]] = cityAr;
    var cities = psData[1].split(';');
    for (var j = 0; j < cities.length; j++) {
        var citiesData = cities[j].split(':');
        cityAr.push(citiesData[0]);
        // 三级(县)json对象
        //areas.COUNTIES[citiesData[0]] = (citiesData[1] || '').split(',');
    }
}

return areas;
});
;/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
define('util.encrypt', [], function(){
  var hexcase = 0;   /* hex output format. 0 - lowercase; 1 - uppercase        */
  var b64pad  = "";  /* base-64 pad character. "=" for strict RFC compliance   */

  /*
   * These are the functions you'll usually want to call
   * They take string arguments and return either hex or base-64 encoded strings
   */
  function hex_md5(s)    { return rstr2hex(rstr_md5(str2rstr_utf8(s))); }
  function b64_md5(s)    { return rstr2b64(rstr_md5(str2rstr_utf8(s))); }
  function any_md5(s, e) { return rstr2any(rstr_md5(str2rstr_utf8(s)), e); }
  function hex_hmac_md5(k, d)
    { return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
  function b64_hmac_md5(k, d)
    { return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))); }
  function any_hmac_md5(k, d, e)
    { return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

  /*
   * Perform a simple self-test to see if the VM is working
   */
  function md5_vm_test()
  {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
  }

  /*
   * Calculate the MD5 of a raw string
   */
  function rstr_md5(s)
  {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
  }

  /*
   * Calculate the HMAC-MD5, of a key and some data (raw strings)
   */
  function rstr_hmac_md5(key, data)
  {
    var bkey = rstr2binl(key);
    if(bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

    var ipad = Array(16), opad = Array(16);
    for(var i = 0; i < 16; i++)
    {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }

    var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
  }

  /*
   * Convert a raw string to a hex string
   */
  function rstr2hex(input)
  {
    try { hexcase } catch(e) { hexcase=0; }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for(var i = 0; i < input.length; i++)
    {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0F)
             +  hex_tab.charAt( x        & 0x0F);
    }
    return output;
  }

  /*
   * Convert a raw string to a base-64 string
   */
  function rstr2b64(input)
  {
    try { b64pad } catch(e) { b64pad=''; }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for(var i = 0; i < len; i += 3)
    {
      var triplet = (input.charCodeAt(i) << 16)
                  | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                  | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
      for(var j = 0; j < 4; j++)
      {
        if(i * 8 + j * 6 > input.length * 8) output += b64pad;
        else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
      }
    }
    return output;
  }

  /*
   * Convert a raw string to an arbitrary string encoding
   */
  function rstr2any(input, encoding)
  {
    var divisor = encoding.length;
    var i, j, q, x, quotient;

    /* Convert to an array of 16-bit big-endian values, forming the dividend */
    var dividend = Array(Math.ceil(input.length / 2));
    for(i = 0; i < dividend.length; i++)
    {
      dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }

    /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
    var full_length = Math.ceil(input.length * 8 /
                                      (Math.log(encoding.length) / Math.log(2)));
    var remainders = Array(full_length);
    for(j = 0; j < full_length; j++)
    {
      quotient = Array();
      x = 0;
      for(i = 0; i < dividend.length; i++)
      {
        x = (x << 16) + dividend[i];
        q = Math.floor(x / divisor);
        x -= q * divisor;
        if(quotient.length > 0 || q > 0)
          quotient[quotient.length] = q;
      }
      remainders[j] = x;
      dividend = quotient;
    }

    /* Convert the remainders to the output string */
    var output = "";
    for(i = remainders.length - 1; i >= 0; i--)
      output += encoding.charAt(remainders[i]);

    return output;
  }

  /*
   * Encode a string as utf-8.
   * For efficiency, this assumes the input is valid utf-16.
   */
  function str2rstr_utf8(input)
  {
    var output = "";
    var i = -1;
    var x, y;

    while(++i < input.length)
    {
      /* Decode utf-16 surrogate pairs */
      x = input.charCodeAt(i);
      y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
      if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
      {
        x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
        i++;
      }

      /* Encode output as utf-8 */
      if(x <= 0x7F)
        output += String.fromCharCode(x);
      else if(x <= 0x7FF)
        output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                      0x80 | ( x         & 0x3F));
      else if(x <= 0xFFFF)
        output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                      0x80 | ((x >>> 6 ) & 0x3F),
                                      0x80 | ( x         & 0x3F));
      else if(x <= 0x1FFFFF)
        output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                      0x80 | ((x >>> 12) & 0x3F),
                                      0x80 | ((x >>> 6 ) & 0x3F),
                                      0x80 | ( x         & 0x3F));
    }
    return output;
  }

  /*
   * Encode a string as utf-16
   */
  function str2rstr_utf16le(input)
  {
    var output = "";
    for(var i = 0; i < input.length; i++)
      output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                    (input.charCodeAt(i) >>> 8) & 0xFF);
    return output;
  }

  function str2rstr_utf16be(input)
  {
    var output = "";
    for(var i = 0; i < input.length; i++)
      output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                     input.charCodeAt(i)        & 0xFF);
    return output;
  }

  /*
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   */
  function rstr2binl(input)
  {
    var output = Array(input.length >> 2);
    for(var i = 0; i < output.length; i++)
      output[i] = 0;
    for(var i = 0; i < input.length * 8; i += 8)
      output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (i%32);
    return output;
  }

  /*
   * Convert an array of little-endian words to a string
   */
  function binl2rstr(input)
  {
    var output = "";
    for(var i = 0; i < input.length * 32; i += 8)
      output += String.fromCharCode((input[i>>5] >>> (i % 32)) & 0xFF);
    return output;
  }

  /*
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   */
  function binl_md5(x, len)
  {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a =  1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d =  271733878;

    for(var i = 0; i < x.length; i += 16)
    {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;

      a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
      d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
      b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
      d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
      c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
      d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
      d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

      a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
      d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
      c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
      b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
      d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
      c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
      d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
      c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
      a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
      d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
      c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
      b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

      a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
      d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
      b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
      d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
      c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
      d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
      a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
      d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
      b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

      a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
      d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
      c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
      d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
      d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
      a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
      d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
      b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
  }

  /*
   * These functions implement the four basic operations the algorithm uses.
   */
  function md5_cmn(q, a, b, x, s, t)
  {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
  }
  function md5_ff(a, b, c, d, x, s, t)
  {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }
  function md5_gg(a, b, c, d, x, s, t)
  {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }
  function md5_hh(a, b, c, d, x, s, t)
  {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5_ii(a, b, c, d, x, s, t)
  {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  /*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */
  function safe_add(x, y)
  {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }

  /*
   * Bitwise rotate a 32-bit number to the left.
   */
  function bit_rol(num, cnt)
  {
    return (num << cnt) | (num >>> (32 - cnt));
  }


  var encrypt = {};
  encrypt.base64 = rstr2b64;
  encrypt.md5 = hex_md5;

  return encrypt;
});
;/**
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
;define("util.rule", ["require", "exports", "module"], function(require, exports, module){



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
;/*
    http://www.JSON.org/json2.js
    2010-03-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function() {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function(key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON = function(key) {
                return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

        // If the string contains no control characters, no quote characters, and no
        // backslash characters, then we can safely slap some quotes around it.
        // Otherwise we must also replace the offending characters with safe escape
        // sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function(a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

        // Produce a string from holder[key].

        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        // If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

        // If we were called with a replacer function, then call the replacer to
        // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        // What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

                // JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

                // If the value is a boolean or null, convert it to a string. Note:
                // typeof null does not produce 'null'. The case is included here in
                // the remote chance that this gets fixed someday.

                return String(value);

                // If the type is 'object', we might be dealing with an object or an array or
                // null.

            case 'object':

                // Due to a specification blunder in ECMAScript, typeof null is 'object',
                // so watch out for that case.

                if (!value) {
                    return 'null';
                }

                // Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

                // Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

                    // The value is an array. Stringify every element. Use null as a placeholder
                    // for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

                    // Join all of the elements together, separated with commas, and wrap them in
                    // brackets.

                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                        partial.join(',\n' + gap) + '\n' +
                        mind + ']' :
                        '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

                // If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

                    // Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

                // Join all of the member texts together, separated with commas,
                // and wrap them in braces.

                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                    mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

    // If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function(value, replacer, space) {

            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

            // If the space parameter is a number, make an indent string containing that
            // many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

                // If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.

            return str('', {
                '': value
            });
        };
    }


    // If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function(text, reviver) {

            // The parse method takes a text and an optional reviver function, and returns
            // a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

                // The walk method is used to recursively walk the resulting structure so
                // that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


            // Parsing happens in four stages. In the first stage, we replace certain
            // Unicode characters with escape sequences. JavaScript handles many characters
            // incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

            // In the second stage, we run the text against regular expressions that look
            // for non-JSON patterns. We are especially concerned with '()' and 'new'
            // because they can cause invocation, and '=' because it can cause mutation.
            // But just to be safe, we want to reject all unexpected forms.

            // We split the second stage into 4 regexp operations in order to work around
            // crippling inefficiencies in IE's and Safari's regexp engines. First we
            // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
            // replace all simple value tokens with ']' characters. Third, we delete all
            // open brackets that follow a colon or comma or that begin the text. Finally,
            // we look to see that the remaining characters are only whitespace or ']' or
            // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                // In the third stage we use the eval function to compile the text into a
                // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                // in JavaScript: it can begin a block or an object literal. We wrap the text
                // in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

                // In the optional fourth stage, we recursively walk the new structure, passing
                // each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({
                        '': j
                    }, '') : j;
            }

            // If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
// store.js -------------------------------------------------------------------
;
(function(win) {
    var store = {},
        doc = win.document,
        localStorageName = 'localStorage',
        scriptTag = 'script',
        storage

    store.disabled = false
    store.set = function(key, value) {}
    store.get = function(key) {}
    store.remove = function(key) {}
    store.clear = function() {}
    store.transact = function(key, defaultVal, transactionFn) {
        var val = store.get(key)
        if (transactionFn == null) {
            transactionFn = defaultVal
            defaultVal = null
        }
        if (typeof val == 'undefined') {
            val = defaultVal || {}
        }
        transactionFn(val)
        store.set(key, val)
    }
    store.getAll = function() {}
    store.forEach = function() {}

    store.serialize = function(value) {
        return JSON.stringify(value)
    }
    store.deserialize = function(value) {
        if (typeof value != 'string') {
            return undefined
        }
        try {
            return JSON.parse(value)
        } catch (e) {
            return value || undefined
        }
    }

    // Functions to encapsulate questionable FireFox 3.6.13 behavior
    // when about.config::dom.storage.enabled === false
    // See https://github.com/marcuswestin/store.js/issues#issue/13
    function isLocalStorageNameSupported() {
        try {
            return (localStorageName in win && win[localStorageName])
        } catch (err) {
            return false
        }
    }

    if (isLocalStorageNameSupported()) {
        storage = win[localStorageName]
        store.set = function(key, val) {
            if (val === undefined) {
                return store.remove(key)
            }
            storage.setItem(key, store.serialize(val))
            return val
        }
        store.get = function(key) {
            return store.deserialize(storage.getItem(key))
        }
        store.remove = function(key) {
            storage.removeItem(key)
        }
        store.clear = function() {
            storage.clear()
        }
        store.getAll = function() {
            var ret = {}
            store.forEach(function(key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = function(callback) {
            for (var i = 0; i < storage.length; i++) {
                var key = storage.key(i)
                callback(key, store.get(key))
            }
        }
    } else if (doc.documentElement.addBehavior) {
        var storageOwner,
            storageContainer
            // Since #userData storage applies only to specific paths, we need to
            // somehow link our data to a specific path.  We choose /favicon.ico
            // as a pretty safe option, since all browsers already make a request to
            // this URL anyway and being a 404 will not hurt us here.  We wrap an
            // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
            // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
            // since the iframe access rules appear to allow direct access and
            // manipulation of the document element, even for a 404 page.  This
            // document can be used instead of the current document (which would
            // have been limited to the current path) to perform #userData storage.
        try {
            storageContainer = new ActiveXObject('htmlfile')
            storageContainer.open()
            storageContainer.write('<' + scriptTag + '>document.w=window</' + scriptTag + '><iframe src="/favicon.ico"></iframe>')
            storageContainer.close()
            storageOwner = storageContainer.w.frames[0].document
            storage = storageOwner.createElement('div')
        } catch (e) {
            // somehow ActiveXObject instantiation failed (perhaps some special
            // security settings or otherwse), fall back to per-path storage
            storage = doc.createElement('div')
            storageOwner = doc.body
        }

        function withIEStorage(storeFunction) {
            return function() {
                var args = Array.prototype.slice.call(arguments, 0)
                args.unshift(storage)
                // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                storageOwner.appendChild(storage)
                storage.addBehavior('#default#userData')
                storage.load(localStorageName)
                var result = storeFunction.apply(store, args)
                storageOwner.removeChild(storage)
                return result
            }
        }

        // In IE7, keys cannot start with a digit or contain certain chars.
        // See https://github.com/marcuswestin/store.js/issues/40
        // See https://github.com/marcuswestin/store.js/issues/83
        var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")

        function ieKeyFix(key) {
            return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
        }
        store.set = withIEStorage(function(storage, key, val) {
            key = ieKeyFix(key)
            if (val === undefined) {
                return store.remove(key)
            }
            storage.setAttribute(key, store.serialize(val))
            storage.save(localStorageName)
            return val
        })
        store.get = withIEStorage(function(storage, key) {
            key = ieKeyFix(key)
            return store.deserialize(storage.getAttribute(key))
        })
        store.remove = withIEStorage(function(storage, key) {
            key = ieKeyFix(key)
            storage.removeAttribute(key)
            storage.save(localStorageName)
        })
        store.clear = withIEStorage(function(storage) {
            var attributes = storage.XMLDocument.documentElement.attributes
            storage.load(localStorageName)
            for (var i = 0, attr; attr = attributes[i]; i++) {
                storage.removeAttribute(attr.name)
            }
            storage.save(localStorageName)
        })
        store.getAll = function(storage) {
            var ret = {}
            store.forEach(function(key, val) {
                ret[key] = val
            })
            return ret
        }
        store.forEach = withIEStorage(function(storage, callback) {
            var attributes = storage.XMLDocument.documentElement.attributes
            for (var i = 0, attr; attr = attributes[i]; ++i) {
                callback(attr.name, store.deserialize(storage.getAttribute(attr.name)))
            }
        })
    }

    try {
        var testKey = '__storejs__'
        store.set(testKey, testKey)
        if (store.get(testKey) != testKey) {
            store.disabled = true
        }
        store.remove(testKey)
    } catch (e) {
        store.disabled = true
    }
    store.enabled = !store.disabled

    if (typeof module != 'undefined' && module.exports && this.module !== module) {
        module.exports = store
    } else if (typeof define === 'function' && define.amd) {
        define('util.store', store)
    } else {
        win.store = store
    }

})(Function('return this')());
;/**
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