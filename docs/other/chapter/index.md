<script setup>
import ImgEmoji1 from './images/emoji1.png'
import ImgEmoji2 from './images/emoji2.png'
import ImgEmoji3 from './images/emoji3.png'
import ImgEmoji4 from './images/emoji4.png'
import ImgEmoji5 from './images/emoji5.png'
import ImgEmoji6 from './images/emoji6.gif'
import ImgGif1 from './images/1.gif'

import Img1 from './images/1.png'
import Img2 from './images/2.png'
import Img3 from './images/3.png'
import Img4 from './images/4.png'
import Img5 from './images/5.png'
import Img6 from './images/6.png'
import Img7 from './images/7.png'
import Img8 from './images/8.png'
import Img9 from './images/9.png'
import Img10 from './images/10.png'
import Img11 from './images/11.png'
import Img12 from './images/12.png'
import Img13 from './images/13.png'
import Img14 from './images/14.png'
import Img15 from './images/15.png'
import Img16 from './images/16.png'
import Img17 from './images/17.png'
import Img18 from './images/18.png'
import Img19 from './images/19.png'
import Img20 from './images/20.png'
import Img21 from './images/21.png'
import Img22 from './images/22.png'
import Img23 from './images/23.png'
import Img24 from './images/24.png'
import Img25 from './images/25.png'
import Img26 from './images/26.png'
import Img27 from './images/27.png'
import Img28 from './images/28.png'
import Img29 from './images/29.png'
import Img30 from './images/30.png'
import Img31 from './images/31.png'
import Img32 from './images/32.png'
import Img33 from './images/33.png'
import Img34 from './images/34.png'
import Img35 from './images/35.png'
import Img36 from './images/36.png'
import Img37 from './images/37.png'
import Img38 from './images/38.png'
import Img39 from './images/39.png'
import Img40 from './images/40.png'
import Img41 from './images/41.png'
import Img42 from './images/42.png'
import Img43 from './images/43.png'
import Img44 from './images/44.png'
import Img45 from './images/45.png'
import Img46 from './images/46.png'
import Img47 from './images/47.png'
import Img48 from './images/48.png'
import Img49 from './images/49.png'
import Img50 from './images/50.png'
import Img51 from './images/51.png'
import Img52 from './images/52.png'
import Img53 from './images/53.png'
import Img54 from './images/54.png'
import Img55 from './images/55.png'
</script>

# Chapter 项目优化

## ☀️ 前言

以前比较喜欢关注 `clean code` 方面的规范，总觉得自己的代码还有可以优化的地方，想让自己的代码跟大佬们的代码一样漂亮，所以在代码规范方面有这偏执的爱，所以从入职 `Maple Story Studio` 以来对接手的项目会有一些自己的一些习惯的修改，下面是我总结的一些我觉得好用的规范

<Image :src="ImgEmoji1" />

## 🔗 Git提交

我刚接手项目的时候，chapter master 分支提交记录是这样的

<Image :src="Img1" width="50%" />
<Image :src="Img2" width="50%" />

#### 问题

- 提交信息不规范

#### 优化

后面再往上找了一下git提交规范 大致可以分为以下场景

- init 初始提交
- feat 增加新功能
- fix 修复bug
- ui 更新ui
- deploy 部署
- docs 修改文档

然后应用到项目中

<Image :src="Img3" width="50%" />
<Image :src="Img4" width="50%" />

扩展:

