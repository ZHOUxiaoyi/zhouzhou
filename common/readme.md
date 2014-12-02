## common说明 ##

**common目录结构如下：**

    + lib				/* 代码
	    + html				/* html代码
	    + css
	    + js
		    + interface		/* 常用组件的接口
		    + base
		    + util
		    + ui
	    + plugin			/* 非直接相关的组件，比如跨域代码，passport等
	+ widget				/* html+css+js+image组成的模块
    + build					/* 根据订制生成的打包文件，如js组件的打包以及css的打包
	    + css
	    + js
	    build.js
    + conf					/* 配置文件，包含fis配置，本地开发所需要的配置等
    + guide					/* 组件使用文档，后续使用gitbook生成
    + tool					/* 开发工具
    - build.sh				/* icafe模块编译所需要的sh文件
    - readme.md				/* 说明文档




**编译之后的结构**

	静态部分：
	+ static
		+ assets
		+ build

	模板部分：
	+ widget