module.exports = {
  title: '前端知识体系构建',
  description: '楚岚博客',
  base: '/Chulan-Blog/',
  // base: '/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档搭建', link: '/guide/' },
      { text: 'Js', link: '/js/base/inherit/' },
      { text: '前端面试', link: '/interview/html/1/' },
      { text: '前端工程化', link: '/engineering/module/' },
      { text: '手写代码', link: '/hand-wirte-code/promise/' },
      { text: '计算机网络', link: '/Http/base/' },
      { text: 'Git', link: '/Git/rebase/' },
      { text: 'React-SSR', link: '/react-ssr/native-ssr/' },
      { text: 'React设计原理', link: '/react-design-principle/overview/know/' },
      { text: 'Vue设计与实现笔记', link: '/vue/concept/' },
      { text: '项目优化', link: '/project-optimization/chapter/' },
      {
        text: 'Github',
        link: 'https://github.com/Chulan-824',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '文档搭建',
          path: '/guide/',
          sidebarDepth: -1,
          collapsable: false, // 不折叠
        },
      ],
      '/js/': getSidebarForJs(),
      '/interview/': getSidebarForInterview(),
      '/engineering/': getSidebarForEngineering(),
      '/hand-wirte-code/': getSidebarForHandWriteCode(),
      '/Http/': getSidebarForHttp(),
      '/Git/': getGit(),
      '/react-design-principle/': getReactDesignPrinciple(),
      '/react-ssr/': getSidebarForReactSSR(),
      '/vue/': getSidebarForVue(),
      '/project-optimization/': getProjectOptimization(),
    },
  },
  plugins: {
    '@vuepress/medium-zoom': {
      selector: 'img.zoom-custom-imgs',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16,
      },
    },
  },
}

function getSidebarForJs() {
  return [
    {
      title: 'Js基础',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/js/base/inherit'],
    },
  ]
}

function getSidebarForInterview() {
  return [
    {
      title: 'html',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/interview/html/1', '/interview/html/2'],
    },
    {
      title: 'css',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/interview/css/1', '/interview/css/2', '/interview/css/3'],
    },
  ]
}

function getSidebarForEngineering() {
  return [
    {
      title: '前端工程化',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/engineering/module/'],
    },
  ]
}

function getSidebarForHandWriteCode() {
  return [
    {
      title: '手写代码',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: [
        '/hand-wirte-code/promise/',
        '/hand-wirte-code/map/',
        '/hand-wirte-code/reduce/',
        '/hand-wirte-code/push/',
        '/hand-wirte-code/pop/',
        '/hand-wirte-code/splice/',
      ],
    },
  ]
}

function getSidebarForHttp() {
  return [
    {
      title: '计算机网络',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/Http/base/'],
    },
  ]
}

function getGit() {
  return [
    {
      title: 'rebase合并多次提交',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/Git/rebase/'],
    },
  ]
}

function getReactDesignPrinciple() {
  return [
    {
      title: '理念篇',
      collapsable: false, // 不折叠
      sidebarDepth: 2,
      children: [
        '/react-design-principle/overview/know',
        '/react-design-principle/overview/react-concept',
        '/react-design-principle/overview/render',
      ],
    },
    {
      title: '实现篇',
      collapsable: false, // 不折叠
      sidebarDepth: 2,
      children: [
        '/react-design-principle/realize/init',
        '/react-design-principle/realize/jsx',
        '/react-design-principle/realize/reconciler',
        '/react-design-principle/realize/update',
        '/react-design-principle/realize/vite',
        '/react-design-principle/realize/hooks',
        '/react-design-principle/realize/jest',
        '/react-design-principle/realize/explorationUpdate',
        '/react-design-principle/realize/event',
        '/react-design-principle/realize/diff',
        '/react-design-principle/realize/fragment',
        '/react-design-principle/realize/lane',
      ],
    },
  ]
}

function getSidebarForReactSSR() {
  return [
    {
      title: 'React-SSR',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/react-ssr/native-ssr/'],
    },
  ]
}

function getSidebarForVue() {
  return [
    {
      title: 'Vue',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/vue/concept/'],
    },
  ]
}

function getProjectOptimization() {
  return [
    {
      title: '项目优化',
      collapsable: false, // 不折叠
      sidebarDepth: 0,
      children: ['/project-optimization/chapter/'],
    },
  ]
}
