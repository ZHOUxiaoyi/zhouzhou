var fs = require('fs'),
	path = require('path');

var addBom = function(file_path) {
	var content = fs.readFileSync(file_path, 'utf-8');
	
	var ret = fs.writeFileSync(file_path, "\ufeff"+content, 'utf-8');
	if (ret)
		throw(ret);
}
var exclude = ['.svn'];
var _search_dir = function(dir_path) {
	var list = fs.readdirSync(dir_path), stat = null, sub = null;
	for (var i = list.length - 1; i >= 0; i--) {
		if (exclude.indexOf(list[i]) > -1)
			continue;
		sub = dir_path + path.sep + list[i];
		stat = fs.statSync(sub);
		if (stat.isDirectory()) {
			_search_dir(sub);
		} else if (stat.isFile()) {
			addBom(sub);
		}
	};
}

_search_dir(__dirname + '/build');

