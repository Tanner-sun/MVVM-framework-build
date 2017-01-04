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
					vm.watchers[key].push(vm.nowWatcher);
				}
				console.log(1);
				return data[key];
			},
			set:function(value){
				if (data[key] != value){
					data[key] = value;
					/* 仍需处理新值是对象的情形*/
					_.forEach(vm.watchers[key], function(watcher){
						watcher.$update()
					})
				}
			}
		};
	});
	Object.defineProperties(vm.$scope, _source)	
};

module.exports = observer;

