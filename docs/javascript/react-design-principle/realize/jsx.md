<script setup>
import ImgJsx1 from './images/jsx-1.png'
import ImgJsx2 from './images/jsx-2.png'
</script>
# 实现 JSX

## 前言

React项目结构：

- react（宿主环境无关的公用方法）
- react-reconciler（协调器的实现，宿主环境无关）
- 各种宿主环境的包
- shared（公用辅助方法，宿主环境无关）

JSX 属于 react 包

在 packages 目录下创建 react 文件夹，进入文件夹目录 初始化 package.json 

在 package.json 中 main 字段描述的是项目入口文件，对应的是 CommonJS 规范，由于我们打包规范选择的是 rollup，rollup 对应的是 ESM 规范，所以将 main 字段改为 module 

## JSX 转换是什么

[JSX转换 playground](https://babeljs.io/repl#?browsers=defaults&build=&builtIns=false&corejs=3.6&spec=false&loose=false&code_lz=DwEwlgbgfAjATAZmAenNIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react%2Cstage-2&prettier=false&targets=&version=7.19.5&externalPlugins=&assumptions=%7B%7D)

<Image :src="ImgJsx1" width="50%" />
<Image :src="ImgJsx2" width="50%" />

在上述图中，左边输入一段 JSX 代码 经过 babel 编译转换成 右侧 React.createElement/_jsx 方法的调用，这个从左侧到右侧转变的过程叫做 JSX 的转换

为什么两种模式下转换后的结果不一样呢？

可以理解为在 react 17 版本之前，转换结果为 React.createElement，在 17 版本之后转换的结果为 _jsx 

```js
import { jsx as _jsx } from "react/jsx-runtime";

/*#__PURE__*/_jsx("div", {
  children: "123"
});

// 或
/*#__PURE__*/React.createElement("div", null, "123");
```

包括两部分：

- 编译时
- 运行时 jsx 方法或 React.createElement 方法的实现（包括dev、prod两个环境）

编译时由 babel 编译实现，我们来实现运行时，工作量包括：

- 实现jsx方法
- 实现打包流程
- 实现调试打包结果的环境

## 实现 JSX 方法

- jsxDEV 方法（dev 环境）
- jsx 方法（prod 环境）
- React.createElement 方法

## 实现 JSX 打包流程

对应上述两3方法，打包对应文件：

- react/jsx-dev-runtime.js（dev环境）

- react/jsx-rumtime.js（prod环境）

- React

打包流程中需要安装的rollup plugin与node包：

```shell
pnpm i -D -w rimraf rollup-plugin-generate-package-json rollup-plugin-typescript2 @rollup/plugin-commonjs
```

- rimraf 每次打包前删除文件（dist mac os 可以直接使用 rm -rf）
- rollup-plugin-generate-package-json  打包目录下自动生成 package.json 文件
- rollup-plugin-typescript2 打包过程中解析源码中的 typescript 语法
- @rollup/plugin-commonjs 解析 commanjs 规范







