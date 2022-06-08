# 文档搭建

所谓: 工欲善其事，必先利其器。不管是前端还是后端，平时工作肯定都少不了跟文档打交道，一个好的文档可以让你在平常的工作学习中有事半功倍的效果。

<NpmBadge packageName="@vuepress/cli" />

## 前言

### 什么人喜欢折腾博客

- 程序员（喜欢写一写技术博客，分享一些问题）
- 设计工作者（需要一个平台展示自己）
- 技术爱好者（不一定是干IT）
- 文艺青年（喜欢写写文章分享给大家）
- 极客（喜欢追求极致，喜欢做一些炫酷吊炸天的网站的异类）  

对于上述几类人群，我们再细分一下，他们能够搭建博客的方式

- 博客平台 (CSDN、博客园、Farbox之类的一站式平台，写好文章网上丢就可以了)
- 纯自己码 (需要超强的技术壁垒)
- 搭建博客的工具 (下面会进行详细说明，目前也是最主流的方式)
  - WordPress
  - Hexo
  - Hugo
  - Vuepress(本文主要说的)

### 简单对比

- WordPress: 第一个是麻烦，学习成本高，第二个必须要搞一个自己域名主机，操作很麻烦，新手门槛高
- Hexo: 好，好，好 ，轻量 、简单 、实用 、方便 —————but 烂大街了，现在随便百度还是谷歌搜一下都是Hexo搭建博客，NexT主题也被用烂大街了，导致搭一个博客一点新意都没，没有那种成就感。(当然你自己能另写主题就算了)
- Hugo: 小众 文档少 优化少 主题少 坑多
- Vuepress: 哈哈哈，比Hugo 文档还少，主题更少 (惊不惊喜，意不意外) ，教程也少，要不然都是重复的。--------but 真心好看，是尤雨溪大神的力作，优化更不要说了，整体风格极简却又非常适合文档阅读，而且流畅，最重要，使用的人少，个性化定制多，只要你会点vue，你的博客只属于你

### 直接看效果

![](/images/img10.png)

## 正式开干

::: warning
- VuePress 需要 Node.js (opens new window)>= 8.6
:::

### 本地搭建

