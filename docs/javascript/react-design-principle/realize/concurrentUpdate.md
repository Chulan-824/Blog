<script setup>
import ImgConcurrentUpdate1 from './images/concurrentUpdate-1.png'
import ImgConcurrentUpdate2 from './images/concurrentUpdate-2.png'
</script>
# 并发更新原理

我们当前的实现是如何驱动的？

1. 交互触发更新（createUpdate）
2. 调度阶段微任务调度（ensureRootIsScheduled 方法）
3. 微任务调度结束，进入 render 阶段
4. render 阶段结束，进入 commit 阶段
5. commit 阶段结束，调度阶段微任务调度（ensureRootIsScheduled 方法）

整体是个大的微任务循环，循环的驱动力是`微任务调度模块`

## 同步示例

<Image :src="ImgConcurrentUpdate1" />

示例在两种情况下会造成阻塞：

- work.count 数量太多
- 单个 work.count 工作量太大

## 并发更新的理论基础

并发更新的基础是`时间切片`,将可能会出现掉帧的长宏任务，切成不会影响页面渲染短的宏任务

[在线示例](https://codesandbox.io/s/concurrent-3h48s?file=/src/index.js)

### 改造示例

如果我们想在宏任务中完成任务调度，本质上是个大的宏任务循环，循环的驱动力是 Scheduler

理论基础参考《React设计原理》

在微任务调度中，没有`优先级`的概念，对于 Scheduler存在5种优先级：

- ImmediatePriority（同步优先级）
- UserBlockingPriority（点击事件等）
- NormalPriority（正常优先级  ）
- LowPriority（低优先级）
- IdlePriority（空闲时优先级）

<Image :src="ImgConcurrentUpdate2" />

需要考虑的情况：

1. 工作过程仅有一个 work
  - 如果仅有一个 work，Scheduler 有个优化路径：如果调度的回调函数的返回值是函数，则会继续调度返回的函数
2. 工作过程中产生相同优先级的 work
  - 如果优先级相同，则不需要开启新的调度
3. 工作过程中产生更高/低优先级的 work
  - 把握一个原则：我们每次选出的都是优先级最高的 work


