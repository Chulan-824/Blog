# 语义化版本控制（Semantic Versioning）指南

## 概述

语义化版本控制（SemVer）是一个版本号命名规范，通过版本号来传达代码变更的性质和影响程度。它帮助开发者和用户理解更新的风险级别和兼容性。

## 版本号格式

```
X.Y.Z
主版本号.次版本号.修订版本号
 Major . Minor . Patch
```

### 基本规则

- **递增规则**：版本号只能递增，不能回退
- **格式要求**：必须是非负整数，不能包含前导零
- **发布后不可变**：版本发布后内容不可修改

## 三种版本更新类型

### 🔴 Major（主版本号）- 破坏性更新

**定义**：当你做了不兼容的 API 修改时

**特征**：
- 包含**破坏性变更**（Breaking Changes）
- 旧代码可能无法正常工作
- 需要开发者修改代码来适配
- **高风险**更新

**示例**：
```javascript
// 版本 1.x.x - 旧 API
const user = getUserById(123);

// 版本 2.0.0 - 破坏性变更
const user = await getUserById({ id: 123, include: ['profile'] });
```

**实际案例**：
- React 17.x.x → React 18.0.0
- Vue 2.x.x → Vue 3.0.0
- Angular 15.x.x → Angular 16.0.0

### 🟡 Minor（次版本号）- 功能性更新

**定义**：当你添加了向后兼容的功能时

**特征**：
- 添加**新功能**或 API
- **向后兼容**，旧代码继续工作
- 可能包含新的组件、方法或选项
- **中等风险**更新

**示例**：
```javascript
// 版本 1.5.0 - 现有功能
const data = api.fetchData(url);

// 版本 1.6.0 - 新增功能，旧功能保持
const data = api.fetchData(url);
const dataWithCache = api.fetchDataWithCache(url); // 新增方法
```

**实际案例**：
- React 18.1.0 → React 18.2.0（新增功能）
- Next.js 13.4.0 → Next.js 13.5.0（新增 App Router 功能）

### 🟢 Patch（修订版本号）- 修复性更新

**定义**：当你做了向后兼容的问题修正时

**特征**：
- **Bug 修复**
- **安全补丁**
- **性能优化**
- 不改变任何 API
- **低风险**更新

**示例**：
```javascript
// 版本 1.5.3 - 存在 bug
const result = calculateSum([1, 2, 3]); // 返回错误结果: 7

// 版本 1.5.4 - 修复 bug
const result = calculateSum([1, 2, 3]); // 返回正确结果: 6
```

**实际案例**：
- React 18.2.0 → React 18.2.1（修复内存泄漏）
- lodash 4.17.20 → lodash 4.17.21（安全补丁）

## 版本前缀符号

### ^ (脱字符) - 兼容更新

```json
{
  "dependencies": {
    "react": "^18.2.0"
  }
}
```

**更新范围**：`18.2.0` ≤ 版本 < `19.0.0`

- ✅ **允许**：18.2.1, 18.3.0, 18.9.9
- ❌ **禁止**：19.0.0, 17.x.x

**适用场景**：希望自动获取新功能和 bug 修复

### ~ (波浪号) - 补丁更新

```json
{
  "dependencies": {
    "react": "~18.2.0"
  }
}
```

**更新范围**：`18.2.0` ≤ 版本 < `18.3.0`

- ✅ **允许**：18.2.1, 18.2.9
- ❌ **禁止**：18.3.0, 19.0.0

**适用场景**：只希望获取 bug 修复，避免新功能

### 无前缀 - 精确版本

```json
{
  "dependencies": {
    "react": "18.2.0"
  }
}
```

**更新范围**：只接受 `18.2.0`

**适用场景**：需要完全控制版本，避免任何自动更新

## 项目实例分析

### 依赖更新示例

以下是项目中实际发生的版本更新：

#### 1. Patch 更新示例

```
@tanstack/react-query: 5.59.11 → 5.80.7
                       ↑          ↑
                    相同主版本，只有 Patch 更新
```

