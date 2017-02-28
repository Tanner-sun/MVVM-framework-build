/*
*Directives的作用
*1）处理所有的指令。text、html
*2）处理事件处理程序。
*/

var Directives = {
	text: function(node, newValue, oldValue){
		node.textContent = newValue;
	},
	html: function(node, newValue, oldValue){
		node.innerHTML = newValue;
	},
	show: function(node, newValue){
		node.style.display = newValue ? '' : 'none';
		if (newValue && getComputedStyle(node, '').getPropertyValue('display') === 'none') {
			node.style.display = 'block';
		}
	},
	hide: function(node, newValue){
		node.style.display = newValue ? 'none' : '';
		if (!newValue && getComputedStyle(node, '').getPropertyValue('display') === 'none') {
			node.style.display = 'block';
		}
	},
	model: function(node, newValue, oldValue, vm){
		node.value = newValue;
		node.addEventListener('keyup', function(){
			if (node.value != newValue) {
				//重新触发$scope绑定的key的setter
				vm.nowWatcher.$setValue(vm, node.value)
				newValue = node.value;
			}
		}, false)
	},
	on: function(node, event, olevent, vm, exp) {

		var type = /(\w+)\:.*/.exec(exp)[1];
		node.addEventListener(type, 
			function (e) {
				event.call(this, vm.$scope)
			}
		, false)
	}

};
module.exports = Directives;