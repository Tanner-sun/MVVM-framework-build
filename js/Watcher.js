var Watcher = function(vm,node,expression,attr){
	vm.watchers =  [];
	vm.nowWatcher = this;
	//求值 从而触发get 进而将当前watcher加入改实例vm的watchers中

	//利用不同指令处理不同的m-，fillNodeData
	// this.$addDirectives();
};
Watcher.prototype.$updateWatcher = function(){

};
Watcher.prototype.$attachWatcher = function(){
	
};
Watcher.prototype.$addDirectives = function(){
	return new Directives()
};

module.exports = Watcher;