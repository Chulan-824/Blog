<script setup>
import ImgLane1 from './images/lane-1.png'
import ImgLane2 from './images/lane-2.png'
import ImgLane3 from './images/lane-3.png'
import ImgLane4 from './images/lane-4.png'
import ImgLane5 from './images/lane-5.png'
</script>
# 实现同步调度流程

更新到底是同步还是异步？

```jsx
class App extends React.Component {
    onClick() {
        this.setState({a: 1});
        console.log(this.state.a);
    }
    // ...省略其他代码
}
```

当前的现状：

- 从触发更新到 render，再到 commit 都是同步的
- 多次触发更新会重复多次更新流程

可以改进的地方：`多次触发更新，只进行一次更新流程`

Batched Updates（批处理）：多次触发更新，只进行一次更新流程

将多次更新合并为一次，理念上有点类似防抖、节流，我们需要考虑合并的时机是：

- 宏任务？
- 微任务？

用三款框架实现Batched Updates，打印结果不同：
- [React](https://codesandbox.io/s/react-concurrent-mode-demo-forked-t8mil?file=/src/index.js)
- [Vue3](https://codesandbox.io/s/crazy-rosalind-wqj0c?file=/src/App.vue)
- [Svelte](https://svelte.dev/repl/1e4e4e44b9ca4e0ebba98ef314cfda54?version=3.44.1)

结论：React批处理的时机既有宏任务，也有微任务（Vue3 和 Svelte 都是微任务）

## 新增调度阶段

既然我们需要`多次触发更新，只进行一次更新流程`，意味着我们要将更新合并，所以在：

- render 阶段
- commit 阶段

的基础上增加`schedule`阶段（调度阶段）

<Image :src="ImgLane1" />

## 对 update 的调整

`多次触发更新，只进行一次更新流程`中`多次触发更新`意味着对于同一个 fiber，会创建多个 update：

```jsx
const onClick = () => {
  // 创建3个update
  updateCount((count) => count + 1);
  updateCount((count) => count + 1);
  updateCount((count) => count + 1);
};
```

`多次触发更新，只进行一次更新流程`，意味着要达成3个目标：

- 需要实现一套优先级机制，每个更新都拥有优先级
- 需要能够合并一个宏任务/微任务中触发的所有更新
- 需要一套算法，用于决定哪个优先级优先进入 render 阶段

<Image :src="ImgLane2" />

## 实现 Lane 模型

采用二进制位表示 Lane 可以更方便的表示不同 Lane 的集合

Lane 模型包括：

- lane（二进制位，代表 update 优先级）
- lanes（二进制位，代表 lane 的集合）

### lane 的产生

对于不同情况触发的更新，产生 lane。为后续不同事件产生不同优先级更新做准备。

如何知道哪些 lane 被消费，还剩哪些 lane 没被消费？

对 FiberRootNode 的改造：

需要增加如下字段：

- 代表所有未被消费的 lane 的集合 （pendingLanes）
- 代表本次更新消费的 lane （finishedLane）

大致流程图如下：

<Image :src="ImgLane3" />

## 实现调度阶段

- 实现`某些判断机制`，选出一个lane
- 实现类似防抖、节流的效果，合并宏/微任务中触发的更新

大致流程图： 

<Image :src="ImgLane4" />

## render阶段的改造

processUpdateQueue 方法消费 update 时需要考虑：

- lane 的因素
- update 现在是一条链表，需要遍历

## commit阶段的改造

移除`本次更新被消费的lane`

## 总结

<Image :src="ImgLane5" />


