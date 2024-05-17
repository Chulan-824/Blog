<script setup>
import ImgVdom1 from './images/vdom1.png'
import ImgVdom2 from './images/vdom2.png'
import ImgVdom3 from './images/vdom3.png'
import ImgVdom4 from './images/vdom4.png'
import ImgRunTime1 from './images/runTime1.png'
import ImgCore1 from './images/core1.png'
import ImgCore2 from './images/core2.png'
import ImgCore3 from './images/core3.png'
import ImgCore4 from './images/core4.png'
import ImgCore5 from './images/core5.png'
</script>
# Vue设计与实现笔记

## 设计理念

### 命令式和声明式

用两种编程范式实现一下需求

1. 获取 id 为 app 的 div 标签
2. 它的文本内容为 hello world
3. 为其绑定点击事件
4. 当点击时弹出提示：ok

```js
// 命令式
const div = document.querySelector('#app')            // 获取 div
div.innerText = 'hello world'                         // 设置文本内容
div.addEventListener('click', () => { alert('ok') })  // 绑定点击事件

// 声明式
<div @click="() => alert('ok')">hello world</div>
```

总结：

1. 命令式关注过程，声明式关注结果
2. Vue 内部实现一定是命令式，而暴漏给用户的确实更加声明式

### 性能与可维护性

以上述例子为例，将 hello world 修改为 hello vue3，不同范式下修改方式也不同

```js
// 命令式
div.textContent = 'hello vue3'                          // 直接修改

// 声明式
<div @click="() => alert('ok')">hello world</div>       // 之前
<div @click="() => alert('ok')">hello vue3</div>        // 之后

// 对于框架来说，为了实现最优的更新性能，它需要找到前后的差异并只更新变化的地方，但是最终完成这次更新的代码仍然是
div.textContent = 'hello vue3' 
```

由上述例子可知，性能更好的是直接修改 `div.textContent = 'hello vue3'`，如果我们把直接修改的性能开销定义为 A，把找差异性能开销定义为 B，那么有

- 命令式代码的更新性能消耗 = A 
- 声明式代码的更新性能消耗 = B + A

声明式代码最理想的情况就是 B 开销为 0，声明式代码和命令式代码相同，但是为什么Vue依然不直接采用命令式代码的原因就是`声明式代码的可维护性更强` 

而框架（Vue）要做的就是在保持可维护性的同时，让性能损失最小化

### 虚拟 DOM 性能到底如何

上文提到需要将找出性能差异性能开销降到最低，这就是接下来虚拟 DOM 要解决的问题

为什么是虚拟 DOM 而不是真实 DOM？

因为直接操作真实 DOM 性能开销非常大，虚拟 DOM 本质上就是js对象

操作真实 DOM 不只有 `document.createElement` 之类的方法，还有 `innerHTML`，所以需要单独讨论

那么在第一创建页面的时候性能对比，如下

<Image :src="ImgVdom1" />

创建页面的时候，三者没有数量级上的差别，所以区别不大

接着我们在看更新页面时的性能对比，如下

<Image :src="ImgVdom2" />

- innerHTML 需要重新销毁旧的 DOM，然后重新创建所有新 DOM
- 虚拟 DOM 只需要在上述基础增加 Diff 找出必要更新的 DOM 进行更新即可

在更新页面的时候，虚拟 DOM 的优势会比其他两者要大

那么如果我们的页面元素变得非常大的情况，更新和需要的性能消耗就如下所示

<Image :src="ImgVdom3" />

#### 总结

<Image :src="ImgVdom4" />

### 运行时和编译时

比如现在设计一个运行时框架，有一个 Render 函数，用户可以为该函数提供一个树形结构对象，然后 Render 函数会根据该对象递归渲染 DOM 元素

```js
const obj = {
  tag: 'div',
  children: [
    { tag: 'span', children: 'hello world' }
  ]
}

function Render(obj, root) {
  const el = document.createElement(obj.tag)
    if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children)
    el.appendChild(text)
  } else if (obj.children) {
    // 数组，递归调用 Render，使用 el 作为 root 参数
    obj.children.forEach((child) => Render(child, el))
  }

  // 将元素添加到 root
  root.appendChild(el)
}

// 渲染到 body 下
Render(obj, document.body)
```

