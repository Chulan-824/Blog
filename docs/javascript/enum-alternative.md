# TypeScript 枚举的替代方案

TypeScript 与许多编程语言一样，提供了`枚举（enum）`功能，它允许我们列举一个类型可能具有的值。

一个典型的 TypeScript 枚举定义如下：

```typescript
enum Direction {
  UP,
  DOWN,
}

function move(direction: Direction) {}

move(Direction.UP)
```

本文将深入探讨：

- 枚举的替代方案：字符串联合类型与对象字面量
- 枚举存在的问题

> 注：TypeScript 是一门优秀的编程语言，`枚举`在 2011 年可能是一个不错的选择，因为当时缺乏更好的替代方案。

## 替代方案一：字符串联合类型

该方案使用字符串字面量类型的联合类型：

```typescript
type Direction = 'UP' | 'DOWN'

function move(direction: Direction) {
  switch (direction) {
    case 'UP':
    // 向上移动逻辑
  }
  // 其他逻辑
}
```

TypeScript 为这种方案提供了出色的自动补全功能，并在类型错误时给出有用的提示。

### 优点

- 定义和使用都简洁明了，无需额外样板代码

### 缺点

- 编译后的 JavaScript 代码与 TypeScript 代码几乎相同，只是去掉了类型声明和类型注解。虽然这很好，但这不是普通 JavaScript 开发者会写的代码风格。下一个方案是经典的 JavaScript 风格，但在 TypeScript 中略显笨拙。

> 注：对于数字枚举，可以使用数字字面量类型作为替代：`type ENV_ID = 1`

## 替代方案二：对象字面量

该方案使用标准的 JavaScript 伪枚举模式，并添加一些 TypeScript 特有的注解：

```typescript
const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
} as const

type DIRECTIONS = (typeof DIRECTIONS)[keyof typeof DIRECTIONS]
```

### 使用示例

```typescript
const d1: DIRECTIONS = DIRECTIONS.UP; // 正确
const d1: DIRECTIONS = "UP";         // 正确
const d2: DIRECTIONS = "PLASTICS";  // 错误

const d3: DIRECTIONS = // 自动补全："UP", "DOWN"
```

### 技术原理

该方案依赖于以下 TypeScript 高级特性：

- `const`断言：保留对象中特定字符串的信息
- `typeof`操作符：获取变量的类型
- `keyof`操作符：获取对象键的联合类型
- 联合类型
- 查找类型：索引对象类型
- 联合类型的分配性：`ObjType["A" | "B"]`等同于`ObjType["A"] | ObjType["B"]`
- 类型别名和常量存在于不同命名空间的技巧

### 优点

- 这是将现有 JavaScript 文件转换为 TypeScript 的最直接方案
- 编译为标准的 JavaScript 代码

### 缺点

- JavaScript 开发者使用`DIRECTIONS.UP`而不是直接使用`"UP"`的原因是为了避免半硬编码字符串的扩散。但 TypeScript 的自动补全功能实际上会削弱这一优势。注意上面的示例中，自动补全显示的是`"UP"`而不是`DIRECTIONS.UP`。
- 这种方案可能导致盲目模仿或吓跑 TypeScript 初学者

## 枚举存在的问题（在存在更好替代方案的情况下）

### 问题一：奇怪的编译输出

枚举的编译输出非常奇怪，这导致了对 TypeScript 的依赖，并影响了调试：

```typescript
enum Direction {
  Up,
  Down,
}
```

编译为：

```javascript
var Direction
;(function (Direction) {
  Direction[(Direction['Up'] = 0)] = 'Up'
  Direction[(Direction['Down'] = 1)] = 'Down'
})(Direction || (Direction = {}))
```

### 问题二：默认使用数字值

枚举值默认为数字（而不是字符串），这也不利于调试：

```typescript
console.log(Direction.Up) // 输出 0
```

### 问题三：运行时特性可能导致兼容性问题

使用 TypeScript 运行时特性意味着如果 JavaScript 发展出具有不同语义的类似特性，您可能不得不处理破坏性更改。目前已经有一个关于 JavaScript 枚举的[冲突提案](https://github.com/rbuckton/proposal-enum)。类似的情况以前也发生过：

- TypeScript 实验性装饰器与 JavaScript 装饰器不兼容（目前处于[stage 2](https://github.com/tc39/proposal-decorators)）
- 经典 TypeScript 类字段与 JavaScript 类字段[略有不同](https://github.com/microsoft/TypeScript/issues/27644)

### 问题四：赋值规则不合理

```typescript
enum A {
  foo = 0;
}

// 应该报错，但实际上没有
const test: A.foo = 1729;
```

### 问题五：声明合并存在风险

```typescript
enum Shape {
  Line = 0,
}

enum Shape {
  Dot = 0, // 允许
}

const x: Shape.Dot = Shape.Line // 没有报错！

console.log(Shape[0]) // 输出 "Dot"，因为最后添加的是 Dot
```

**TypeScript，在你眼中，`Line`就是`Dot`！**

> 再次强调：TypeScript 是一门优秀的编程语言，`枚举`在 2011 年可能是一个不错的选择，因为当时缺乏更好的替代方案。

## 延伸阅读

以下是一些支持使用枚举的文章，提供了不同的视角：

- [https://2ality.com/2020/01/typescript-enums.html](https://2ality.com/2020/01/typescript-enums.html)
- [https://blog.logrocket.com/writing-readable-code-with-typescript-enums-a84864f340e9/](https://blog.logrocket.com/writing-readable-code-with-typescript-enums-a84864f340e9/)
