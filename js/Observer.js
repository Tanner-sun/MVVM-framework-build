var observer = function(target,data){
	var keys = Object.prototype.keys(data);



	keys.forEach(function(key){
		Object.prototype.defineProperty(data,key,{
			configurable:true,
			enumerable:false,
			get:function(){
				//注册watcher?
				(target.watchers[key] || target.watchers[key]=[]).push(target.nowWatcher);
				return data(key);
			},
			set:function(value){
				if(data[key] != value){
					data[key] = value;
					target.watchers[key].$updateWatcher(key,value);
				}
			}
		})
	})
};

