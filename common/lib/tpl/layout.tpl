@ /**
@  * @author wangzilong 2014/05/24
@  */
<html>
	<head>
		<title>${title}</title>		
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		@/*此处使用的是编译生成的通用css*/
		<link rel="stylesheet" type="text/css" href="/assets/common/build/common.css">
		<link rel="stylesheet" type="text/css" href="/assets/app/widget/nav/nav.css">
		<link rel="stylesheet" type="text/css" href="/assets/app/widget/footer/footer.css">
		@/*此处使用的是编译生成的通用js，包含jquery，mod，underscore，widget等*/
		<script type="text/javascript" src="/assets/common/build/common.js"></script>
		${head_addtion}
	</head>
	<body>
		<div id="hd">
			@ include('../widget/nav/nav.tpl', {nav: nav}){}
		</div>
		<div id="bd">
			${body_content}
		</div>
		<div id="ft">
			@ include('../widget/footer/footer.tpl'){}
		</div>
		<div class="question-layer-right"><a href="http://tousu.baidu.com/baifubao/add#2" target="_blank"></a></div>
		${foot_addtion}
	</body>
</html>