[commitizen + husky 规范git提交信息](https://juejin.cn/post/6844904025868271629#heading-3)

[前端工程化实践 - 多人开发分支管理、Git记录提交规范（二）](https://juejin.cn/post/6975811088818372615#heading-14)

[conventional commit types](https://github.com/commitizen/conventional-commit-types/blob/master/index.json)

## 📂 入口模块化

<Image :src="ImgGif1" width="50%"/>

这是刚拿到项目 page 目录的文件夹，一共 90 个文件夹和 7个文件，再看看项目的导航

<Image :src="Img5" width="20%" />

一级导航算下来也只有 17 个，正常的话除去入口文件全局样式，一级目录文件夹应该也是 17 个，做到导航和文件夹对应

例如

```js
// |-- Mall                    // 商城配置
// |   |-- Components          // 商城配置导航下公共组件
// |   |-- GoodsImageManage    // 商品图片管理
// |   |   |--Component        // 商品图片管理模块的组件
// |   |   |--index.jsx        // 入口文件
// |   |   |--index.less       // 入口文件样式
```

比如原先的商城配置导航下，目录是这样的

<Image :src="Img6"  />

#### 问题

1. 命名并不见名知意
2. 同级导航下的菜单并没有统一维护，寻找起来比较麻烦
3. 文件内结构混乱，组件与入口并未完全

#### 优化

经过简单优化后的代码结构是这样的

<Image :src="Img7"  />

扩展:

[Vue风格指南](https://v2.cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)

## ✍️ 接口模块化

以前的接口设计是这样的

<Image :src="Img8"  />
<Image :src="Img9"  width="60%" />

#### 问题

1. 接口文件并没有对照一级导航或者二级导航
2. 没有入口文件统一，如果需要调用不同模块接口，需要多次导入
3. 接口代码硬编码

#### 优化

<Image :src="Img10" width="30%"  />
<Image :src="Img11"  width="30%" />
<Image :src="Img12"  width="30%" />

1. 创建接口入口文件，根据一级导航区分不同模块接口，然后通过入口文件汇总导出，方便使用
2. 接口地址常量化，方便维护

```js
// 这样就可以直接从入口文件导入所需要的接口
import { A, B, C } from '@/services'

// 不做汇总的的话
import { A } from '@/services/module-A'
import { B } from '@/services/module-B'
import { C } from '@/services/module-C'
```

扩展：

[react work tag](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactWorkTags.js)

[react 元素类型的符号](https://github.com/facebook/react/blob/main/packages/shared/ReactSymbols.js)

<Image :src="ImgEmoji2"  width="30%" />

## 👻代码细节

### 增-引入文件

有时候打开新的文件，里面的 import 就是一大坨，多的还有几十行，外部内部组件，库文件，绝对路径相对路径，样式等等都掺杂在一起，看着极其难受，作为处女座，洁癖这个特质毫不例外也带到了代码中，决心好好整理这一块

这是某弹窗表单组件代码，如下

<Image :src="Img13"  width="40%" />

#### 问题

1. 引入顺序混乱
2. 有的引用并没有使用，也没有提示

#### 优化

1. eslint 增加 `no-unused-vars` 规则检测引入未使用文件
2. 使用 `eslint-plugin-import` 插件，配置规则对引入文件排序分类

<Image :src="Img14"  width="40%" />

相关 .eslintrc.js 代码如下

```js
module.exports = {
  plugins: ['import'],
  rules: {
    'no-unused-vars': 2,
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', '@ant-design', 'umi', '@/**'],
        'newlines-between': 'always',
      },
    ],
  },
}
```

扩展：

[eslint-plugin-import](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md)

[eslint-plugin-import 真香](https://juejin.cn/post/7101703726733361183)

<Image :src="ImgEmoji3"  width="30%" />

### 删-注释、不必要console

#### 注释

项目中通常会有大段大段以前逻辑实现的注释，可能是方便自己看以前的逻辑，也可能是防止产品经理需求反复横跳，秀你一脸，经常需求需求改着改着还是觉得上一个需求最好。虽然直接注释代码之后解注释很便捷，但是如果是做过的饿需求再次取消的话，一般很少会有在投入的现象。所以这里主要还是针对以前发布过的功能，现在由于种种原因不需要这个功能了，那么可以直接在代码中删除。

比如下面还是段功能逻辑代码

<Image :src="Img15" width="30%" />

几千行代码，本来上下翻滚维护起来就比较麻烦了，中间还夹杂着几百行注释，完全是加重开发人员在开发维护时候心智负担。如果需要重新实现功能完全可以在 git 提交记录里面查看需要的代码

再就是一些没有意义的注释，比如

<Image :src="Img16" width="30%" />
<Image :src="Img17" width="30%" />
<Image :src="Img18" width="30%" />

#### 引入文件或依赖

有很多引入的文件并没有使用，利用前面讲到的eslint规则，对没有使用的引入进行删除，还有就是错误引用或者已经注释的引用，比如

<Image :src="Img19" width="30%" />
<Image :src="Img20" width="30%" />
<Image :src="Img21" width="30%" />

<Image :src="ImgEmoji4" width="30%"/>

### 改-代码细节

#### 函数简化

下面表单提交的方法将近500行，显然这是一个 “屎山”，出现的问题如下图

<Image :src="Img22" width="30%" />
<Image :src="Img23" width="30%" />
<Image :src="Img24" width="30%" />
<Image :src="Img25" width="30%" />

优化思路：

1. 去除空字段用循环替代 `hard code`
2. 共同数据单独提练到一起
3. 针对不同活动类型做出的数据处理用喊出解耦出去，用函数替代

经过优化后代码结构是这样的：

<Image :src="Img26" width="30%" />

#### 返回值

<Image :src="Img27" width="30%" />
<Image :src="Img28" width="30%" />
<Image :src="Img29" width="30%" />
<Image :src="Img30" width="30%" />
<Image :src="Img31" width="30%" />
<Image :src="Img32" width="30%" />

#### 策略模式

<Image :src="Img33" width="30%" />
<Image :src="Img34" width="30%" />
<Image :src="Img35" width="30%" />
<Image :src="Img36" width="30%" />

#### 条件判断

<Image :src="Img37" width="30%" />
<Image :src="Img38" width="30%" />
<Image :src="Img39" width="30%" />

#### 组件封装

<Image :src="Img40" width="30%" />
<Image :src="Img41" width="30%" />
<Image :src="Img42" width="30%" />

<Image :src="ImgEmoji5" width="30%" />

### 查

#### 接口调用

<Image :src="Img43" width="45%" />
<Image :src="Img44" width="45%" />

还有一些数组数据，是有接口返回的，不知道为什么有的代码是直接写死在前端的，导致新增一个类型的时候需要前端在去更新，这种情况直接取接口的就可以了

## 总结

- git提交
  - 详细的提交可以让自己和后续维护人员看清楚每次需求更改的模块
  - 可以使用 commitizen + husky 规范git提交信息
- 入口模块化
  - 统一格式-大驼峰格式
  - 模块一一对应，方便查找
  - 组件命名策略优化，排序查找更方便
- 接口模块化
  - 采用 index 入口文件归总模式，方便跨文件接口调用
  - 常量定义接口，方便后续维护
- 代码细节
  - 引入文件
    - 使用 eslint 内置规格和插件规范导入格式和顺序
    - 删除没有使用的导入
  - 删除不必要代码
    - 不重要注释
    - 以前功能注释
    - 重复代码
  - 代码简化
    - 函数逻辑简化（尽量做到工具函数为纯函数，逻辑函数一个只做一件事）
    - 返回值（提前 return、箭头函数单行逻辑直接 return、组件无逻辑代码直接简写 return 等）
    - 策略模式（多项重复配置采用对象、或者 map 映射）
    - 条件判断（善用数组方法、复杂条件单独定义，方便阅读和复用）
    - 组件封装（粒度、业务功能等方向考虑）
    - 避免重复的接口调用（减少资源浪费）

经过之前的一些优化，删除代码也有个2-3万行左右，打包速度快乐那么 4% 左右 😅

<Image :src="Img53" width="30%" />
<Image :src="Img53" width="30%" />
<Image :src="Img55" width="30%" />

## 后续优化方向

#### 控制台报错

<Image :src="Img45" width="30%" />
<Image :src="Img46" width="30%" />
<Image :src="Img46" width="30%" />

#### 浏览器打印

<Image :src="Img48"  />

#### 大文件解耦

<Image :src="Img49"  />

#### 类似组件抽象封装

<Image :src="Img50" width="30%" />
<Image :src="Img51" width="30%" />
<Image :src="Img52" width="30%" />

<Image :src="ImgEmoji6" width="30%" />

<SideTitle :page="$page" />