**影响评估**：
- ✅ API 完全兼容
- ✅ 只包含 bug 修复和性能优化
- ✅ 无需修改任何代码
- 🔍 **风险等级**：极低

#### 2. Minor 更新示例

```
@nextui-org/react: 2.4.8 → 2.6.11
                   ↑ ↑      ↑
                相同主版本，Minor 版本更新
```

**影响评估**：
- ✅ 向后兼容
- 🆕 可能新增了组件或 props
- 🎨 可能优化了样式或动画
- ⚠️ 建议测试 UI 组件显示
- 🔍 **风险等级**：低

#### 3. 开发依赖更新

```
typescript: 5.x.x → 5.8.3
prettier: 3.3.3 → 3.5.3
eslint: 8.7.0 → 8.34.0
```

**影响评估**：
- ✅ 主要影响开发体验
- ✅ 不影响生产环境
- 🆕 可能支持新语法特性
- 🔍 **风险等级**：极低

## 风险评估矩阵

| 更新类型 | 风险等级 | 兼容性 | 需要测试 | 典型内容 |
|---------|---------|--------|----------|----------|
| **Patch (0.0.X)** | 🟢 低 | 完全兼容 | 简单验证 | Bug修复、安全补丁 |
| **Minor (0.X.0)** | 🟡 中 | 向后兼容 | 功能测试 | 新功能、新API |
| **Major (X.0.0)** | 🔴 高 | 可能不兼容 | 全面测试 | 破坏性变更 |

## 版本管理最佳实践

### 1. 更新策略

**生产依赖**（dependencies）：
- 谨慎更新，充分测试
- 优先 Patch 更新
- Minor 更新需要功能验证
- Major 更新制定迁移计划

**开发依赖**（devDependencies）：
- 相对安全，可定期更新
- 关注新功能和性能改进
- 确保团队工具版本一致

### 2. 锁定文件管理

**package-lock.json / pnpm-lock.yaml**：
- 确保团队使用相同版本
- 避免"在我电脑上能跑"问题
- 生产环境部署一致性

### 3. 更新验证流程

```bash
# 1. 检查当前版本
npm list --depth=0

# 2. 查看可更新包
npm outdated

# 3. 更新特定包
npm update package-name

# 4. 验证更新
npm run build
npm run test
```

### 4. 版本号选择指南

**保守策略**（稳定性优先）：
```json
{
  "dependencies": {
    "react": "~18.2.0",  // 只接受补丁更新
    "lodash": "4.17.21"  // 锁定精确版本
  }
}
```

**积极策略**（新功能优先）：
```json
{
  "dependencies": {
    "react": "^18.2.0",     // 接受兼容更新
    "next": "^13.4.0"       // 获取新功能
  }
}
```

## 常见问题与解决方案

### Q1: 为什么自动更新了这么多包？

**原因**：包管理器在安装新依赖时，会同时更新符合 semver 规则的现有包。

**解决方案**：
```bash
# 避免自动更新
npm install --no-save package-name
pnpm add package-name --frozen-lockfile
```

### Q2: 如何回滚版本？

```bash
# 回滚到特定版本
npm install package-name@1.2.3

# 回滚 lockfile
git checkout HEAD~1 package-lock.json
npm install
```

### Q3: 如何检查破坏性变更？

1. **查看 CHANGELOG**：大多数包会详细记录变更
2. **查看 GitHub Releases**：了解具体修改内容
3. **运行测试**：自动化测试是最好的验证
4. **分阶段更新**：先在开发环境测试

## 相关工具推荐

### 版本管理工具

- **npm-check-updates**：检查和更新依赖
- **depcheck**：检查未使用的依赖
- **audit**：安全漏洞检查

### 自动化工具

- **Dependabot**：自动创建更新 PR
- **Renovate**：更灵活的依赖更新机器人
- **Greenkeeper**：持续依赖更新

## 参考资源

- [Semantic Versioning 官方网站](https://semver.org/)
- [npm semver 计算器](https://semver.npmjs.com/)
- [Node.js 版本管理最佳实践](https://nodejs.org/en/docs/guides/dependencies/)
- [Package.json 字段详解](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)