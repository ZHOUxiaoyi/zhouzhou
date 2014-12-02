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