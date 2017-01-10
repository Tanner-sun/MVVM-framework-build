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
	}
};
module.exports = Directives;