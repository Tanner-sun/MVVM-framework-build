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
	// m-for的实现
	// 首先第一步，在遍历template识别指令并New时，跳过for的子节点
	// 进入for的update，进入diff，第一次声明时识别for子节点的表达式，识别出指令并new，其对应的值为当前item in items对应item
	// 的值。并observe这个值。依次遍历for对应的数组。
	// 局部更新：进入diff，没有变化的值打下标签。变化的不打标签，从而实现局部更新。
	// 废弃节点更新
	for: function(){

	}

};
module.exports = Directives;