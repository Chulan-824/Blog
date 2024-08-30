<script setup>
import Img1 from './images/environment-1.png'
import Img2 from './images/environment-2.png'
</script>

# 环境变量

## 一、scripts脚本直接写入

适用于简单环境区分

:::code-group

```json [package.json]
"scripts": {
  "dev": "next dev",
  "build:test": "NEXT_APP_ENV=test next build",
  "build:prod": "NEXT_APP_ENV=prod next build",
},
```

```js [next.config.mjs]
const NEXT_APP_ENV = process.env.NEXT_APP_ENV
console.log(
  '%c [ NEXT_APP_ENV ]: ',
  'color: #bf2c9f; background: pink; font-size: 13px;',
  NEXT_APP_ENV
)

const nextConfig = {}

export default nextConfig
```

:::

<Image :src="Img1" />

## 二、环境配置文件

[env-cmd](https://github.com/toddbluhm/env-cmd#readme) 读取不同的配置文件

:::code-group

```json [package.json]
"scripts": {
  "dev": "next dev",
  "build:test": "env-cmd -f .env.test next build",
  "build:prod": "env-cmd -f .env.prod next build"
},
```

```text [.env.test]
NEXT_APP_ENV=test
```

```text [.env.prod]
NEXT_APP_ENV=prod
```

:::

<Image :src="Img2" />

## 补充

[@t3-oss/env-nextjs](https://github.com/t3-oss/t3-env#readme) + [zod](https://github.com/colinhacks/zod)