快速进入[Vuepress官网](https://vuepress.vuejs.org/zh/guide/getting-started.html)

1. 创建并进入一个新目录

```bash
mkdir vuepress-starter && cd vuepress-starter
```

2. 使用你喜欢的包管理器进行初始化

```bash
yarn init # npm init -y
```

3. 将 VuePress 安装为本地依赖

```bash
yarn add -D vuepress # npm install -D vuepress
```

4. 创建你的第一篇文档，VuePress 会以 docs 为文档根目录，所以这个 README.md 相当于主页：

```bash
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

5. 在 package.json 中添加一些 scripts

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

6. 在本地启动服务器

```bash
yarn dev # npm run dev
```

VuePress 会在 http://localhost:8080 (opens new window) 启动一个热重载的开发服务器

### 基础配置

在文档目录下创建一个 .vuepress 目录，所有 VuePress 相关的文件都会被放在这里。此时你的项目结构可能是这样:

```js
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```

在 `.vuepress` 文件夹下添加 `config.js`，配置网站的标题和描述，方便 SEO:

```js
module.exports = {
  title: 'vuepress-start',
  description: 'vuepress-start 博客'
}
```

此时界面类似于:

![](/images/img1.png)

### 添加导航栏

我们现在在页首的右上角添加导航栏，修改 `config.js`:

```js
module.exports = {
    title: '...',
    description: '...',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { 
                text: '楚岚的 JavaScript 博客', 
                items: [
                    { text: 'Github', link: 'https://github.com/Chulan-824' },
                ]
            }
        ]
    }
}
```

效果如下:

![](/images/img2.png)

更多的配置参考[Vuepress导航栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E5%AF%BC%E8%88%AA%E6%A0%8F)

### 添加侧边栏

现在我们添加一些 md 文档，目前文档的目录如下:

```bash
├─ docs
│  ├─ README.md
│  └─ .vuepress
│     └─ config.js
|  └─ basic-learning
|  	  └─ 学前必读.md
|  	  └─ css.md
|  	  └─ html.md
|	  
└─ package.json
```

我们在 `config.js` 配置如下:

```js
module.exports = {
    themeConfig: {
        nav: [...],
        sidebar: [
          {
              title: '欢迎学习',
              path: '/basic-learning/学前必读',
              collapsable: false, // 不折叠
              children: [
                  { title: "学前必读", path: "/basic-learning/学前必读" }
              ]
          },
          {
            title: "基础学习",
            path: '/basic-learning/html',
            collapsable: false, // 不折叠
            children: [
              { title: "html", path: "/basic-learning/html" },
              { title: "css", path: "/basic-learning/css" },
            ],
          }
        ]
    }
}
```

效果如下:

![](/images/img3.png)

### 更换主题

现在基本的目录和导航功能已经实现，但如果我还想要加载 loading、切换动画、模式切换（暗黑模式）、返回顶部、评论等功能呢，为了简化开发成本，我们可以直接使用主题，这里使用的主题是 [vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)

现在我们安装 vuepress-theme-reco:

```bash
npm install vuepress-theme-reco --save-dev
# or
yarn add vuepress-theme-reco -D
```

然后在 `config.js` 里引入该主题

```js
module.exports = {
  // ...
  theme: 'reco'
  // ...
} 
```

刷新一下页面，我们会发现一些细节的改变，比如加载时的 loading 动画、以及支持切换暗黑模式:

![](/images/img4.png)

### 添加文章信息

我们可以在每篇文章的 md 文件中添加一些信息修改:

```bash
---
title: html标签学习
author: 楚岚
date: '2022-05-11'
---
```

此时文章的效果如下:

![](/images/img5.png)

### 生成侧边栏

可以将文章的标题目录结构生成在右侧，形成侧边栏

```js
module.exports = {
  //...
  themeConfig: {
    subSidebar: 'auto'
  }
  //...
}
```

此时文章的效果如下:

![](/images/img6.png)


### 修改主题颜色

VuePress 基于 Vue，所以主题色用的是 Vue，但是我们想自定义主题颜色，那如何修改 VuePress 的主题色呢?

你可以创建一个 .vuepress/styles/palette.styl 文件，文件代码如下:

```css
$accentColor = #3178c6
```

此时可以发现主题颜色变了:

![](/images/img7.png)

更多的颜色修改参考 VuePress 的 [palette.styl](https://vuepress.vuejs.org/zh/config/#title)

## 部署GitHub Pages

我们的博客就算是正式的做好了，接下来我们部署到免费的 Github Pages 上。我们在 Github 上新建一个仓库，这里我取得仓库名为：vuepress-start

![](/images/img8.png)

对应，我们需要在 config.js 添加一个 base 路径配置：

```js
module.exports = {
  	// 路径名为 "/<REPO>/" 这里需要跟仓库同名
    base: '/vuepress-start/',
  	//...
}
```

最终的 config.js 文件内容为：

```js
module.exports = {
  // 路径名为 "/<REPO>/" 这里需要跟仓库同名
  base: '/vuepress-start/',
  title: '博客搭建',
  description: 'vuepress-start 博客',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '楚岚的 JavaScript 博客',
        items: [{ text: 'Github', link: 'https://github.com/Chulan-824' }],
      },
    ],
    sidebar: [
      {
        title: '欢迎学习',
        path: '/basic-learning/学前必读',
        collapsable: false, // 不折叠
        children: [{ title: '学前必读', path: '/basic-learning/学前必读' }],
      },
      {
        title: '基础学习',
        path: '/basic-learning/html',
        collapsable: false, // 不折叠
        children: [
          { title: 'html', path: '/basic-learning/html' },
          { title: 'css', path: '/basic-learning/css' },
        ],
      },
    ],
    subSidebar: 'auto',
  },
  theme: 'reco',
}
```

然后我们在项目 vuepress-start 目录下建立一个脚本文件：deploy.sh，注意修改一下对应的用户名和仓库名：

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:Chulan-824/vuepress-start master

cd -
```

同时配置对应脚本

```js
"scripts": {
  "deploy": "bash deploy.sh"
},
```

然后命令行切换到 vuepress-starter 目录下，执行 npm run deploy，就会开始构建，然后提交到远程仓库，注意这里提交到了 master 分支，我们查看下对应仓库分支的代码：

![](/images/img9.png)

我们可以在仓库的 Settings -> Pages 中看到最后的地址：

![](/images/img11.png)

像我最后生成的地址就是: [](https://chulan-824.github.io/vuepress-start/)

## 其他小工具

### wappalyzer

> Wappalyzer 是一款浏览器插件，通过 Wappalyzer 可以识别出网站采用了那种 web 技术。它能够检测出 CMS 和电子商务系统、留言板、javascript 框架，主机面板，分析统计工具和其它的一些 web 系统。
> 效果如下:

![](/images/img12.png)

![](/images/img13.png)

