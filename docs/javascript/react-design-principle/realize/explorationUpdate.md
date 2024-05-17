<script setup>
import ImgExplorationUpdate1 from './images/explorationUpdate-1.png'
</script>

# 初探 Update 流程

## 前言

update 流程与 mount 流程的区别

对于 beginWork：

- 需要处理 ChildDeletion 的情况
- 需要处理节点移动的情况（abc -> bca）

对于 completeWork：
- 需要处理 HostText 内容更新的情况
- 需要处理 HostComponent 属性变化的情况

对于 commitWork：
- 对于 ChildDeletion，需要遍历被删除的子树
- 对于 Update，需要更新文本内容

对于 useState：
- 实现相对于 mountState的updateState

## beginWork流程

这里仅处理单一节点，所以省去了「节点移动」的情况。我们需要处理：

- singleElement
- singleTextNode

处理流程为：
- 比较是否可以复用 current fiber  
  a.比较 key，如果 key 不同，不能复用  
  b.比较 type，如果 type 不同，不能复用  
  c.如果 key 与 type 都相同，则可复用  
- 不能复用，则创建新的（同mount流程），可以复用则复用旧的

注意：对于同一个 fiberNode，即使反复更新，current、wip 这两个 fiberNode 会重复使用

## completeWork流程

主要处理`标记Update`的情况

## commitWork流程

对于标记 ChildDeletion 的子树，由于子树中：

- 对于 FC，需要处理 useEffect unmout 执行、解绑 ref
- 对于 HostComponent，需要解绑 ref
- 对于子树的根 HostComponent，需要移除 DOM

所以需要实现`遍历ChildDeletion子树`的流程

## 对于useState

需要实现：
- 针对 update 时的 dispatcher
- 实现对标 mountWorkInProgresHook 的 updateWorkInProgresHook
- 实现 updateState中`计算新state的逻辑`

其中 updateWorkInProgresHook 的实现需要考虑的问题：
- hook 数据从哪来？
- 交互阶段触发的更新
```jsx
<div onClick={() => update(1)}></div>
```
- render 阶段触发的更新（TODO）
```jsx
function App() {
  const [num, update] = useState(0);
  // 触发更新
  update(100);
  return <div>{num}</div>;
}
```

## 总结

<Image :src="ImgExplorationUpdate1" />


