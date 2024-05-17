<script setup>
import ImgUseEffect1 from './images/useEffect-1.png'
import ImgUseEffect2 from './images/useEffect-2.png'
import ImgUseEffect3 from './images/useEffect-3.png'
import ImgUseEffect4 from './images/useEffect-4.png'
</script>
# 实现 useEffect

实现useEffect需要考虑的：

- effect 数据结构
- effect 的工作流程如何接入现有流程

## effect 数据结构

什么是 effect？

```jsx
function App() {
  useEffect(() => {
      // create
      return () => {
          // destroy
      }
  }, [xxx, yyy])
  
  useLayoutEffect(() => {})
  useEffect(() => {}, [])
  
  // ...
}
```

数据结构需要考虑：

- 不同 effect 可以共用同一个机制
  - useEffect
  - useLayoutEffect
  - useInsertionEffect
- 需要能保存依赖
- 需要能保存 create 回调
- 需要能保存 destroy 回调
- 需要能够区分是否需要触发 create 回调
  - mount时
  - 依赖变化时

```jsx
const effect = {
  tag,
  create,
  destroy,
  deps,
  next
}
```

注意区分新增的3个flag：

- 对于 fiber，新增 PassiveEffect，代表`当前fiber本次更新存在副作用`
- 对于 effect hook，Passive 代表`useEffect对应effect`
- 对于 effect hook，HookHasEffect 代表`当前effect本次更新存在副作用`

<Image :src="ImgUseEffect1" />

为了方便使用，最好和其他 effect 连接成链表

render 时重置 effect 链表

### 数据结构图总结

<Image :src="ImgUseEffect2" />

## effect 工作流程

<Image :src="ImgUseEffect3" />

### 调度副作用

调度需要使用[Scheduler](https://www.npmjs.com/package/scheduler)（调度器），调度器也属于[React项目下的模块](https://github.com/facebook/react/tree/main/packages/scheduler)

```shell
pnpm i -w scheduler 
pnpm i -D -w @types/scheduler
```

### 收集回调

回调包括两类：

- create 回调
- destroy 回调

[在线Demo](https://codesandbox.io/s/wonderful-davinci-cduo7y?file=/src/App.js:276-336)

```jsx
function App() {
  const [num, updateNum] = useState(0);
  useEffect(() => {
    console.log('App mount');
  }, []);

  useEffect(() => {
    console.log('num change create', num);
    return () => {
      console.log('num change destroy', num);
    };
  }, [num]);

  return (
    <div onClick={() => updateNum(num + 1)}>
      {num === 0 ? <Child /> : 'noop'}
    </div>
  );
}

function Child() {
  useEffect(() => {
    console.log('Child mount');
    return () => console.log('Child unmount');
  }, []);

  return 'i am child';
}
```

这意味着我们需要收集两类回调：

- unmount 时执行的 destroy 回调
- update 时执行的 create 回调

### 执行副作用

本次更新的任何 create 回调都必须在所有上一次更新的 destroy 回调执行完后再执行。

整体执行流程包括：

1. 遍历 effect
2. 首先触发所有 unmount effect，且对于某个 fiber，如果触发了 unmount destroy，本次更新不会再触发 update create
3. 触发所有上次更新的 destroy
4. 触发所有这次更新的 create

mount、update 时的区别

- mount时：一定标记 PassiveEffect
- update时：deps 变化时标记 PassiveEffect

### 总结

<Image :src="ImgUseEffect4" />


