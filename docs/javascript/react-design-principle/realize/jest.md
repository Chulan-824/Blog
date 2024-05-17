# jest 测试调试

使用 jest 调试实现代码包括三部分内容：

- 实现第一个测试工具 test-utils
- 实现测试环境
- 实现 ReactElement 用例

与测试相关的代码都来自 React 仓库，可以先把 React 仓库下载下来：

```shell
git clone git@github.com:facebook/react.git
```

## 实现test-utils

这是用于测试的工具集，来源自[ReactTestUtils.js](https://github.com/facebook/react/blob/main/packages/react-dom/src/test-utils/ReactTestUtils.js)，特点是：使用 ReactDOM 作为宿主环境

题外话：有没有其他测试工具？

有的，当需要测试与 ReactDOM 无关或者其他宿主环境的时候，就需要其他的测试工具

## 实现测试环境

```shell
pnpm i -D -w jest jest-config jest-environment-jsdom
```

- jest 测试框架主题
- jest-config jest 相关的一些默认配置
- jest-environment-jsdom 跑 js 代码默认的宿主环境(dom)

配置文件 ./scripts/jest/jest.config.js

```js
const { defaults } = require('jest-config');

module.exports = {
	...defaults,
	rootDir: process.cwd(),
	modulePathIgnorePatterns: ['<rootDir>/.history'],
	moduleDirectories: [
		// 对于 React ReactDOM
		'dist/node_modules',
		// 对于第三方依赖
		...defaults.moduleDirectories
	],
	testEnvironment: 'jsdom'
};
```

## 实现 ReactElement 用例

来源自[ReactElement-test.js](https://github.com/facebook/react/blob/main/packages/react/src/__tests__/ReactElement-test.js)

为 jest 增加 JSX 解析能力，安装 Babel：

```shell
pnpm i -D -w @babel/core @babel/preset-env @babel/plugin-transform-react-jsx
```

新增babel.config.js：

```js
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {throwIfNamespace: false}
    ]
  ]
}
```



