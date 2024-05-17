# React 理念

## 问题与解决思路

React 官网中，”React 哲学“ 这一节提到，React 的理念是：我们认为，React 是用 JavaScript 构建 `快速响应` 的大型 Web 应用程序的首选方式

其中有两类场景会制约 `快速响应`：

1. 当执行大量的操作或者设备性能不足时，页面掉帧，导致卡顿 —— CPU 瓶颈

2. 进行 I/O 操作后，需要等待数据返回才能继续操作，等待的过程导致不能快速响应 —— I/O 瓶颈

关于 `为什么执行一段复杂的 JS 代码会使页面卡顿`，推荐文章

[精读 - 浏览器渲染原理](https://juejin.cn/post/6844904175067725838)

[史上最详细的经典面试题 从输入URL到看到页面发生了什么？](https://juejin.cn/post/6844903832435032072)

## 底层框架的演进

React 从 v15 升级到 v16 后重构了整个架构，v16 及以上版本一直沿用新架构，重构原因在于：`旧架构无法实现 Time Slice`

### 新旧架构介绍

React15 架构分为两部分：

- Reconciler（协调器）—— VDOM 的实现，负责根据自变量变化计算出 UI 变化
- Renderer（渲染器）—— 负责讲 UI 变化渲染到宿主环境中

在 Reconciler 中，mount 的组件会调用 mountComponent，update 的组件会调用 updateComponent，这两个方法都会递归更新子组件，更新流程一旦开始，中途无法中断，基于这个原因，React16 重构了架构。

React16 架构分为三部分：

- Scheduler（调度器）—— 调度任务的优先级，高优先级任务优先进入 Reconciler
- Reconciler（协调器）—— VDOM 的实现，负责根据自变量变化计算出 UI 变化
- Renderer（渲染器）—— 负责讲 UI 变化渲染到宿主环境中

在新架构中，Reconciler 中的更新流程从递归变成了 `可中断的循环过程`。每次循环都会调用 shouldYield 判断当前 Time Slice 是否有剩余时间，没有剩余时间则暂停更新流程，将主线程交给渲染流水线，等待下一个宏任务在继续执行

### 主打特新的迭代

React 大体经历了四个发展时期

1. Sync（同步）
2. Async Mode（异步模式）
3. Concurrent Mode（并发模式）
4. Concurrent Feature（并发特性）

### 渐进升级策略的迭代

从最初的版本到 v18 版本，React 有多少个版本？从架构角度进行概括，所有 React 版本一定属于如下四种情况之一

情况 1： 旧架构（v15 及之前版本属于这种情况）  
情况 2： 新架构，未开启并发更新，与情况1行为一致，（v16、v17 默认属于这种情况）  
情况 3： 新架构，为开启并发更新，但是启用了一些新功能（比如 Automatic Batching）  
情况 4： 新架构，已开启并发更新  

React 团队希望，使用旧版本的开发者可以逐步升级到新版本，及从情况 1、2、3 向情况 4 升级，强制升级可能造成代码不兼容，为了实现旧版本的平滑过渡，React 团队采用了 `渐进升级` 方案

一. 规范代码，v16.3 新增了 StrictMode，针对不符合并发更新规范的代码给出提示  

二. 运行 `不同情况的 React`在同一个页面共存，并提供三种开发模式
1. Legacy 模式 —— ReactDOM.render(\<App /\>, rootNode)，默认关闭 StrictMode，表现情况 2
2. Blocking 模式 —— ReactDOM.createBlocking(rootNode).render(\<App /\>)，作为从 Legacy 向 Concurrent 过渡的中间模式，默认开启 StrictMode，表现情况 3
3. Concurrent 模式 —— ReactDOM.createRoot(rootNode).render(\<App /\>)，默认开启 StrictMode，表现情况 

## Fiber 架构

React 中节点类型的区分：

- ReactElement（React 元素），即 createElement 方法的返回值
- ReactComponent（React 组件），开发者可以在 React 中定义函数、类两种类型的 Component
- FiberNode，组成 Fiber 架构的节点类型

三者关系如下

```jsx
// App 是 React Component
const App = () => {
  return <h3>Hello World</h3>
}

// ele 是 React Element
const ele = <App />

// 在 React 运行时内部，包含 App 对应 FiberNode
ReactDOM.createRoot(rootNode).render(ele)
```

### FiberNode 的含义

1. 作为 `架构`，v15 的 Reconciler 采用递归的方式执行，被称为 Stack Reconciler。v16 及以后得版本 Reconciler 基于 FiberNode 实现，被称为 Fiber Reconciler
2. 作为 `静态的数据结构`，每个 FiberNode 对应一个 React 元素，用于保存 React 元素的类型，对应的 DOM 元素等信息
3. 作为 `动态的工作单元`，每个 FiberNode 用于保存 “本次更新中该 React 元素变化的数据、要执行的工作（增、删、改、更新 Ref、副作用等）”

[Fiber 对象描述](https://7kms.github.io/react-illustration-series/main/object-structure#fiber-%E5%AF%B9%E8%B1%A1)

其中 “指向父 FiberNode” 的字段叫做 return 而不是 parent 或者 father，因为作为一个工作单元，return 指 “FiberNode 执行完 completeWork 后返回下一个 FiberNode”，子 FiberNode 及其兄弟 FiberNode 执行完 completeWork 后会返回父 FiberNode，所以 return 用来指代父 FiberNode 

### 双缓存机制

当我们用 canvas 绘制动画，每一帧绘制前都会调用ctx.clearRect清除上一帧的画面。

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题，我们可以在内存中绘制当前帧动画，绘制完毕后直接用当前帧替换上一帧画面，由于省去了两帧替换间的计算时间，不会出现从白屏到出现画面的闪烁情况。

这种在内存中构建并直接替换的技术叫做[双缓存](https://baike.baidu.com/item/%E5%8F%8C%E7%BC%93%E5%86%B2)。

React 使用“双缓存”来完成 Fiber 树的构建与替换——对应着 DOM 树的创建与更新。

Fiber 架构中同时存在两棵 Fiber Tree，一颗是 `真实 UI 对应的 Fiber Tree`，一颗是 `正在内存中构建的 Fiber Tree`。

参考：  
[什么是双缓存](https://react.iamkasong.com/process/doubleBuffer.html#%E4%BB%80%E4%B9%88%E6%98%AF-%E5%8F%8C%E7%BC%93%E5%AD%98)


