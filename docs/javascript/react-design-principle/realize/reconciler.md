<script setup>
import ImgReconciler1 from './images/reconciler-1.png'
import ImgReconciler2 from './images/reconciler-2.png'
import ImgReconciler3 from './images/reconciler-3.png'
import ImgReconciler4 from './images/reconciler-4.png'
import ImgReconciler5 from './images/reconciler-5.png'
</script>

# 实现 Reconciler 架构

reconciler 是 React 核心逻辑所在的模块，中文名叫协调器。协调（reconcile）就是 diff 算法的意思。是 react 得以运行的核心包(综合协调 react-dom, react, scheduler 各包之间的调用与配合)，管理 react 应用状态的输入和结果的输出，将输入信号最终转换成输出信号传递给渲染器。

## reconciler有什么用

jQuery 工作原理（过程驱动）：

<Image :src="ImgReconciler1" />

前端框架结构与工作原理（状态驱动）：

<Image :src="ImgReconciler2" />

有上述两种工作原理的对比，能得知，框架的原理是通过运行时核心模块，通过输入的内容去调用宿主环境的 API

而以 react 框架为例流程则是：

1. 消费 JSX
2. 没有编译优化
3. 开放通用 API 供不同环境使用 

## 消费JSX

### 选择核心模块操作的数据结构

由前面实现的 JSX 方法可知，JSX 方法的返回结果是一个 ReactElement 元素，但是它作为核心模块操作的数据结构存在一些问题：

- 无法表达节点之间的关系（ReactElement - ReactElement）
- 字段有限，不好拓展（比如：无法表达状态）

所以，需要一种新的数据结构，他的特点：

- 介于 ReactElement 与真实 UI 节点之间
- 能够表达节点之间的关系
- 方便拓展（不仅作为数据存储单元，也能作为工作单元）

这就是 FiberNode（虚拟 DOM 在 React 中的实现）

<Image :src="ImgReconciler3" />

## reconciler的工作方式 

对于同一个节点，通过节点的 FiberNode 跟接点对应的 ReactElement 进行比较，并根据比较的结果生成不同标记（插入、删除、移动...），对应不同宿主环境API的执行，然后递归处理子节点

<Image :src="ImgReconciler4" />

比如，挂载\<div\>\</div\>：

```jsx
// React Element <div></div>
jsx("div")
// 对应fiberNode
null
// 生成子fiberNode
// 对应标记
Placement
```

将\<div\>\</div\>更新为\<p\>\</p\>：

```jsx
// React Element <p></p>
jsx("p")
// 对应fiberNode
FiberNode {type: 'div'}
// 生成子fiberNode
// 对应标记
Deletion Placement
```

当所有 ReactElement 比较完后，会生成一棵 fiberNode 树，一共会存在两棵fiberNode树：

- current：与视图中真实UI对应的 fiberNode 树
- workInProgress：触发更新后，正在 reconciler 中计算的 fiberNode 树

[双缓冲技术介绍](https://blog.csdn.net/wwwlyj123321/article/details/126447825)

## JSX消费的顺序

[DFS 深度优先遍历与 BFS 广度优先遍历详解](https://houbb.github.io/2020/01/23/data-struct-learn-08-dfs-bfs)

以 DFS（深度优先遍历）的顺序遍历 ReactElement，这意味着：

- 如果有子节点，遍历子节点
- 如果没有子节点，遍历兄弟节点 

例子：

```html
<Card>
    <h3>你好</h3>
    <p>Tiny-React</p>
</Card>
```

这是个递归的过程，存在递、归两个阶段：

- 递：对应 beginWork
- 归：对应 completeWork

<Image :src="ImgReconciler5" />


