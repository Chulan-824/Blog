import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Blog',
  description: 'A Blog Site',
  base: '/Blog/',
  lang: 'zh-CN',
  locales: {
    root: { label: '简体中文', lang: 'zh-CN' },
  },
  head: [['link', { rel: 'icon', href: '/Blog/my-logo.png' }]],
  themeConfig: {
    logo: '/my-logo.png',
    nav: nav(),
    sidebar: {
      '/javascript/': { base: '/javascript/', items: sidebarJavaScript() },
      '/java/': { base: '/java/', items: sidebarJava() },
      '/go/': { base: '/go/', items: sidebarGo() },
      '/english/': { base: '/english/', items: sidebarEnglish() },
      '/other/': { base: '/other/', items: sidebarOther() },
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      label: '页面导航',
      level: 'deep',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Chulan-824' }],
    // search: {
    //   provider: 'local',
    // },
    search: {
      provider: 'algolia',
      options: {
        appId: '5T1AAMLB5D',
        apiKey: 'e2a623206ff6b0671aaaf5e514c3b286',
        indexName: 'dev_blog',
      },
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  cleanUrls: true,
  metaChunk: true,
  lastUpdated: true,
})

function nav() {
  return [
    { text: 'Home', link: '/' },
    { text: 'JavaScript', link: '/javascript/engineering/module' },
    { text: 'Java', link: '/java/spring-boot/ioc-di' },
    { text: 'Go', link: '/go/go-struct-notes' },
    { text: 'English Grammar', link: '/english/elementary/noun' },
    { text: 'Other', link: '/other/keyboard-shortcuts' },
  ]
}

function sidebarJavaScript() {
  return [
    {
      text: '前端工程化',
      collapsed: false,
      items: [
        { text: '模块化', link: 'engineering/module' },
        { text: '环境变量', link: 'engineering/environment' },
        { text: '语义化版本控制', link: 'engineering/semantic-versioning' },
      ],
    },
    {
      text: 'NextJs',
      collapsed: false,
      items: [{ text: '项目初始化', link: 'next/init' }],
    },
    {
      text: 'React设计原理理念篇',
      collapsed: false,
      items: [
        {
          text: '初识前端框架',
          link: 'react-design-principle/overview/know',
        },
        {
          text: '理念',
          link: 'react-design-principle/overview/react-concept',
        },
      ],
    },
    {
      text: 'React设计原理实现篇',
      collapsed: false,
      items: [
        {
          text: '初始化项目',
          link: 'react-design-principle/realize/init',
        },
        {
          text: '实现 JSX',
          link: 'react-design-principle/realize/jsx',
        },
        {
          text: '实现 Reconciler 架构',
          link: 'react-design-principle/realize/reconciler',
        },
        {
          text: '状态更新机制',
          link: 'react-design-principle/realize/update',
        },
        {
          text: 'vite调试代码',
          link: 'react-design-principle/realize/vite',
        },
        {
          text: '实现Hooks架构',
          link: 'react-design-principle/realize/hooks',
        },
        {
          text: 'jest 测试调试',
          link: 'react-design-principle/realize/jest',
        },
        {
          text: '初探 Update 流程',
          link: 'react-design-principle/realize/explorationUpdate',
        },
        {
          text: '实现事件系统',
          link: 'react-design-principle/realize/event',
        },
        {
          text: 'diff算法',
          link: 'react-design-principle/realize/diff',
        },
        {
          text: 'Fragment',
          link: 'react-design-principle/realize/fragment',
        },
        {
          text: '实现同步调度流程',
          link: 'react-design-principle/realize/lane',
        },
        {
          text: '实现 useEffect',
          link: 'react-design-principle/realize/useEffect',
        },
        {
          text: '实现 noop-renderer',
          link: 'react-design-principle/realize/noopRenderer',
        },
        {
          text: '并发更新原理',
          link: 'react-design-principle/realize/concurrentUpdate',
        },
        {
          text: '实现并发更新',
          link: 'react-design-principle/realize/concurrentUpdateRealize',
        },
      ],
    },
    {
      text: '手写代码',
      collapsed: false,
      items: [
        { text: 'Promise', link: 'hand-write-code/promise/' },
        { text: '数组map', link: 'hand-write-code/map/' },
        { text: '数组reduce', link: 'hand-write-code/reduce/' },
        { text: '数组push', link: 'hand-write-code/push/' },
        { text: '数组pop', link: 'hand-write-code/pop/' },
        { text: '数组splice', link: 'hand-write-code/splice/' },
      ],
    },
    {
      text: 'Git',
      collapsed: false,
      items: [{ text: 'rebase', link: 'git/rebase/' }],
    },
    {
      text: 'Hooks',
      collapsed: false,
      items: [
        { text: 'useMemoizedCallback', link: 'hooks/useMemoizedCallback' },
      ],
    },
    { text: 'Vue设计与实现笔记', link: 'vue/concept/' },
    { text: '计算机网络基础概念', link: 'http/base/' },
    { text: 'js继承', link: 'js/base/inherit' },
    { text: 'ts枚举替代方案', link: 'enum-alternative' },
  ]
}

function sidebarJava() {
  return [
    {
      text: 'Maven',
      collapsed: false,
      link: 'maven',
    },
    {
      text: 'SpringBoot',
      collapsed: false,
      items: [
        { text: 'IOC/DI', link: 'spring-boot/ioc-di' },
        { text: '注解', link: 'spring-boot/annotation' },
        { text: '配置文件', link: 'spring-boot/configuration' },
        { text: 'Lombok', link: 'spring-boot/lombok' },
        { text: 'MySQL', link: 'spring-boot/mysql' },
        { text: 'MongoDB', link: 'spring-boot/mongodb' },
        { text: 'Logback', link: 'spring-boot/logback' },
        { text: 'JWT', link: 'spring-boot/jwt' },
        { text: '拦截器', link: 'spring-boot/interceptor' },
        { text: '事务', link: 'spring-boot/transaction' },
        { text: 'AOP', link: 'spring-boot/aop' },
        { text: 'bean的管理', link: 'spring-boot/bean' },
      ],
    },
    {
      text: 'MyBatis',
      link: 'mybatis',
    },
  ]
}

function sidebarGo() {
  return [
    {
      text: 'Go基础',
      collapsed: false,
      items: [
        { text: 'Go Package', link: 'go-package-notes' },
        { text: 'Go 变量与常量', link: 'go-variable-notes' },
        { text: 'Go 函数', link: 'go-function-notes' },
        { text: 'Go 流程控制', link: 'go-process-control-notes' },
        { text: 'Go 结构体', link: 'go-struct-notes' },
        { text: 'Go 数组与切片', link: 'go-array-notes' },
        { text: 'Go Map', link: 'go-map-notes' },
        { text: 'Go Interface', link: 'go-interface-notes' },
        { text: 'Go Goroutine', link: 'go-goroutine-notes' },
      ],
    },
  ]
}

function sidebarEnglish() {
  return [
    {
      text: '初级语法',
      items: [
        { text: '名词', link: 'elementary/noun' },
        { text: '限定词', link: 'elementary/determiner' },
        { text: '形容词', link: 'elementary/adjective' },
        {
          text: '动词分类（一）：实义动词与（情态）助动词',
          link: 'elementary/verb-category-one',
        },
        {
          text: '动词分类（二）：英语的五种基本句型',
          link: 'elementary/verb-category-two',
        },
        { text: '英文时态', link: 'elementary/english-tenses' },
        { text: '状语', link: 'elementary/adverbial' },
      ],
    },
    { text: '记录', link: 'note' },
  ]
}

function sidebarOther() {
  return [
    {
      text: '快捷键',
      collapsed: false,
      link: 'keyboard-shortcuts',
    },
    {
      text: '随笔问题',
      collapsed: false,
      link: 'problem',
    },
    {
      text: 'Chapter优化',
      collapsed: false,
      link: 'chapter/index',
    },
    {
      text: 'OAuth一键登录',
      collapsed: false,
      link: 'oauth',
    },
    {
      text: '事件命名规则',
      collapsed: false,
      link: 'event-naming-rules',
    },
    {
      text: 'Docker',
      collapsed: false,
      items: [{ text: 'OrbStack', link: 'docker/orbstack' }],
    },
    {
      text: '读书笔记',
      collapsed: false,
      items: [{ text: '如何阅读一本书', link: 'reading/how-to-read-a-book' }],
    },
    // {
    //   text: '制作中心',
    //   collapsed: false,
    //   link: 'production-center',
    // },
  ]
}
