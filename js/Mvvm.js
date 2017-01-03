;(function(paramArr){
	'use strict';

	var _ = require('lodash')
	var observer = require(./observer.js);
	var compiler = require(./compiler.js);

	var JSpringMin = function(paramArr){
		if(!(self instanceof MVVM) ){
			return new MVVM(paramObj);
		};
		var vm = this;
		vm.$scope = {};

		if (paramArr.length !== 2) {
			throw 'expect paramArr has three elements';
		} else {
			//observer数据
			vm.data =  paramArr[2]();
			observer(vm, vm.data);
		}
		

		//解析模板
		var el =  paramObj[0];
		compiler(vm, el);
	}


	return JSpringMin;
})(paramArr);




