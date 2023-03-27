# vite调试代码

## 配置

选用 vite 调试代码而不用 webpack 有两点

1. 在开发阶段编译速度快于 webpack
2. vite 插件体系跟 rollup 兼容

[vite强制预编译](https://vitejs.dev/config/dep-optimization-options.html#optimizedeps-force)

根目录下创建 vite 项目：

```shell
pnpm create vite
```

将 vite.config.js 文件加入 scripts 下

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import { resolvePkgPath } from '../rollup/utils';
import path from 'path';

export default defineConfig({
	plugins: [
		react(),
		replace({
			__DEV__: true,
			preventAssignment: true
		})
	],
	resolve: {
		alias: [
			{
				find: 'react',
				replacement: resolvePkgPath('react')
			},
			{
				find: 'react-dom',
				replacement: resolvePkgPath('react-dom')
			},
			{
				find: 'hostConfig',
				replacement: path.resolve(
					resolvePkgPath('react-dom'),
					'./src/hostConfig.ts'
				)
			}
		]
	}
});
```

vite 项目所需启动依赖放入 monorepo 项目依赖中

```json
"devDependencies": {
  ...,
  "typescript": "^4.9.5",
  "@types/react": "^18.0.28",
  "@types/react-dom": "^18.0.11",
  "@vitejs/plugin-react": "^3.1.0",
  "vite": "^4.2.0"
}
```

配置启动脚本

```shell
"demo": "vite serve demos/test --config scripts/vite/vite.config.js --force"
```

--force 保证每次执行 demo 都是预编译，不然第一次执行成功后，会将依赖包缓存

::: tip
- 如果vite热更新失效，可能是因为 `书写的React组件不符合规范`，可以引入 [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) 插件检查不符合规范的地方。
:::

<SideTitle :page="$page" />

