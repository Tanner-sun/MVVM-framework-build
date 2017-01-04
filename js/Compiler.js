var Watcher = require('./Watcher.js');
var _ = require('lodash');

var Compiler = function(vm, el){

	//识别出指令
	this.parse(vm, el);
};

Compiler.prototype.parse = function(vm, el){
	var self = this;

	var template = document.getElementById(el);
	//遍历出含有指令的node节点
	var nodeArr = [];
	nodeArr = self.traverse(template);
	//在每个node节点中，解析出m-开头的属性，并为每个属性增加watcher
	nodeArr.forEach(function(node){
		var nodeAttr = self.isMatched(node.attributes);
		nodeAttr.forEach(function(attr){
			//对每个m-属性进行attachwatcher
			// new Watcher();
			var type = attr.nodeName.substring(2);
			var expression = attr.value;
			return new Watcher(vm, node, expression, type);
		})
	})
};

Compiler.prototype.traverse = function(template){
	
	var self = this;
	var attrArr = template.attributes;
	_.each(attrArr, function(attr){
		if (self.isMatched(attr)){
			nodeArr.push(template);
		}
	})	

	while (template.childNodes.length != 0)
		{
			var node = template.childNodes[i];
			this.traverse(node);
		}
	return nodeArr;	
};

Compiler.prototype.isMatched = function(attr){
	keys.forEach(function(i){
		if(attr[i].nodeName.indexOf('m-') >= 0){
			attrArr.push(attr[i])
		}
	})
	return attrArr;
};

function complier (vm, el) {
	return new Compiler(vm, el);
}

module.exports = complier;