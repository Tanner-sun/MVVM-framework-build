/*
*watcher的作用
*1）初始化阶段：接收compiler传递过来的expr、指令名称、node节点。
*2）初始化阶段：求出expr对应表达式的值，并触发observe的getter函数，最终将该watcher添加到该key维系的watchers集合中。
*3）初始化阶段：调用Directive，将DOM的内容填充为实际数据值。
*4）更新阶段：更新自身watcher，重新求值，并调用Directive刷新DOM内容。
*/

var Directives = require('./Directives.js');



var Watcher = function(vm, node, exp, type){
	
	this.exp = exp;
	vm.nowWatcher = this;

	this.value = this.$getValue(vm);
	this.type = type;
	this.node = node;

	//求值 从而触发get 进而将当前watcher加入改实例vm的watchers中

	//利用不同指令处理不同的m-，fillNodeData
	// this.$addDirectives();
	this.$fillNodeData();
};
Watcher.prototype.$update = function(vm){
	var newValue = this.$getValue(vm);
	var oldValue = this.value;
	Directives[this.type].call(this, this.node, newValue, oldValue);
};
Watcher.prototype.$getValue = function(vm){
	//处理表达式的情形
	//当前仅处理a.aa.aaa;data = {a:{aa:{aaa:1}}}
	var exps = this.exp.split('.');
	var val;
	//exps = [a, aa, aaa];
	//需引入表达式处理函数
	exps.forEach(function(key){
		val = vm.$scope[key]
	})
	return val;
}
Watcher.prototype.$fillNodeData = function(){
	//处理表达式的情形
	//当前仅处理a.aa.aaa;data = {a:{aa:{aaa:1}}}
	var newValue = this.value;
	Directives[this.type].call(this, this.node, newValue);
}
module.exports = Watcher;