这里不涉及任何额外操作，和学习额外的知识，就是定义对象，使用渲染函数渲染。但是有一个问题，就是定义对象去描述 HTML 方法太麻烦了，而且不直观，能不能直接使用 HTML 标签去写呢？达到以下效果

<Image :src="ImgRunTime1" />

为此我们可以编写一个叫 Compiler 的程序，作用就是把 HTML 的字符串编译成上述 Render 函数需要用的树形结果的数据对象，然后执行代码逻辑就是

```js
 const html = `
<div>
  <span>hello world</span>
</div>
`
// 调用 Compiler 编译得到树型结构的数据对象
const obj = Compiler(html)
// 再调用 Render 进行渲染
Render(obj, document.body)
```

这是，上面的代码就类似于`运行时+编译时`,其实也就是`运行时编译`， 在代码运行的时候才开始编译，而这会产生一定性能开销

那么，可不可以不要这个性能开销呢，在构建的时候就编译好，然后直接运行运行时代码就可以，既然直接可以提前编译的话，那直接编译成命令式代码不是更好吗？

这里就要说一下三种模式下的不同了

- 运行时：无法分析用户提供的内容
- 编译时：可以分析用户提供的内容，性能更好，灵活性差
- 运行时 + 编译时：在保证灵活性的基础上经可能去优化

## 框架核心要素

### 良好的开发体验

#### 错误提示

Vue 提供了友好的警告，源码中经常能够看到 warn 函数的调用 例如

```js
warn( `Failed to mount app: mount target selector "${container}"returned null.` )
```

#### 控制台输出结果

Vue3 打印一个 ref 数据

```js
const count = ref(0)
console.log(count)
```

<Image :src="ImgCore1" />

浏览器运行编写自定义的 formatter，从而自定义输出形式，Vue3 的源码中也有 initCustomFormatter 函数，该函数就是用来在开发环境下初始化自定义 formatter 的。

以 Chrome 为例，打开 DevTools,勾选 Console => Enable custom formatters

<Image :src="ImgCore2" width="25%" />

然后刷新浏览器并查看控制台

<Image :src="ImgCore3" width="20%" />

### 控制框架代码体积

Vue 源码中 warn 函数调用都会配合 __DEV__ 常量的检查，例如：

```js
if (__DEV__ && !res) {
  warn(`Failed to mount app: mount target selector "${container}"returned null.`)
}
```

Vue 使用的是 rollup 对项目进行构建，__DEV__ 常量通过 rollup 的插件配置来预定义，类似 webpack 中的 DefinePlugin 插件

这样就可以输出两个版本的资源，vue.global.js（开发环境），vue.global.prod.js（生产环境）

### 良好的Tree-Shaking

实现 Tree-Shaking 必须满足两个条件

1.  模块必须是 ESM（ES Module）
2.  没有副作用

由于静态分析 JavaScript 很困难，所以像 rollup 这类工具都会应该 `魔法注释（/*#__PURE__*/）` 代码来告诉 rollup 当前代码不会产生副作用，如

```js
import {foo} from './utils'

/*#__PURE__*/ foo()
```

::: tip
该注释不仅仅作用于函数，它可以应用于任何语句上  
该注释也不是只有 rollup 才能识别，webpack 以及压缩工具（如 terser）都能识别它
:::

### 构建产物输出

可以在 rollup.config.js 文件配置 format 属性来制定输出模块形式

```js
// rollup.config.js
const config = {
  input: 'input.js',
  output: {
    file: 'output.js',
    format: 'iife' // 指定模块形式 iife esm cjs
  }
}

export default config
```

#### IIFE（vue.global.js）

作为全局全量Vue使用

```js
<script src="/path/to/vue.js"></script>
const { createApp } = Vue
// ...
```

#### ESM（vue.esm-browser.js）

```js
<script type="module" src="/path/to/vue.esm-browser.js"></script>
```

其中 `-browser` 是指 ESM 打包资源给谁使用，如上述 `-browser` 表示打包资源直接给 `<script type="module">`，另外还有

