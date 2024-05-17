<script setup>
import ImgUpdate1 from './images/update-1.png'
import ImgUpdate2 from './images/update-2.png'
import ImgUpdate3 from './images/update-3.png'
import ImgUpdate4 from './images/update-4.png'
import ImgUpdate5 from './images/update-5.png'
import ImgCommit1 from './images/commit-1.png'
</script>

# 状态更新机制

在 React 中，常见的触发更新的方式有：

- ReactDOM.createRoot().render（或老版的 ReactDOM.render ）
- this.setState
- useState的dispatch 方法

我们希望实现一套统一的更新机制（将上述更新方式接入同一套机制中），他的特点是：

- 兼容上述触发更新的方式
- 方便后续扩展（优先级机制...）

## 实现状态更新机制

### 更新机制的组成部分

- 代表更新的数据结构 —— Update
- 消费 update 的数据结构 —— UpdateQueue

他们的关系如下图：

<Image :src="ImgUpdate1" />

## 接入状态更新机制

更新分为 mount 和 update 两种，需要实现 ReactDOM.createRoot().render 第一次 mount 时调用的 API，并将 API 接入上述更新机制中

需要考虑的事情：

- 更新可能发生于任意组件，而更新流程是从根节点递归的
- 需要一个统一的根节点保存通用信息

<Image :src="ImgUpdate2" />

<Image :src="ImgUpdate3" />

## 初探mount流程

更新流程的目的：

- 生成 wip fiberNode 树
- 标记副作用 flags

更新流程的步骤：

- 递：beginWork
- 归：completeWork

### beginWork

对于如下结构的reactElement：

```html
<A>
 <B/>
</A>
```

当进入A的 beginWork 时，通过对比 B current fiberNode 与 B reactElement，生成 B 对应wip fiberNode。

在此过程中最多会标记2类与**结构变化**相关的flags：

- Placement

```jsx
插入： a -> ab  
移动： abc -> bca
```

- ChildDeletion

```jsx
删除： ul>li*3 -> ul>li*1
```

beginWork 不包含与「属性变化」相关的flag：Update

```jsx
<img title="鸡" /> -> <img title="你太美" />
```

#### 实现与 Host 相关节点的 beginWork

首先，为开发环境增加__DEV__标识，方便Dev包打印更多信息：

```shell
pnpm i -d -w @rollup/plugin-replace
```

- HostRoot => 计算状态最新值 创建子 fiberNode
- HostComponent => 创建子 fiberNode
- HostTest => 因为无子节点 无需处理

#### beginWork 性能优化策略

考虑如下结构的 reactElement：

```jsx
<div>
 <p>练习时长</p>
 <span>两年半</span>
</div>
```

理论上 mount 流程完毕后包含的 flags：

- 两年半 Placement
- span Placement
- 练习时长 Placement
- p Placement
- div Placement

相比于执行5次Placment，我们可以构建好「离屏DOM树」后，对div执行1次Placement操作

<Image :src="ImgUpdate4" />

### completeWork 

需要解决的问题：

- 对于 Host 类型 fiberNode：构建离屏 DOM 树
- 标记 Update flag（TODO）

#### completeWork性能优化策略

flags 分布在不同 fiberNode 中，如何快速找到他们？

答案：利用 completeWork 向上遍历（归）的流程，将子 fiberNode 的 flags 冒泡到父 fiberNode

<Image :src="ImgUpdate5" />

### commit阶段

回顾上面可知道 react 内部有 3 个阶段

- schedule 阶段
- render 阶段（beginWork completeWork）
- commit 阶段（commitWork）

而 commit 阶段的还有 3 个子阶段
- beforeMutation 阶段
- mutation 阶段
- layout 阶段

当前 commit 阶段要执行的任务：
- fiber 树的切换
- 执行 Placement 对应操作（暂时实现）

<Image :src="ImgCommit1" />


