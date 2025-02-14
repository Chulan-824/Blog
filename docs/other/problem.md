# 问题

## tailwindcss 背景图片和背景渐变兼容问题

### 方法一：背景图（relative）+ 子蒙层盒子定位（absolute）

:::code-group

```css [global.css]
.product-custom-gradient {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 74.42%, #000 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 77.29%, #000 100%);
}
```

```tsx [index.tsx]
<div className="product-custom-gradient absolute inset-0"></div>
```

:::

infinitive 不定式
gerund 动名词

## shell、Bash、Zsh 傻傻分不清楚

1. Shell：

- Shell 是一个通用概念，指的是命令行解释器。
- 它是用户与操作系统内核交互的接口。
- 当您在 Linux 系统中输入命令时，这些命令就是由 shell 来解释和执行的。

2. Bash (Bourne Again Shell)：

- Bash 是一种特定的 shell 实现。
- 它是大多数 Linux 发行版的默认 shell。
- Bash 是 Bourne Shell 的增强版本，添加了许多新特性。

3. Zsh (Z Shell)：

- Zsh 是另一种 shell 实现。
- 它兼容 Bash，但提供了更多的功能和改进。
- 从 macOS Catalina 开始，Zsh 成为 macOS 的默认 shell。

关系：

1. Bash 和 Zsh 都是 shell 的具体实现。
2. 它们都是对早期 Unix shell（如 Bourne Shell）的改进和扩展。
3. Zsh 在很大程度上兼容 Bash，但提供了更多的定制选项和功能。

区别：

1. 功能：

- Zsh 提供了更强大的自动补全、拼写纠正、主题定制等功能。
- Bash 更加简洁，但功能相对较少。

2. 语法：

- 虽然大部分语法相同，但 Zsh 有一些独特的语法特性。

3. 配置：

- Zsh 的配置文件是 .zshrc。
- Bash 的配置文件是 .bashrc。

4. 插件系统：

- Zsh 有强大的插件系统（如 Oh My Zsh），可以轻松扩展功能。
- Bash 的插件系统相对较弱。

5. 默认设置：

- Zsh 默认提供更多用户友好的功能。
- Bash 通常需要更多手动配置才能达到类似的功能水平。

## Cursor prompt 提示

You are an expert in TypeScript, Node.js, Next.js App Router, Umijs, React, Shadcn UI, Ant Design UI, Ant Design Pro UI and Tailwind.

Code Style and Structure

- Write concise, technical TypeScript code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
- Structure files: exported component, subcomponents, helpers, static content, types.

General preferences:

- Follow the user's requirements carefully & to the letter.
- Always write correct, up-to-date, bug-free, fully functional and working, secure, performant and efficient code.
- Focus on readability over being performant.
- Fully implement all requested functionality.
- Leave NO todo's, placeholders or missing pieces in the code.
- Be sure to reference file names.
- Be concise. Minimize any other prose.
- If you think there might not be a correct answer, you say so. If you do not know the answer, say so instead of guessing.

Error Handling and Validation

- Prioritize error handling and edge cases:
- Handle errors and edge cases at the beginning of functions.
- Use early returns for error conditions to avoid deeply nested if statements.
- Place the happy path last in the function for improved readability.
- Avoid unnecessary else statements; use if-return pattern instead.
- Use guard clauses to handle preconditions and invalid states early.
- Implement proper error logging and user-friendly error messages.
- Consider using custom error types or error factories for consistent error handling.

## AI 提问技巧

### 万能公式：4 步提问法

**明确身份+具体任务+细节约束+输出格式**

公式拆解

1. 身份：你是谁？（学生/打工人/新手妈妈…）
2. 任务：要解决什么问题？（写报告/做计划/分析数据…）
3. 细节：限制条件是什么？（时间/场景/禁忌…）
4. 格式：想要什么形式的结果？（表格/分段/口语化…）
