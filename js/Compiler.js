/*
*compiler的作用：
*1）识别出DOM节点上有指令的node元素节点，并将这些节点过滤出来。
*2）对1）过滤出来的每个node节点的attributes属性进行遍历，过滤出含有m-开头的属性。
*3）对每个符合2）要求的属性，创建一个watcher，并将该属性对应的指令名称、表达式值、node节点传递给watcher
*
*
*/
var Watcher = require('./Watcher.js');
var Observer = require('./Observer.js');
var _ = require('lodash');

var Compiler = function(vm, el){
	this.vm = vm;
	this.parse(vm, el);
};

Compiler.prototype.parse = function(vm, el){

	var template = document.getElementById(el);
	//遍历出含有指令的node节点
	var nodeMatched = [];
	nodeMatched = this.traverseNodes(template, nodeMatched);
	//在每个node节点中，解析出m-开头的属性，并为每个属性增加watcher
	this.filterAttributes(vm, nodeMatched);

};

Compiler.prototype.traverseNodes = function(template, nodeMatched){
	
	var self = this;
	if (template.nodeType == 1) {
		var attrArr = template.attributes;
		_.each(attrArr, function(attr){
			if (self.isMatchedAttr(attr)){
				template.isFor = self.isMatchedFor(attr) ? true : false;
				nodeMatched.push(template);
			}
		})		
	}

	if (template.hasChildNodes())
		{	
			var node = template.childNodes;
			for(var i = 0,len = node.length; i<len; i++){
				childNode = template.childNodes[i];
				this.traverseNodes(childNode, nodeMatched);
			}
		}
	return nodeMatched;	
};

Compiler.prototype.isMatchedAttr = function(attr){
	return attr.nodeName.indexOf('m-') >= 0 ? true : false;
};
Compiler.prototype.isMatchedFor = function(attr){
	return /for/g.test(attr.nodeName);
};

Compiler.prototype.filterAttributes = function(vm, nodeArr) {
	var self = this;
	
	_.each(nodeArr, function(node){
		var nodeAttr = node.attributes;
		_.each(nodeAttr,function(attr){
			if (self.isMatchedAttr(attr)) {
				self._compileM(vm, node, attr);
			}
		})
	})
};

Compiler.prototype._compileM = function(vm, node, attr) {
	var type, expression;
	var self = this;
	type = attr.nodeName.substring(2);
	expression = attr.value;
	if (type == 'for') {
		self._compileFor(vm, node, attr, expression)
	} else {
		return new Watcher(vm, node, expression, type) 
	}
};
Compiler.prototype._compileFor = function(vm, node, attr, expression) {

	var alias = /\s*(\w+)\s+in\s+(\w+)\s*/.exec(expression)[1];
	var items = /\s*(\w+)\s+in\s+(\w+)\s*/.exec(expression)[2];
	var self = this;
	var parentNode = node.parentNode;
	parentNode.removeChild(node);

	// observer(vm, key, value)
	var items = vm.data[items];
	for (var i = 0, len = items.length; i < len; i++) {
		var item = items[i];
		var data = {};
		data[alias] = item;
		Observer(vm, data);
		var newNode = self._create(vm, node)
		parentNode.appendChild(newNode);
	}
	
};
Compiler.prototype._create = function(vm, node, attr, expression) {
	var backNode = node.cloneNode(true);
	var childs = backNode.childNodes;
	if (childs.length > 0) {
		this.filterAttributes(vm, childs);
	}
	return backNode;
}	

function complier (vm, el) {
	return new Compiler(vm, el);
}

module.exports = complier;