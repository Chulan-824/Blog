# 关于 TypeScript，没人告诉你的那件事

[原文链接](https://kettanaito.com/blog/one-thing-nobody-explained-to-you-about-typescript)

我已经使用[TypeScript](https://www.typescriptlang.org/)超过四年了，总体来说，这是一次很棒的经历。随着时间的推移，使用它的摩擦逐渐减少，直到完全消失，这让我在编写类型甚至以类型优先的方式解决问题时更加高效。虽然我远不是真正的类型魔法师，但我敢说自己已经熟练掌握了这门语言，经历过类型体操、条件类型、嵌套泛型，也思考过`type`和`interface`之间的神圣区别。老实说，我以为自己已经很好地理解了这门语言。

直到我发现并非如此。你看，关于 TypeScript 有一件特别的事情我完全理解错了，我相信你也一样。这不是什么你从未听说过、可能永远用不到的边缘情况。恰恰相反。这是你，以及任何其他 TypeScript 开发者直接交互过数百次的东西，它一直就在我们眼皮底下。

**我说的是`tsconfig.json`。**

不，这不是关于它有多复杂（我承认我需要思考一下才能解释`target`和`module`）。相反，这是一件相当简单的事情。它是关于`tsconfig.json`*实际*做了什么。

"_嗯，它是一个配置文件，它配置 TypeScript，废话。"_ 没错！它确实如此，但并不是你想象的那样。让我来展示给你看。

## 库、测试和真相

每个伟大的发现背后都有一个很好的例子。我会尽力让这个例子既好又实用。

让我们写一个简单的前端应用。我是说真的，没有框架，没有依赖。_简单_。

```typescript
// src/app.ts
const greetingText = document.createElement('p')
greetingText.innerText = 'Hello, John!'

document.body.appendChild(greetingText)
```

创建一个段落元素并向 John 问好。简单。到目前为止一切顺利。

但是`document`是从哪里来的？你可以说它是 JavaScript 中的全局变量，从某种意义上说，你是对的。但有一件事。我们并不在 JavaScript 中。至少现在还不是。我们在 IDE 中看到的是 TypeScript 代码。它需要被编译成 JavaScript，进入浏览器，然后浏览器才会向它暴露`document`全局变量。那么 TypeScript 是如何知道`document`、它的存在以及它的方法的呢？

TypeScript 通过加载一个默认的*定义库*`lib.dom`来实现这一点。你可以把它想象成一个包含一堆类型来描述 JavaScript 全局变量的`.d.ts`文件，因为它确实就是这样的。你可以通过按住 CMD（Windows 上是 CTRL）并点击`document`对象来亲眼看到这一点。谜题解开了。

既然我们的应用自然是自切片面包以来最好的东西，让我们为它添加一些自动化测试。为了这一步，我们将违背我们的简单理念，安装一个名为 Vitest 的测试框架。接下来，我们编写测试本身：

```typescript
// src/app.test.ts
it('greets John', async () => {
  await import('./app')
  const greetingText = document.querySelector('p')
  expect(greetingText).toHaveText('Hello, John!')
})
```

当我们尝试运行这个测试时，TypeScript 会*干扰*并报错：

```
Cannot find name 'it'. Do you need to install type definitions for a test runner?
```

我不得不承认，编译器说得有道理。`it`是从哪里来的？它不像`document`那样是全局变量，它必须来自某个地方。实际上，测试框架扩展全局对象并暴露像`it`和`expect`这样的函数是很常见的，这样你就可以在每个测试中访问它们，而不必显式导入它们。

我们按照测试框架文档中方便地存在的一个部分，通过修改`tsconfig.json`来启用全局`it`：

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

通过使用`compilerOptions.types`，我们要求 TypeScript*加载额外的类型*，在这里是来自`vitest/globals`的类型，它们声明了全局`it`函数。编译器对我们的努力报以微笑，让测试通过，让我们对自己和整个严格类型语言的事情感觉特别好。

但别。那么。快。

## 问题

我们将稍微偏离一下主题，但我保证最后一切都会变得清晰。

让我问你：如果你在 TypeScript 中引用一个不存在的代码会发生什么？是的，会出现一个波浪形的红线和一个`Cannot find name`类型错误，这就是会发生的事情。我们刚刚在尝试调用`it()`时看到了这一点。

跳回到`app.ts`模块，添加一个对名为`test`的不存在的全局变量的引用：

```typescript
// src/app.ts
// ...应用代码。

test
```

我们没有定义`test`。它不是浏览器全局变量，当然也不存在于 TypeScript 的任何默认库中。这是一个错误，一个 bug，它应该变红。

只是，它没有。当红色的波浪线没有在代码下显现时，力量在你体内流动。_权威_。_困惑_。更糟糕的是，TypeScript 不仅没有在这里产生错误，它实际上还试图提供帮助，建议我们*输入*`test`，向我们展示它的调用签名，说它来自某个`TestApi`命名空间。但这是 Vitest 中的一个类型，这怎么可能...

这段代码会编译吗？当然。它会在浏览器中工作吗？不会。它会像一个投手在他最辉煌的日子里那样抛出错误。怎么会这样？使用 TypeScript 的全部目的不就是为了防止这样的错误吗？

这里的`test`就是我所说的*幽灵定义*。它是一个有效的类型定义，描述了一些根本不存在的东西。*又是 TypeScript 的把戏，*你说。*别急着责怪工具，*我说。以下是正在发生的事情。

## （不止）一个配置来统治它们

将`app.test.ts`测试模块从`src`目录移动到一个新创建的`test`目录。打开它。等等，`it`上又出现类型错误了吗？我们不是已经通过将`vitest/globals`添加到我们的`tsconfig.json`中修复了这个问题吗？

问题是，TypeScript 不知道如何处理`test`目录。事实上，TypeScript 甚至不知道它的存在，因为我们在`tsconfig.json`中指向的只有`src`：

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

正如我之前提到的，TypeScript 配置的工作方式并不完全明显（至少对我来说）。很长一段时间以来，我一直认为`include`选项代表要包含在编译中的模块，而`exclude`则分别控制要*排除*的模块。如果我们查阅[TypeScript 文档](https://www.typescriptlang.org/tsconfig#include)关于这个问题的内容，我们会读到：

> `include`，指定要包含在程序中的文件名或模式数组。

我对`include`的理解与文档中所述略有不同，而且更具体。

`include`选项控制将 TypeScript 配置应用到哪些模块。

你没看错。如果一个 TypeScript 模块位于`include`选项中列出的目录之外，那么`tsconfig.json`_将对该模块完全没有影响_。相应地，`exclude`选项允许过滤出哪些文件模式必须*不受*当前配置的影响。

好吧，所以我们把`test`添加到`include`中，然后继续我们的日子，这有什么大不了的？

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  },
  "include": ["src", "test"]
}
```

**这就是大多数开发者完全搞错的地方**。通过向`include`添加新目录，你正在扩展这个配置以影响*所有*这些目录。虽然这个更改修复了`test`中的测试框架类型，但它会将它们泄漏到所有`src`模块中！你刚刚让你的整个源代码变成了一个鬼屋，释放了数百个幽灵类型。不存在的东西会被类型化，被类型化的东西可能会与其他定义冲突，随着应用程序随着时间的推移而增长，使用 TypeScript 的整体体验将急剧下降。

那么，解决方案是什么呢？我们应该去为每个目录创建一堆`tsconfig.json`吗？

嗯，实际上，是的，你应该。只是，不是为*每个*目录，而是为你的代码要运行的每个*环境*。

## 运行时和关注点

现代 Web 应用程序的背后是一个精致的模块沙拉。你的应用程序的直接源代码需要被编译、压缩、代码分割、打包，然后发送给你的用户。然后还有测试文件，它们也是 TypeScript 模块，永远不会被编译或发送给任何人。可能还有 Storybook 故事、Playwright 测试，也许还有一两个自定义的`*.ts`脚本来自动化事情——所有这些都有帮助，都有*不同的意图*，并且要在*不同的环境*中运行。

但我们编写模块的*目的*很重要。对 TypeScript 来说也很重要。为什么你认为它会默认给你`Document`类型？因为它知道你很可能在开发一个 Web 应用。开发 Node.js 服务器？请明确说明这个意图并安装`@types/node`。编译器不能为你猜测，你需要*告诉它你想要什么*。

你通过`tsconfig.json`来传达这个意图。但不仅仅是根级别的那个。TypeScript 可以非常出色地处理嵌套配置。因为它就是*为此设计的*。你所要做的就是明确你的意图。

```
# 根级别配置，在整个项目中应用TypeScript
# 这主要只包含引用。
- tsconfig.json

# 所有其他配置扩展的基础配置。
# 在这里描述共享选项。
- tsconfig.base.json

# 源文件配置。
- tsconfig.src.json

# 构建配置。
- tsconfig.build.json

# 集成测试配置。
- tsconfig.test.json

# 端到端测试配置。
- tsconfig.e2e.test.json
```

哇，这有很多配置！嗯，也有很多意图：从源文件到各种测试级别再到生产构建。所有这些都应该是类型安全的。你通过使用 TypeScript 配置的[`references`](https://www.typescriptlang.org/docs/handbook/project-references.html)属性来使它们类型安全！

魔法从根级别的`tsconfig.json`开始。请放心，_这是 TypeScript 将拾取的唯一配置_。所有其他配置都成为根级别配置的*引用*，仅应用于匹配其`include`的文件。

这是根级别`tsconfig.json`的样子：

```json
// tsconfig.json
{
  "references": [
    // 源文件（例如"./src"下的所有内容）。
    { "path": "./tsconfig.src.json" },
    // 集成测试（例如"./tests"下的所有内容）。
    { "path": "./tsconfig.test.json" },
    // 端到端测试（例如"./e2e"下的所有内容）。
    { "path": "./tsconfig.e2e.test.json" }
  ]
}
```

由于你使用了`references`字段，所有被引用的配置必须将`compilerOptions.composite`设置为`true`。以下是源文件的`tsconfig.src.json`示例：

```json
// tsconfig.src.json
{
  // 继承重用选项。
  "extends": "./tsconfig.base.json",
  // 仅将本配置应用于"./src"目录下的文件。
  "include": ["./src"],
  "compilerOptions": {
    "composite": true,
    "target": "es2015",
    "module": "esnext",
    // 为React应用支持JSX。
    "jsx": "react"
  }
}
```

> 你为源文件和构建使用单独的配置，因为带有`compilerOptions.composite`的配置不能直接运行。你为构建将`tsc`指向特定的`-p tsconfig.build.json`。

对于交叉的配置，比如集成测试的配置，它应该只应用于`./tests`下的文件，同时仍然允许你导入被测试的源代码，这有点棘手。为此，你再次利用`references`属性！

```json
// tsconfig.test.json
{
  "extends": "./tsconfig.base.json",
  "include": ["./tests"],
  "references": [{ "path": "./tsconfig.src.json" }],
  "compilerOptions": {
    "composite": true,
    "target": "esnext",
    "module": "esnext",
    // 包含测试特定类型。
    "types": ["@types/node", "vitest/globals"]
  }
}
```

`references`属性告诉 TypeScript 在类型检查中包含给定的配置，而不让当前配置影响包含的文件。

## `include` vs `references`

`include`和`references`属性都涉及 TypeScript"可见"的文件，但它们以不同的方式做到这一点。让我们回顾一下这个区别。

- `include`，控制哪些文件*受*本配置*影响*；
- `references`，控制哪些文件对本配置*可见*但不受其影响。

集成测试配置（`tsconfig.test.json`）完美地说明了这个区别。你希望该配置仅应用于`./tests`目录下的测试文件，所以这就是你在`include`中提供的内容。但你也希望能够在这些文件中导入被测试的源代码，这意味着 TypeScript 必须知道这些代码。你在`references`中*引用*源文件的配置（`tsconfig.src.json`），这间接扩展了 TypeScript 的视野，使其包含那里的文件，而不受集成测试配置的影响。

## 实际应用

无论好坏，我们正在走向开发者工具被抽象化的时代。期望你选择的框架为你处理这个配置丛林是公平的。事实上，一些框架已经在这样做了。以[Vite](https://github.com/vitejs/vite/tree/1c031723a821d654e9aed44e43a0a5fa47c240da/packages/create-vite/template-react-ts)为例。我相当自信你可以在其他任何项目中找到 TypeScript 的多配置设置。

但我想让你明白，TypeScript 仍然是你的工具，无论是否被抽象化，你最好多学习它，更好地理解它，并正确地使用它。

## 总结

通过这篇文章，我们深入探讨了 `tsconfig.json` 的正确使用方式，揭示了以下关键点：

1. **配置作用域**：`include` 选项控制配置的应用范围，而非简单的文件包含
2. **环境隔离**：为不同运行环境（如源码、测试、构建）创建独立的配置
3. **类型安全**：避免幽灵定义，确保类型与实际运行时环境一致
4. **配置继承**：通过 `extends` 和 `references` 实现配置的复用和扩展
5. **工具理解**：即使框架抽象了配置细节，理解底层原理仍至关重要

正确配置 TypeScript 不仅能提高开发效率，更能确保代码质量。记住：好的工具需要正确的使用方式，而理解工具的工作原理是成为优秀开发者的必经之路。
