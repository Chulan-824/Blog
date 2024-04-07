# 模块化

## 概念

对于一个复杂的应用程序，与其将所有代码一股脑地放在一个文件中，不如按照一定的语法，遵循确定的规则（规范）将其拆分到几个互相独立的文件中。这些文件应该具有原子特性，也就是说，其内部完成共同的或类似的逻辑，通过对外暴露一些数据或调用方法，与外部完成整合。

这样一来，每个文件彼此独立，开发者更容易开发和维护代码，模块之间又能够互相调用和通信，这是现代化开发的基本模式。

### 模块化开发的好处
- 避免命名冲突（减少命名空间污染）
- 更好的分离, 按需加载
- 更高复用性 
- 高可维护性 

前端模块化发展主要经历了以下 3 个阶段:
- 早期 “假” 模块化时代
- 规范标准时代
- ES 原生时代

## 早期“假”模块化时代
### 函数模式

借助函数作用于来模拟模块化，我称其为`函数模式`，即将不同功能封装成不同的函数

```js
function f1() {
  // ...
}

function f2() {
  // ...
}
```

这样的实现其实根本不算模块化，各个函数在同一个文件中，混乱地互相调用，而且存在着命名冲突的风险。这里没有从根本上解决问题，只是从代码编写的角度，将代码拆分成了更小的函数单元。

### Namespace模式

即利用对象，实现命名空间的概念

```js
const module1 = {
  foo: 'bar',
  f11: function f11() { // ... },
  f12: function f12() { // ... },
    }

const module2 = {
  data: 'data',
  f21: function f21() { // ... },
  f22: function f22() { // ... },
}
```

这里模拟了简单的 module1 和 module2 命名空间，因此可以在函数主体中调用一下语句

```js
module1.f11()
console.log(module2.data)
```

可是，这样做的问题也很明显，module1 和 module2 中的数据并不安全，任何开发者都可以修改，比如如下直接修改赋值的代码

```js
module2.data = 'modified data'
```

这样是的对象内部成员可以随意被修改，极易出现 bug。那么，有什么手段能弥补这个不足呢？

### IIFE 模式

想一想闭包的内容，从某种角度上看，闭包简直就是一个天生解决数据访问性问题的方案。通过立即执行函数（ IIFE ，我们构造一个私有作用域，再通过闭包，将需要对外暴露的数据和接口输出

```js
const module = (function () {
  var foo = 'bar'
  var fn1 = function () {
    // ...
  }
  var fn2 = function () {
    // ...
  }
  return {
    f1,
    f2
  }
})()
```

我们在调用 module 时，如果想要访问变量 foo，是访问不到具体数据的，代码如下

```js
module.fn1()
module.foo // undefined
```

### IIFE 模式-依赖注入

了解 IIFE 模式之后，可以在此基础上进行变形，结合顶层 window 对象进行实现，代码如下

```js
(function (window) {
  var data = 'data'

  function foo() {
    console.log(`foo executing, data is ${data}`);
  }

  function bar() {
    data = 'modified data'
    console.log(`bar executing, data is now ${data}`);
  }

  window.module1 = { foo, bar }
})(window)
```

数据 data 完全做到了私有，外界无法修改 data 值。只能通过模块内部设计暴露的接口 bar 方法进行修改。

```js
module1.foo() // foo executing, data is data
module1.bar() // bar executing, data is now modified data
```

如此一来，代码已经初具 `模块化` 的实质了，实现了模块化所应该具备的初级功能

进一步思考，如果 module1 依赖外部模块 module2，改怎么办？可以将代码写为如下所示形式

```js
(function (window, $) {
  var data = 'data'

  function foo() {
    console.log(`foo executing, data is ${data}`);
    console.log($);
  }

  function bat() {
    data = 'modified data'
    console.log(`bar executing, data is now ${data}`);
  }

  window.module1 = { foo, bar }
})(window, jQuery)
```

事实上，这就是现代模块化方案的基石。至此，我们经历了模块化的第一阶段：“假”模块化时代。

## 规范标准时代

### CommonJS

