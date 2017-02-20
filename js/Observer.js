/*
*observer的作用
*1）递归监听data所有的key
*2）getter：将当前的watcher加入watchers。后续需添加限制条件
*3）setter：将通过$scope赋予的新值与data中旧值对比，若不同，触发2）中维系的watchers中所有watcher的更新
*/

var observer = function(vm, data){

	var keys = Object.keys(data);
	var _source = {};

	keys.forEach(function(key){

		if (_.isObject(data[key])) 
			return observer(vm, data[key]);
		_source[key] = {
			configurable:true,
			enumerable:false,
			get:function(){
				//注册watcher?s
				if (!vm.watchers[key]) {
					vm.watchers[key]=[];
					vm.watchers[key].push(vm.nowWatcher);
				} else {
					if (!vm.initialFlag) {
						debugger;
						vm.watchers[key].push(vm.nowWatcher);
					}
				}
				console.log(1);
				return data[key];
			},
			set:function(value){
				if (data[key] != value){
					data[key] = value;
					/* 仍需处理新值是对象的情形*/
					_.forEach(vm.watchers[key], function(watcher){
						watcher.$update(vm)
					})
				}
			}
		};
	});
	Object.defineProperties(vm.$scope, _source)	
};


module.exports = observer;

