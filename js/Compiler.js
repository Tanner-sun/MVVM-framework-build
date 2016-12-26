var Compiler = function(vm,template){

	//识别出指令
	this.parse(vm,template);
};

Compiler.prototype.parse = function(vm,template){
	var self = this;

	var nodeList = document.getElementById(template);
	//遍历出含有指令的node节点
	var nodeArr = self.traverse(nodeList);
	//在每个node节点中，解析出m-开头的属性，并为每个属性增加watcher
	nodeArr.forEach(function(node){
		var nodeAttr = self.firstLizeFor(node.attributes);
		nodeAttr.forEach(function(attr){
			//对每个m-属性进行attachwatcher
			// new Watcher();
			var type = attr.nodeName.substring(2);
			var expression = attr.value;
			return new Watcher(vm,node,expression,attr);
		})
	})
};

Compiler.prototype.traverse = function(nodeList){
	var arr
	if(nodeList.childNodes){
		for(var i<0,len = nodeList.childNodes.length;i<len;i++){
			var node = nodeList.childNodes.item(i);
			traverse(node)
		}
	}else{
		var attr = node.attributes;
		var keys = Object.keys(attr);
		keys.forEach(function(i){ 
			if(attr[i].nodeName.indexOf('m-')>=0){
				(!!window.arr || arr = []).push(node);
			} 
		})
	}
	return arr;	
};

Compiler.prototype.firstLizeFor = function(attr){
	var attrArr = [];
	var keys = Object.keys(attr)
	keys.forEach(function(i){
		if(attr[i].nodeName.indexOf('m-') >= 0){
			attrArr.push(attr[i])
		}
	})
	return attrArr;
};