Node.js 无疑对前端的发展具有极大的促进作用，它带来的 CommonJS 模块化规范像一股 `改革春风`。在 Nodejs 中，每一个文件就是一个模块，具有单独的作用域，对其他文件是不可见的。CommonJS 具有如下特点

- 文件及模块，文件内的所有代码都运行在独立的作用域中，因此不会污染全局空间
- 模块可以被多次引用、加载。在第一次被加载时，会被缓存，之后都从缓存中直接读取结果
- 加载某个模块，就是引入该模块的 `module.exports` 属性
- `module.exports` 属性输出的是值的拷贝，一旦这个值被输出，模块内在发生变化也不会影响到输出的值
- 模块按照代码引入的顺序进行加载
- 注意 `module.exports` 和 `exports` 的区别

CommonJS 规范如何用代码在浏览器端实现呢？其实就是实现 `module.exports` 和 `require` 方法

实现思路：根据 `require` 的文件路径加载文件内容并执行，同时将对外接口进行缓存。因此我们需要定义一个 `module` 对象，代码如下

```js
let module = {}
module.exports = {}
```

接着，借助立即执行函数，对 `module` 和 `module.exports` 对象进行赋值，如下

```js
(function (module, export) {
  // ...
})(module, module.exports)
```

### AMD

由于 Node.js 运行于服务器上，所有的文件一般都已经存储在本地硬盘中了，不需要额外的网络请求进行异步加载，因此通过 CommonJS 规范加载模块都是`同步`的。只有加载完成，才能执行后续操作。

但是，如果 Node.js 在浏览器环境中运行，那么由于需要从服务器获取模块文件，所以此时采用同步方法显然就不合适了，为此，社区退出了 AMD 规范

AMD 规范的全称为 Asynchronous Module Definition,看到 Asynchronous，我们就能够知道它的模块化标准不同于 CommonJS，按照该标准加载模块时是`异步`的，这种标准是完全适用于浏览器的

AMD 规范规定了如何定义模块，如何对外输出，如何引入依赖。这一切都需要代码去实现，因此一个著名的库—— require.js 应运而生，require.js 的实现很简单：通过 define 方法，将代码定义为模块；通过 require 方法，实现代码的模块加载

### CMD

CMD 规范整合了 CommonJS 和 AMD 规范的特点，它的全称为 Common Module Definition,与 require.js 类似，CMD 规范实现的位 sea.js

AMD 和 CMD 的两个主要区别
- AMD 需要异步加载模块，而 CMD 在加载模块时，可以通过同步的形式（ require ），也可以通过异步的形式（ require.async ）
- CMD 遵循依赖就近原则，AMD 遵循依赖前置原则。也就是说，在 AMD 中，我们需要把模块所需要的依赖都提前声明在依赖数组中；而在 CMD 中，我们只需要在具体代码逻辑内，使用依赖前，引入依赖模块即可

### UMD

UMD 的全程 Universal Module Definition,看到 Universal，我们可以猜到它允许在环境中同时使用 AMD 规范与 CommonJS 规范，相当于一个整合的规范。该规范的核心思想在于利用立即执行函数根据环境来判断需要的参数类别，譬如，UMD 在判断当前模块遵循 CommonJS 规范时，模块代码会以如下方式执行

```js
function (factory) {
  module.exports = factory()
}
```

而如果 UMD 判断出当前模块遵循 AMD 规范，则函数的参数就会变成 define，使用 AMD 规范，具体代码如下

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD 规范
    define(['b'], factory)
  } else if (typeof module === 'object' && module.exports) {
    // 类 Node 环境，并不支持完全严格的 CommonJS 规范
    // 但是属于 CommonJS-like 环境，支持 module.exports 用法
    module.exports = factory(require('b'))
  } else {
    // 浏览器环境
    root.returnExports = factory(root.b)
  }
})(this, function () {
  // 返回值为暴露的内容
  return {}
})
```

至此，我们便介绍完了模块化的 Node.js 和社区解决方案。这些方案充分利用了 JavaScript 的语言特性，并结合浏览器端的特点，加以实现。不同的实现方式体现了不同的设计哲学，但是它们的最终方向都指向了模块化的几个原则：`可复用性`、`可组合性`、`中心化`、`独立性`。

## ES 原生时代

ES 模块的设计思想是尽量的`静态化`，使得编译时就能确定模块的依赖关系，每个模块的输入和输出变量也都是确定的。而 CommonJS 和 AMD 模块都只能在运行时确定。这是 ES 模块和其他模块规范最显著的差别。第二个差别在于，CommonJS 模块输出的是一个值的拷贝，ES 模块输出的是值得引用

```js
// data.js
export let data = 'data'
export function modifyData() {
  data = 'modified data'
}

