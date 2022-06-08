module.exports = {
  title: '学习文档',
  description: '楚岚博客',
  base: '/vuepress-start/',
  // base: '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/' },
      { text: '手写代码', link: '/hand-wirte-code/promise/' },
      { text: 'Nodejs', link: '/node/basic/' },
      { text: 'Github推荐', link: '/github/' },
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
          collapsable: false, // 不折叠
        }
      ],
      '/hand-wirte-code/': getSidebarForHandWriteCode(),
      '/node/': [
        {
          title: 'Node基础',
          path: '/node/basic/',
          collapsable: false, // 不折叠
          children: [
            { title: 'Node是什么', path: '/node/basic/' },
          ]
        },
        {
          title: 'Node核心模块',
          path: '/node/core/fs/',
          collapsable: false, // 不折叠
          children: [
            { title: 'path模块', path: '/node/core/path' },
            { title: 'fs模块', path: '/node/core/fs' },
          ]
        }
      ],
      '/github/': [
          {
          title: 'github库推荐',
          path: '/github/',
          collapsable: false,
        },
      ],
    },
  },
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
