//扩展所有指令的处理方法

var Directives = {
	text: function(node, newValue, oldValue){
		node.textContent = newValue;
	},
	html: function(node, newValue, oldValue){
		node.innerHTML = newValue;
	}
};
module.exports = Directives;