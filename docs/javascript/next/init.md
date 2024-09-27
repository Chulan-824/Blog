# 初始化

## 使用 pnpm 初始化项目

```bash
pnpm create next-app my-next-app
```

<Image src='./images/init-1.png' />

### 代码规范

### Next UI

```bash
pnpm add @nextui-org/react framer-motion
```

创建 `.npmrc` 文件，并添加以下行

```bash
public-hoist-pattern[]=*@nextui-org/*
```

修改 .npmrc 文件后，需要再次运行 pnpm install，以确保依赖项安装正确。

修改 tailwind.config.ts 文件：

```ts {1,9,19,20}
import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
```

添加 NextUIProvider 到 layout.tsx

```javascript {1,13}
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
```

主题切换，安装 next-themes

```bash
pnpm add next-themes
```

### 样式兼容

添加 autoprefixer 插件

```bash
pnpm add -D autoprefixer
```

```mjs {5}
// postcss.config.mjs
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

export default config
```

### 代码规范

#### eslint

```bash
pnpm add -D @typescript-eslint/eslint-plugin eslint-plugin-import eslint-config-prettier @typescript-eslint/parser
```

添加 eslint 配置文件

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': 'error',
    'no-case-declarations': 'off',
    'no-constant-condition': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/no-unescaped-entities': 'off',
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'next*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@nextui-org/*',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'react',
          'next*',
          '@nextui-org',
          '@/**',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
}
```

#### prettier

安装：

```shell
pnpm i -D prettier
```

添加 tailwind 插件

```bash
pnpm add -D prettier-plugin-tailwindcss
```

修改 prettier 配置文件

```js
//.prettierrc.js
module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  useTabs: false,
  plugins: ['prettier-plugin-tailwindcss'],
}
```

```
// .prettierignore
# 依赖目录
node_modules
.pnp
.pnp.js
.yarn

# 构建输出
.next
out
build

# 缓存
.cache

# 测试覆盖率报告
coverage

# 杂项
.DS_Store
*.pem

# 调试日志
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# 本地环境文件
.env*.local

# Vercel 部署文件
.vercel

# TypeScript 构建信息
*.tsbuildinfo
next-env.d.ts

# 其他不需要格式化的文件
*.md
*.yml
*.yaml
*.json
*.lock
```

#### tsconfig.json

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    },
    "verbatimModuleSyntax": true
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "dist/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```
