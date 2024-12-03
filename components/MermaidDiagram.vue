<template>
  <div :id="id" class="mermaid-diagram"></div>
</template>

<script setup lang="ts">
// @ts-expect-error
import { onMounted, watch, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  diagram: {
    type: String,
    required: true,
  },
})

// 生成唯一ID，防止多个图表冲突
const id = `mermaid-${uuidv4()}`
const isClient = ref(false)

// 初始化并渲染图表
const initMermaid = async () => {
  if (!isClient.value) return

  try {
    // 动态导入 mermaid，确保只在客户端加载
    const { default: mermaid } = await import('mermaid')
    
    // 初始化配置
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      // 适配深色模式
      themeVariables: {
        darkMode: document.documentElement.classList.contains('dark'),
      },
    })

    // 清空容器
    const element = document.getElementById(id)
    if (element) {
      element.innerHTML = props.diagram
      await mermaid.run({
        nodes: [element],
      })
    }
  } catch (error) {
    console.error('Mermaid 渲染错误:', error)
  }
}

// 监听输入变化
watch(() => props.diagram, initMermaid)

// 组件挂载时初始化
onMounted(() => {
  isClient.value = true
  initMermaid()
})
</script>

<style scoped>
.mermaid-diagram {
  text-align: center;
}
</style>
