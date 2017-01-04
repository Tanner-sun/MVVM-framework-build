;(function(global, factory)
{
	window.JSpringMin = factory();
}(window, function(paramArr){
		'use strict';

		var _ = require('lodash')
		var observer = require('./observer.js');
		var compiler = require('./compiler.js');

		var JSpringMin = function(paramArr){
			
			if(!(this instanceof JSpringMin) ){
				// 真正希望执行的是new操作
				return new JSpringMin(paramArr);
			};

			var vm = this;
			vm.$scope = {};
			//针对每个key维系一个watcher数组。用watchers来存放这些数组。
			vm.watchers = {};

			if (paramArr.length !== 3) {
				throw 'expect paramArr has three elements';
			} else {
				//observer数据
				vm.data =  paramArr[2]();
				observer(vm, vm.data);
			}
			

			//解析模板
			var el =  paramArr[0];
			compiler(vm, el);

			//执行controller
			typeof paramArr == "function" && paramArr[1](vm.$scope);
		}


		return JSpringMin;
	}
))




