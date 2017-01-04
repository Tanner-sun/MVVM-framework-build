//watcher负责什么？
//求出m-指令对应表达式的值
//拥有初始化节点内容的函数
//拥有更新节点内容的函数

var Directives = require('./Directives.js');



var Watcher = function(vm, node, exp, type){
	
	this.exp = exp;
	this.value = this.$getValue();
	this.type = type;

	vm.nowWatcher = this;
	//求值 从而触发get 进而将当前watcher加入改实例vm的watchers中

	//利用不同指令处理不同的m-，fillNodeData
	// this.$addDirectives();
	this.$fillNodeData();
};
Watcher.prototype.$update = function(){
	var newValue = this.$getValue();
	var oldValue = this.value;
	Directives[this.type].call(vm, newValue, oldValue);
};
Watcher.prototype.$getValue = function(){
	//处理表达式的情形
	//当前仅处理a.aa.aaa;data = {a:{aa:{aaa:1}}}
	var exps = this.exp.split('.');
	var val;
	//exps = [a, aa, aaa];
	exps.forEach(function(key){
		val = vm.$scope[key]
	})
	return val;
}
Watcher.prototype.$fillNodeData = function(){
	//处理表达式的情形
	//当前仅处理a.aa.aaa;data = {a:{aa:{aaa:1}}}
	var newValue = this.$getValue();
	Directives[this.type].call(vm, newValue, oldValue);
}
module.exports = Watcher;