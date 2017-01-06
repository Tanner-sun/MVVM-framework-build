## MVVM-framework-build
> 这是一个基于vue和JSpring的MVVM框架

### 1. 特点
> 1) 类似angular的使用方式
> 2) 类似vue的代码设计

### 2. 主要核心架构


> **observer.js**

> 1）递归监听data所有的key

> 2）getter：将当前的watcher加入watchers。后续需添加限制条件

> 3）setter：将通过$scope赋予的新值与data中旧值对比，若不同，触发2）中维系的watchers中所有watcher的更新

> **compiler.js**

> 1）识别出DOM节点上有指令的node元素节点，并将这些节点过滤出来。

> 2）对1）过滤出来的每个node节点的attributes属性进行遍历，过滤出含有m-开头的属性。

> 3）对每个符合2）要求的属性，创建一个watcher，并将该属性对应的指令名称、表达式值、node节点传递给watcher

> **watcher.js**

> 1）初始化阶段：接收compiler传递过来的expr、指令名称、node节点。

> 2）初始化阶段：求出expr对应表达式的值，并触发observe的getter函数，最终将该watcher添加到该key维系的watchers集合中。

> 3）初始化阶段：调用Directive，将DOM的内容填充为实际数据值。

> 4）更新阶段：更新自身watcher，重新求值，并调用Directive刷新DOM内容。

> **MVVM.js**

> 1) 入口文件
> 2) 初始化JSpringMin函数，并赋给全局变量
> 3) 按照observe —— compiler —— watcher 执行函数

> **Directives**

> 1）处理所有的指令。

> 2）处理事件处理程序。