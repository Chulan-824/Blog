<template>
  <div :id="id" class="mermaid-diagram"></div>
</template>

<script setup lang="ts">
// @ts-expect-error
import { onMounted, watch } from 'vue'
import mermaid from 'mermaid'
import { v4 as uuidv4 } from 'uuid' // 可选，用于生成唯一ID

const props = defineProps({
  diagram: {
    type: String,
    required: true,
  },
})

// 生成唯一ID，防止多个图表冲突
const id = `mermaid-${uuidv4()}`

// 初始化并渲染图表
const initMermaid = async () => {
  try {
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
watch(() => props.diagram, initMermaid, { immediate: false })

// 组件挂载时初始化
onMounted(initMermaid)
</script>

<style scoped>
.mermaid-diagram {
  text-align: center;
}
</style>