// index.js
import { data, modifyData } from './data'
console.log(data) // data
modifyData()
console.log(data) // modified data
```

我们在 index.js 中调用了 modifyData 方法，之后查询 data 值，得到了最新的变化；而同样的逻辑在 CommonJS 规范下的表现如下

```js
// data.js
let data = 'data'
function modifyData() {
  data = 'modified data'
}

module.exports = {
  data,
  modifyData
}

// index.js
var data = require('./data').data
var modifyData = require('./data').modifyData
console.log(data) // data
modifyData()
console.log(data) // data
```

因为 CommonJS 规范下输出的是值得拷贝，而非引用，因此在调用 modifyData 之后，index.js 的 data 值并没有发生变化，其值为一个全新的拷贝

### ES 模块为什么要设计成静态的

将 ES 模块设计成静态的，一个明显的优势是，通过静态分析，我们能够分析出导入的依赖。如果导入的模块没有被使用，我们便可以通过 tree shaking 等手段减少代码体积，进而提升运行性能。这就是基于 ESM 实现 tree shaking 的基础

这么说可能过于笼统，下面从设计的角度分析这种规范的利弊。静态性需要规范去强制保证，因此 ES 模块规范不像 CommonJS 规范那样灵活，其静态性会带来如下一些限制

- 只能在文件顶部引入引来
- 导出的变量类型受到严格限制
- 变量不允许被重新绑定，引入的模块名只能是字符串常量，即不可以动态确定依赖

这样的限制在语言层面带来的便利之一是，我们可以通过分析作用域，得出代码中变量所属的作用域及它们之间的引用关系，进而可以推导出变量和导入依赖变量之间的引用关系，在没有明显引用时，可以对代码进行去冗余

## ESM 和 CommonJS 的差异
1. ESM 模块输出的是值的引用；CommonJS 模块输出的是值的拷贝
2. ESM 模块是编译时输出接口；CommonJS 模块是运行时加载
3. ESM 模块this指向 `undefined`；CommonJS this 指向当前 `module` 默认的 `exports`
4. CommonJS 模块存在 __filename, __dirname，ESM 模块没有

## ESM 和 CommonJS 的相同点
1. 都有缓存，模块加载一次后会缓存起来，后续再次加载会用缓存里的模块。

## 参考附录

| **模块化规范** | **加载方式** | **加载时机** | **运行环境**  | **备注**                                                     |
| -------------- | ------------ | ------------ | ------------- | ------------------------------------------------------------ |
| AMD            | 异步         | 运行时       | 浏览器        |                                                              |
| CMD            | 异步         | 运行时       | 浏览器        | 依赖基于[静态分析](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fseajs%2Fseajs%2Fblob%2F1.0.0%2Fsrc%2Ffn-define.js%23L72)，require 时已经 module ready |
| CommonJS       | 同步/异步    | 运行时       | 浏览器 / Node | 服务器端是动态同步加载模块的，浏览器端需要先编译打包所有用到的模块 |
| ES Module      | 同步/异步    | 编译阶段     | 浏览器 / Node | 通过 import() 实现异步加载                                   |



《前端开发核心知识进阶》

[前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.cn/post/6844903576309858318#heading-4)

[前端模块化详解(完整版)](https://juejin.cn/post/6844903744518389768#heading-50)

[Javascript 模块化指北](https://juejin.cn/post/6844903654277791757#heading-5)

<SideTitle :page="$page" />