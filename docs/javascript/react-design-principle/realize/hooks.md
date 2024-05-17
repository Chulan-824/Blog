<script setup>
import ImgHooks1 from './images/hooks-1.png'
import ImgHooks2 from './images/hooks-2.png'
</script>
# 实现Hooks架构

## 架构难点

1. hook 脱离 FC 上下文，仅仅是普通函数，如何让他拥有感知上下文环境的能力？
2. hook怎么知道当前是 mount 还是 update？

针对问题1，比如如下情况：

```jsx
function App() {
  useEffect(() => {
    // 执行useState时怎么知道处在useEffect上下文？
    useState(0);
  })
}
```

针对上述两个难点，解决方案 `在不同上下文中调用的hook不是同一个函数`

不过要知道程序处于那种上下文中只有 reconciler 包中才能知道，但是我们使用 hooks 函数的时候，都是从 react 包中导入，所以这里还需要再内部实现一个 reconciler - react 包的一个数据共享层，大致如下图

<Image :src="ImgHooks1" />

::: tip
实现「内部数据共享层」时的注意事项
:::

以浏览器举例，Reconciler + hostConfig = ReactDOM

增加「内部数据共享层」，意味着Reconciler与React产生关联，进而意味着 ReactDOM 与 React 产生关联。

如果两个包「产生关联」，在打包时需要考虑：「两者的代码是打包在一起还是分开？」

如果打包在一起，意味着打包后的 ReactDOM 中会包含 React 的代码，那么ReactDOM 中会包含一个「内部数据共享层」，React 中也会包含一个「内部数据共享层」，这两者不是同一个「内部数据共享层」。

而我们希望两者共享数据，所以不希望 ReactDOM 中会包含 React 的代码。

需要再 rollup 打包配置文件中进行配置：

```js
// script/rollup/react-dom.config.js
const { peerDependencies } = getPackageJSON('react-dom');

{
  ...,
  external: [...Object.keys(peerDependencies)],
}
```

hook 如何知道自身数据保存在哪？

```jsx
function App() {
  // 执行useState为什么能返回正确的num？
  const [num] = useState(0);
}
```

答案：「可以记录当前正在render的FC对应fiberNode，在fiberNode中保存hook数据」

## 实现 Hooks 的数据结构

fiberNode 中可用的字段：

- memoizedState
- updateQueue

<Image :src="ImgHooks2" />

对于 FC 对应的 fiberNode，存在两层数据：

- fiberNode.memoizedState 对应 Hooks 链表
- 链表中每个 hook 对应自身的数据

## 实现useState
包括2方面工作：

1. 实现 mount 时 useState 的实现
2. 实现 dispatch 方法，并接入现有更新流程内



