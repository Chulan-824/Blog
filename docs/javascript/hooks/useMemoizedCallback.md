# useMemoizedCallback

## 实现

```ts
import {useMemo, useRef} from "react";

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => ReturnType<T>;

export function useMemoizedCallback<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn);

  // why not write `fnRef.current = fn`?
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo<T>(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>();

  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as T;
}
```

## useMemoizedCallback 和 useCallback 的区别

### 1. 核心功能
- `useCallback`: 基于依赖项对回调函数进行记忆化。当依赖项改变时，函数引用会改变。
- `useMemoizedCallback`: 创建一个在重新渲染过程中保持稳定的函数引用，同时始终能访问最新的回调实现。

### 2. 依赖数组
- `useCallback` 需要依赖数组来决定何时更新记忆化的函数
- `useMemoizedCallback` 不需要依赖数组，因为它始终保持稳定的引用

### 3. 实现方式
- `useCallback` 是 React 内置的 Hook
- `useMemoizedCallback` 通常是使用 `useRef` 和 `useMemo` 实现的自定义 Hook

### 使用场景

#### useCallback 适用场景：
1. 当需要将回调传递给依赖引用相等性的优化子组件时
2. 当需要基于特定依赖项进行函数记忆化时
3. 当使用依赖于回调函数的 effects 时

示例：
```tsx
const handleClick = useCallback(() => {
  console.log(count);
}, [count]); // 当 count 改变时重新创建
```

#### useMemoizedCallback 适用场景：
当需要一个永远不变的函数引用，但总是能访问最新的 props/state
当处理需要一次性设置的事件监听器或订阅时
当想要避免子组件不必要的重渲染，且不想管理依赖项时

```tsx
const handleClick = useMemoizedCallback(() => {
  console.log(count); // 总是访问最新的 count
}); // 函数引用永远不变
```