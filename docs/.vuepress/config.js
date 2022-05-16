/*
 * @Descripttion: 
 * @Author: voanit
 * @Date: 2022-05-13 15:25:25
 * @LastEditors: voanit
 * @LastEditTime: 2022-05-16 15:42:09
 */
/*
 * @Descripttion: 
 * @Author: voanit
 * @Date: 2022-05-13 15:25:25
 * @LastEditors: voanit
 * @LastEditTime: 2022-05-16 15:37:30
 */
/*
 * @Descripttion:
 * @Author: voanit
 * @Date: 2022-05-13 15:25:25
 * @LastEditors: voanit
 * @LastEditTime: 2022-05-16 15:12:32
 */
module.exports = {
  title: '学习文档',
  description: '楚岚博客',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/' },
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
      '/node/': [
        {
          title: 'Node基础',
          path: '/node/basic/',
          collapsable: false, // 不折叠
        },
        {
          title: 'node核心模块',
          path: '/guide/core/fs/',
          collapsable: false, // 不折叠
          children: [
            { title: 'fs模块', path: '/node/core/fs' },
            { title: 'path模块', path: '/node/core/path' },
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
      '/pages/': [
        {
          title: 'css学习',
          path: '/pages/css',
          collapsable: false, // 不折叠
          children: [
            { title: 'css', path: '/pages/css' },
            { title: '学前必读', path: '/pages/学前必读' },
          ],
        },
      ]
    },
  },
}
