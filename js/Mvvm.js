;(function(paramObj){

	var MVVM = function(paramObj){
		var self = this;
		if(!(self instanceof MVVM) ){
			return new MVVM(paramObj);
		};

		this.vm = self;

		//observer数据
		var data =  paramObj[data];
		observer(this.vm,data);

		//解析模板
		var template =  paramObj[template];
		compiler(this.vm,template);
	}

	MVVM.prototype. 


	return MVVM;
})(paramObj);




