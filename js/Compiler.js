/*
*compiler的作用：
*1）识别出DOM节点上有指令的node元素节点，并将这些节点过滤出来。
*2）对1）过滤出来的每个node节点的attributes属性进行遍历，过滤出含有m-开头的属性。
*3）对每个符合2）要求的属性，创建一个watcher，并将该属性对应的指令名称、表达式值、node节点传递给watcher
*
*
*	  m-for的实现
*	 首先第一步，在遍历template识别指令并New时，跳过for的子节点
*	 进入for的update，进入diff，第一次声明时识别for子节点的表达式，识别出指令并new，其对应的值为当前item in items对应item
*	 的值。并observe这个值。依次遍历for对应的数组。
*	 局部更新：进入diff，没有变化的值打下标签。变化的不打标签，从而实现局部更新。
*	 废弃节点更新
*/
var Watcher = require('./Watcher.js');
var Observer = require('./Observer.js');
var _ = require('lodash');

var Compiler = function(vm, el){
	this.vm = vm;
	this.template = document.getElementById(el);
	this.frag = document.createDocumentFragment();
	this.parse(vm, el);
};

Compiler.prototype.parse = function(vm, el){

	//遍历出含有指令的node节点
	var nodeMatched = [];
	nodeMatched = this.traverseNodes(this.template, nodeMatched);
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
		if (node) {
			var nodeAttr = node.attributes;
			_.each(nodeAttr,function(attr){
				if (self.isMatchedAttr(attr)) {
					self._compileM(vm, node, attr);
					}
				}
			)
		}
		
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
Compiler.prototype._compileForBefore = function(vm, node, attr, expression) {
	var forFlag = document.createDocumentFragment()
};
Compiler.prototype._compileFor = function(vm, node, attr, expression) {

	var alias = /\s*(\w+)\s+in\s+(\w+)\s*/.exec(expression)[1];
	var items = /\s*(\w+)\s+in\s+(\S+)\s*/.exec(expression)[2];
	var self = this;
	var parentNode = node.parentNode;
	var nextSibling = node.nextSibling;
	parentNode.removeChild(node);

	if (/.*\.(\w+)/.exec(items)) {
		items1 = /(\w+)\.(\w+)/.exec(items)[1];
		items2 = /(\w+)\.(\w+)/.exec(items)[2];
		items = vm.$scope[items1];
		node.removeAttribute('m-for');
		for (var i = 0, len = items[items2].length; i < len; i++) {
			var item = items[items2][i];
			var data = {};
			data[alias] = item;
			Observer(vm, data);
			var newNode = self._create(vm, node);
			parentNode.appendChild(newNode);
		}
	} else {
		items = vm.$scope[items];
		node.removeAttribute('m-for');
		for (var i = 0, len = items.length; i < len; i++) {
			var item = items[i];
			var data = {};
			data[alias] = item;
			Observer(vm, data);
			var newNode = self._create(vm, node);
			if (nextSibling) {
				parentNode.insertBefore(newNode,nextSibling)
			} else {
				parentNode.appendChild(newNode);
			}
		}
	}
	// observer(vm, key, value)
	
	
};
Compiler.prototype._create = function(vm, node, attr, expression) {
	var backNode = node.cloneNode(true);
	var childs = backNode.childNodes;
	if (childs.length > 0) {
		this.filterAttributes(vm, childs);
	}
	return backNode;
}
//从
function getObjValue (obj, key) {
	if (obj.hasOwnProperty(key)) {
		_.each(Object.keys(obj), function(){

		})
	}
}	

function complier (vm, el) {
	return new Compiler(vm, el);
}

module.exports = complier;