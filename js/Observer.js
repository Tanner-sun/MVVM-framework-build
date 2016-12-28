var observer = function(target,data){
	var keys = Object.keys(data);
	var _source = {};


	keys.forEach(function(key){
		_source[key] = {
			configurable:true,
			enumerable:false,
			get:function(){
				//注册watcher?
				if (!target.watchers[key]) {
					target.watchers[key]=[];
					target.watchers[key].push(target.nowWatcher);
				} else {
					target.watchers[key].push(target.nowWatcher);
				}
				return data[key];
			},
			set:function(value){
				if(data[key] != value){
					data[key] = value;
					// target.watchers[key].$updateWatcher(key,value);
				}
			}
		}
	})
	Object.defineProperties(target.$scope, _source)	
};

module.exports = observer;

