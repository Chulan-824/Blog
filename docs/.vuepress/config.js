module.exports = {
  title: '前端知识体系构建',
  description: '楚岚博客',
  base: '/vuepress-start/',
  // base: '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档搭建', link: '/guide/' },
      { text: '前端面试', link: '/interview/html/1/' },
      { text: '前端工程化', link: '/engineering/module/' },
      { text: '手写代码', link: '/hand-wirte-code/promise/' },
      { text: 'React-SSR', link: '/react-ssr/native-ssr/' },
      {
        text: 'Github',
        link: 'https://github.com/Chulan-824'
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '文档搭建',
          path: '/guide/',
          sidebarDepth: -1,
          collapsable: false, // 不折叠
        }
      ],

      '/interview/': getSidebarForInterview(),
      '/engineering/': getSidebarForEngineering(),
      '/hand-wirte-code/': getSidebarForHandWriteCode(),
      '/react-ssr/': getSidebarForReactSSR(),
    },
  },
}

function getSidebarForInterview() {
  return [
    {
      title: 'html',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: [
        "/interview/html/1",
        "/interview/html/2",
      ]
    },
    {
      title: 'css',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: [
        "/interview/css/1",
        "/interview/css/2",
      ]
    }
  ]
}

function getSidebarForEngineering() {
  return [
    {
      title: '前端工程化',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: [
        "/engineering/module/"
      ]
    }
  ]
}

function getSidebarForHandWriteCode() {
  return [
    {
      title: '手写代码',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: [
        "/hand-wirte-code/promise/"
      ]
    }
  ]
}

function getSidebarForReactSSR() {
  return [
    {
      title: 'React-SSR',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: [
        "/react-ssr/native-ssr/"
      ]
    }
  ]
}
