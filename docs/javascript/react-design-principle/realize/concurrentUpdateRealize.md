<script setup>
import ImgConcurrentUpdateRealize1 from './images/concurrentUpdateRealize-1.png'
</script>

# 实现并发更新

要实现并发更新，需要做的改动包括：

- Lane 模型增加更多优先级
- 交互与优先级对应
- 调度阶段引入 Scheduler，新增调度策略逻辑
- render 阶段可中断
- 根据 update 计算 state 的算法需要修改

## 扩展交互(优先级)

不同交互对应不同优先级，可以根据`触发更新的上下文环境`赋予不同优先级，比如：

- 点击事件需要同步处理
- 滚动事件优先级再低点
- useEffect create 回调中触发更新的优先级
- 首屏渲染的优先级
- ...

不同的优先级影响不同的 Update 从而影响更新（渲染）

不过现在掌握与优先级相关的信息包括：

- Scheduler 的 5 种优先级
- React 中的 Lane 模型

也就是说，运行流程在 React 时，使用的是 Lane 模型，运行流程在 Scheduler 时，使用的是优先级。所以需要实现两者的转换：

- lanesToSchedulerPriority
- schedulerPriorityToLane

## 扩展调度阶段

主要是在同步更新（微任务调度）的基础上扩展并发更新（Scheduler调度），主要包括：

- 将并发原理中的调度策略移到项目中
- render 阶段变为**可中断**

梳理两种典型场景：

- 时间切片
- 高优先级更新打断低优先级更新

<Image :src="ImgConcurrentUpdateRealize1" />

## 扩展state计算机制

上文提到不同的 lane 影响不同的 Update 从而影响更新，而每个 Update 又会计算生成 state

所以，Update 计算 state 这一环节就会做一下事情：

- 高优先级任务打断低优先级任务时，跳过**优先级不够的 Update**
- 保存跳过的 Update

### 跳过 update 需要考虑的问题

比较**优先级是否足够** => 位运算 & 计算 renderLane 和 LupdateLane

如何同时兼顾 **update 的连续性**与 **update 的优先级**？

```jsx
// u0
{
  action: num => num + 1,
  lane: DefaultLane
}
// u1
{
  action: 3,
  lane: SyncLane
}
// u2
{
  action: num => num + 10,
  lane: DefaultLane
}

// state = 0; updateLane = DefaultLane
// 只考虑优先级情况下的结果：11
// 只考虑连续性情况下的结果：13
```

新增 baseState、baseQueue 字段来兼顾 **update 的连续性**与 **update 的优先级**

- baseState 是本次更新参与计算的初始 state，memoizedState 是上次更新计算的最终 state
- 如果本次更新没有 update 被跳过，则下次更新开始时 baseState === memoizedState
- 如果本次更新有 update 被跳过，则本次更新计算出的 memoizedState 为**考虑优先级**情况下计算的结果，baseState 为**最后一个没被跳过的 update 计算后的结果**，下次更新开始时 baseState !== memoizedState
- 本次更新**被跳过的 update 及其后面的所有 update** 都会被保存在 baseQueue 中参与下次 state 计算
- 本次更新**参与计算但保存在 baseQueue 中的 update**，优先级会降低到 NoLane

```jsx
// u0
{
  action: num => num + 1,
  lane: DefaultLane
}
// u1
{
  action: 3,
  lane: SyncLane
}
// u2
{
  action: num => num + 10,
  lane: DefaultLane
}

/*
* 第一次render
* baseState = 0; memoizedState = 0; 
* baseQueue = null; updateLane = DefaultLane;
* 第一次render 第一次计算 
* baseState = 1; memoizedState = 1; 
* baseQueue = null;
* 第一次render 第二次计算 
* baseState = 1; memoizedState = 1; 
* baseQueue = u1;
* 第一次render 第三次计算 
* baseState = 1; memoizedState = 11; 
* baseQueue = u1 -> u2(NoLane);
*/ 

/*
* 第二次render
* baseState = 1; memoizedState = 11; 
* baseQueue = u1 -> u2(NoLane); updateLane = SyncLane
* 第二次render 第一次计算 
* baseState = 3; memoizedState = 3; 
* 第二次render 第二次计算 
* baseState = 13; memoizedState = 13; 
*/ 
```

所以：
- react 分多次计算，每次计算都可以兼顾优先级，总体计算兼顾连续性
- 中间可能会产生不符合预期的中间状态（只兼顾优先级）
- react 只能保证结果状态兼顾**连续性**和**优先级**


