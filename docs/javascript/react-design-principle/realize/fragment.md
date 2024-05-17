<script setup>
import ImgFragment1 from './images/fragment-1.png'
import ImgFragment2 from './images/fragment-2.png'
</script>
# Fragment

为了提高组件结构灵活性，需要实现 Fragment，具体来说，需要区分几种情况：

## Fragment包裹其他组件

```jsx
<>
  <div></div>
  <div></div>
</>

// 对应DOM
<div></div>
<div></div>
```
这种情况的JSX转换结果
```jsx
jsxs(Fragment, {
  children: [
      jsx("div", {}), 
      jsx("div", {})
  ]
});
```

type 为 Fragment 的 ReactElement，对单一节点的 Diff 需要考虑 Fragment 的情况。

## Fragment与其他组件同级

```jsx
<ul>
  <>
    <li>1</li>
    <li>2</li>
  </>
  <li>3</li>
  <li>4</li>
</ul>

// 对应DOM
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```
这种情况的JSX转换结果
```jsx
jsxs('ul', {
  children: [
    jsxs(Fragment, {
      children: [
        jsx('li', {
          children: '1'
        }),
        jsx('li', {
          children: '2'
        })
      ]
    }),
    jsx('li', {
      children: '3'
    }),
    jsx('li', {
      children: '4'
    })
  ]
});
```

children 为数组类型，则进入 reconcileChildrenArray 方法，数组中的某一项为 Fragment，所以需要增加 `type 为 Fragment 的 ReactElement 的判断`，同时 beginWork 中需要增加 Fragment 类型的判断。

## 数组形式的Fragment

```jsx
// arr = [<li>c</li>, <li>d</li>]

<ul>
  <li>a</li>
  <li>b</li>
  {arr}
</ul>

// 对应DOM
<ul>
  <li>a</li>
  <li>b</li>
  <li>c</li>
  <li>d</li>
</ul>
```
这种情况的JSX转换结果
```jsx
jsxs('ul', {
  children: [
    jsx('li', {
      children: 'a'
    }),
    jsx('li', {
      children: 'b'
    }),
    arr
  ]
});
```

children 为数组类型，则进入 reconcileChildrenArray 方法，数组中的某一项为数组，所以需要增加`reconcileChildrenArray 中数组类型的判断`。

## child reconcile 图解

<Image :src="ImgFragment1" />

::: tip 注
workTag 里 Fragment 是 Fiber 节点的 tag 属性（FiberNode.tag）
REACT_FRAGMENT_TYPE 是 ReactElement的 type 属性（element.type）
:::

## Fragment对ChildDeletion的影响

之前 ChildDeletion 删除 DOM 的逻辑：

- 找到子树的根 Host 节点
- 找到子树对应的父级 Host 节点
- 从父级 Host 节点中删除子树根 Host 节点

比如考虑删除p节点的情况：
```jsx
<div>
  <p>xxx</p>
</div>
```

现在考虑删除 Fragment 后，子树的根Host节点可能存在多个：
```jsx
<div>
  <>
    <p>xxx</p>
    <p>yyy</p>
  </>
</div>
```

<Image :src="ImgFragment2" />

## 对React的影响

React 包需要导出 Fragment，用于 JSX 转换引入 Fragment 类型

## 纠错

当嵌套数组类型JSX（比如这个[Demo](https://codesandbox.io/s/bold-cherry-eqtk50?file=/src/App.js)）时，由于我们实现的源码中updateFromMap方法中如下代码没有考虑传入的element可能为数组形式：

```jsx
const keyToUse = element.key !== null ? element.key : index;
```

导致element为数组形式时keyToUse为undefined，进而导致Fragment不能复用，造成bug。

为了解决这个问题，这种情况下可以使用index作为key，修改如下：

```jsx
 function getElementKeyToUse(element: any, index?: number): Key {
  if (
   Array.isArray(element) ||
   typeof element === 'string' ||
   typeof element === 'number'
  ) {
   return index;
  }
  return element.key !== null ? element.key : index;
 }
```
[详见fix: fragment array没有key](https://github.com/BetaSu/big-react/commit/ac2759e69d8a7049ef1965d460e78e50883b0d11)


