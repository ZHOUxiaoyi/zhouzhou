var _mod_dir = "common";


fis.config.set('project.md5Connector ', '.');

//css sprite各小图间隔
fis.config.set('settings.spriter.csssprites.margin', 20);

//css 压缩png8
fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');

fis.config.set('roadmap.path',  [
	{
		//不需要输出
		reg : /.*\.sh$/i,
		//编译的时候不要产出了
		release : false
	},
	{
		//不需要输出
		reg : /.*\.md$/i,
		//编译的时候不要产出了
		release : false
	},
	{
		//不需要输出
		reg : /.*\.db$/i,
		//编译的时候不要产出了
		release : false
	},
	{
		//不需要输出
		reg : /^\/guide\/.*/i,
		//编译的时候不要产出了
        useHash : false,
		release : '/assets/'+_mod_dir+'$&',
        useSprite: true
	},
	{
		//不需要输出
		reg : /^\/conf\//i,
		//编译的时候不要产出了
		release : false
	},
	{
		//不需要输出
		reg : /^\/build\.js/i,
		//编译的时候不要产出了
		release : false
	},
	{
		//不需要输出
		reg : /^\/tool\//i,
		//编译的时候不要产出了
		release : false
	},
	{
		//输出到指定目录
		reg : /^\/lib\/.*/i,
		//编译的时候不要产出了
		release : '/assets/'+_mod_dir+'$&',
        useSprite: true
	},
	{
		//输出到指定目录
		reg : /^\/build\/.*/i,
		release : '/assets/'+_mod_dir+'$&'
	},
	{
		//输出到指定目录
		reg : /^\/widget\/.*\.tpl/i,
		release : '/template/'+_mod_dir+'$&',
        useSprite: true
	},
	{
		//输出到指定目录
		reg : /^\/widget\/.*/i,
		release : '/assets/'+_mod_dir+'$&',
        useSprite: true
	}
]);