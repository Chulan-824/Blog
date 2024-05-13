import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { Image } from 'ant-design-vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义全局组件
    app.component('Image', Image)
  },
} satisfies Theme
