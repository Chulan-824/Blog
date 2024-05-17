<script setup>
import ImgDiff1 from './images/diff-1.png'
</script>

# diff算法

在之前只实现了单节点的 diff 算法，这里需要实现多节点的 diff 算法

## 对于 reconcileSingleElement 的改动

当前支持的情况：

A1 -> B1
A1 -> A2

需要支持的情况：

ABC -> A

`单/多节点`是指``更新后是单/多节点`

更细致的，我们需要区分 4 种情况：

- key 相同，type 相同 == 复用当前节点 例如：A1 B2 C3 -> A1

- key 相同，type 不同 == 不存在任何复用的可能性 例如：A1 B2 C3 -> B1

- key 不同，type 相同  == 当前节点不能复用

- key 不同，type 不同 == 当前节点不能复用

## 对于 reconcileSingleTextNode 的改动 

类似 reconcileSingleElement

## 对于同级多节点 Diff 的支持

单节点需要支持的情况：

- 插入 Placement
- 删除 ChildDeletion

多节点需要支持的情况：

- 插入 Placement
- 删除 ChildDeletion
- 移动 Placement

整体流程分为4步

1. 将 current 中所有同级 fiber 保存在 Map 中

2. 遍历 newChild 数组，对于每个遍历到的 element，存在两种情况：

  - 在 Map 中存在对应 current fiber，且可以复用
  - 在 Map 中不存在对应 current fiber，或不能复用

3. 判断是插入还是移动

4. 最后Map中剩下的都标记删除

### 步骤 2 —— 是否复用详解

首先，根据 key 从 Map 中获取 current fiber，如果不存在 current fiber，则没有复用的可能。

接下来，分情况讨论：

- element 是 HostText，current fiber 是么？
- element 是其他 ReactElement，current fiber 是么？
- TODO element 是数组或 Fragment，current fiber 是么？

```jsx
<ul>
    <li/>
    <li/>
    {[<li/>, <li/>]}
</ul>

<ul>
    <li/>
    <li/>
    <>
        <li/>
        <li/>
    </>
</ul>
```

### 步骤 3 —— 插入/移动判断详解

`移动`具体是指`向右移动`

移动的判断依据：element 的 index 与`element 对应 current fiber`的index 的比较

A1 B2 C3 -> B2 C3 A1

0__1__2_____0__1__2

当遍历 element 时，`当前遍历到的 element`一定是`所有已遍历的 element`中最靠右那个。

所以只需要记录`最后一个可复用 fiber`在 current 中的 index（lastPlacedIndex），在接下来的遍历中：

- 如果接下来遍历到的`可复用fiber`的 index < lastPlacedIndex，则标记 Placement
- 否则，不标记

## 移动操作的执行

Placement同时对应：

- 移动
- 插入

对于插入操作，之前对应的 DOM 方法是 parentNode.appendChild，现在为了实现移动操作，需要支持 parentNode.insertBefore

parentNode.insertBefore 需要找到`目标兄弟Host节点`，要考虑 2 个因素

- 可能并不是目标fiber的直接兄弟节点
```jsx
// 情况1
<A/><B/>
function B() {
  return <div/>;
}

// 情况2
<App/><div/>
function App() {
  return <A/>;
}
```

- 不稳定(自身携带副作用)的 Host 节点不能作为`目标兄弟Host节点`

## 不足

- 不支持数组与 Fragment
```jsx
<>
  <div/>
  <div/>
</>

<ul>
  <li/>
  <li/>
  {[<li/>, <li/>]}
</ul>
```
- 可能有未考虑到的边界情况

## 总结

<Image :src="ImgDiff1" />