`-bundler` 是指 ESM 打包资源给 rollup 或者 webpack 等打包工具使用的

区别：

1. Tres-Shaking 的时候，带有 -browser 的 ESM 资源中的 __DEV__ 在开发环境中会直接替换为 true，生产环境中替换为 false
2. 带有 -bundler 的 ESM 资源中不能直接设置 __DEV__，而是使用 `process.env.NODE_ENV !=='production')` 替换 __DEV__ 常量

```js
// -browser
if (__DEV__) {
  warn(`useCssModule() is not supported in the global build.`)
}
// -bundler
if ((process.env.NODE_ENV !== 'production')) {
  warn(`useCssModule() is not supported in the global build.`)
}
```

#### CJS

除了可以直接使用 `<script>`标签引入资源外，我们还希望用户可以在 Node.js 中通过 require 语句引用资源，例如：

```js
const Vue = require('vue')
```

这么做的答案就是 `服务端渲染`。当进行服务端渲染时，Vue.js 的代码是在 Node.js 环境中运行的，而非浏览器环境。在Node.js 环境中，资源的模块格式应该是 CommonJS，简称 cjs

### 特性开关

在设计框架时，框架会给用户提供诸多特性（或功能），例如我们提供 A、B、C 三个特性给用户，同时还提供了 a、b、c 三个对应的特性开关，用户以通过设置 a、b、c 为 true 或 false 来代表开启或关闭对应的特性，这将会带来很多益处

- 对于用户关闭的特性，我们可以利用 Tree-Shaking 机制让其不包含在最终的资源中。
- 该机制为框架设计带来了灵活性，可以通过特性开关任意为框架添加新的特性，而不用担心资源体积变大。同时，当框架升级时，我们也可以通过特性开关来支持遗留 API，这样新用户可以选 择不使用遗留 API，从而使最终打包的资源体积最小化。

```js
// rollup 配置 
{
  __FEATURE_OPTIONS_API__: isBundlerESMBuild ?`__VUE_OPTIONS_API__` : true,
}

// webpack.DefinePlugin 插件配置
new webpack.DefinePlugin({
  __VUE_OPTIONS_API__: JSON.stringify(true) // 开启特性
})
```

其中 `__FEATURE_OPTIONS_API__` 开关是控制 vue3的 Composition API 特性，`__VUE_OPTIONS_API__` 开关是控制 vue2的 Option Api 特性

### 错误处理

框架错误处理机制的好坏直接决定了用户应用程序的健壮性，还决定了用户开发时处理错误的心智负担。

比如 Vue 中提供了 registerErrorHandler 函数，用户可以使用它注册错误处理程序，然后在 callWithErrorHandling 函数内部捕获错误后，把错误传递给用户注册的错误处理程序

```js
// utils.js
let handleError = null

export default {
  foo(fn) {
    callWithErrorHandling(fn)
  },
  // 用户可以调用该函数注册统一的错误处理函数
  registerErrorHandler(fn) {
    handleError = fn
  }
}
function callWithErrorHandling(fn) {
  try {
    fn && fn()
  } catch (e) {
    // 将捕获到的错误传递给用户的错误处理程序
    handleError(e)
  }
}

// index.js
import utils from 'utils.js'
// 注册错误处理程序
utils.registerErrorHandler((e) => {
  console.log(e)
})
utils.foo(() => {/*...*/})
utils.bar(() => {/*...*/})
```

### 良好的 TypeScript 类型支持

误区：使用 TS 编写框架，就等价于对 TS 类型支持友好

比如

```js
function foo(val: any) {
  return val
}
```

<Image :src="ImgCore4" />

在调用 foo 函数时，我们传递了一个字符串类型的参数 'str'，按照之前的分析，得到的结果 res 的类型应该也是字符串类型，然而当我们把鼠标指针悬浮到 res 常量上时，可以看到其类型是 any，这并不是我们想要的结果

为了达到理想状态，我们只需要对 foo 函数做简单的修改即可

```js
function foo<T extends any>(val: T): T {
  return val
}
```

<Image :src="ImgCore5" />

可以看到，res 的类型是字符字面量 'str' 而不是 any 了，这说明我们的代码生效了
