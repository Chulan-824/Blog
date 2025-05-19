# 事件命名规则（Event Naming Rules）

## 1. 目的

统一 React 组件开发中的事件处理函数命名，提升代码可读性和团队协作效率。

## 2. 命名规则

### 2.1 onXXX

- 用于组件 props 的回调函数（即父组件传递给子组件的事件）。
- 仅作为"事件声明"或"事件接口"。
- 示例：
  - `onClick`
  - `onChange`
  - `onDownloadSrt`
- 典型用法：
  ```jsx
  <MyComponent onDownloadSrt={handleDownloadSrt} />
  ```

### 2.2 handleXXX

- 用于组件内部的事件处理函数。
- 仅在组件内部声明和使用，不作为 props 传递。
- 负责具体的事件处理逻辑。
- 示例：
  - `handleClick`
  - `handleChange`
  - `handleDownload`
- 典型用法：
  ```jsx
  <Button onClick={handleDownload}>下载</Button>
  ```

## 3. 适用范围

- 适用于所有 React 组件（包括函数组件和类组件）。
- 适用于所有事件类型（如点击、输入、下载等）。

## 4. 其他说明

- 严禁混用 onXXX 和 handleXXX。
- 如需扩展其他事件命名（如 beforeXXX、afterXXX），需另行讨论。
