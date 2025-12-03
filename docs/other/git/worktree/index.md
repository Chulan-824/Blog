# Git Worktree

## 目录管理最佳实践

### 推荐的目录组织结构

Git Worktree 最推荐的目录组织方式是**在主仓库同级创建专用目录**,保持清晰的结构分离:

```bash
~/Projects/
├── my-app/                    # 主仓库(始终保持在 main 分支)
│   ├── .git/                  # 唯一的 Git 数据库(共享)
│   ├── src/
│   └── package.json
│
└── my-app-worktrees/          # Worktree 专用管理目录
    ├── feature-payment/       # 支付功能开发
    ├── feature-login/         # 登录功能开发
    ├── bugfix-security/       # 安全漏洞修复
    └── integration-test/      # 联调测试环境
```

### 标准创建流程

#### 初次设置

```bash
# 1. 进入主仓库
cd ~/Projects/my-app

# 2. 创建 worktree 专用目录(只需要一次)
mkdir ../my-app-worktrees

# 3. 创建第一个 worktree
git worktree add ../my-app-worktrees/feature-payment -b feature-payment

# 4. 验证创建
git worktree list
# /Users/yijunjie/Projects/my-app                     abc123 [main]
# /Users/yijunjie/Projects/my-app-worktrees/feature-payment  def456 [feature-payment]
```

#### 日常创建命令

```bash
# 从主仓库创建新 worktree
cd ~/Projects/my-app

# 创建功能分支的 worktree
git worktree add ../my-app-worktrees/<分支名> -b <分支名>

# 实际示例
git worktree add ../my-app-worktrees/feature-login -b feature-login
git worktree add ../my-app-worktrees/bugfix-auth -b bugfix-auth
```

#### 基于现有分支创建

```bash
# 如果远程已有分支
git fetch origin
git worktree add ../my-app-worktrees/feature-existing feature-existing

# 如果本地已有分支
git worktree add ../my-app-worktrees/hotfix-urgent hotfix-urgent
```

### 目录命名规范

采用统一的命名规范便于团队协作和自动化脚本:

```bash
# 功能开发
feature-<功能名称>
feature-payment
feature-user-profile
feature-chat-system

# Bug 修复
bugfix-<问题描述>
bugfix-login-error
bugfix-memory-leak

# 热修复
hotfix-<紧急问题>
hotfix-security-patch
hotfix-critical-bug

# 实验性功能
experiment-<实验名称>
experiment-new-arch
experiment-performance

# 联调测试
integration-test
integration-<模块组合>
integration-frontend-backend
```

### 完整实战示例

```bash
# 场景:需要同时开发三个功能

# 准备工作
cd ~/Projects/my-app
git checkout main
git pull origin main

# 创建功能 A:支付系统
git worktree add ../my-app-worktrees/feature-payment -b feature-payment
cd ../my-app-worktrees/feature-payment
npm install
code .  # 在 VS Code 中打开

# 创建功能 B:用户认证
cd ~/Projects/my-app
git worktree add ../my-app-worktrees/feature-auth -b feature-auth
cd ../my-app-worktrees/feature-auth
npm install
code .  # 在另一个 VS Code 窗口打开

# 创建功能 C:数据分析
cd ~/Projects/my-app
git worktree add ../my-app-worktrees/feature-analytics -b feature-analytics
cd ../my-app-worktrees/feature-analytics
npm install
code .  # 在第三个 VS Code 窗口打开

# 现在可以在三个窗口中并行开发
# 每个功能完全独立,互不干扰
```

### 目录管理脚本

创建便捷的管理脚本:

```bash
# 保存为 ~/bin/worktree-create.sh
#!/bin/bash

PROJECT_ROOT=~/Projects/my-app
WORKTREE_DIR=~/Projects/my-app-worktrees

if [ -z "$1" ]; then
    echo "用法: worktree-create.sh <分支名称> [基础分支]"
    echo "示例: worktree-create.sh feature-payment"
    echo "      worktree-create.sh bugfix-auth main"
    exit 1
fi

BRANCH_NAME=$1
BASE_BRANCH=${2:-main}

echo "📁 创建 worktree: $BRANCH_NAME"
echo "📍 基于分支: $BASE_BRANCH"

cd $PROJECT_ROOT
git worktree add $WORKTREE_DIR/$BRANCH_NAME -b $BRANCH_NAME $BASE_BRANCH

echo "✅ Worktree 创建成功!"
echo "📂 路径: $WORKTREE_DIR/$BRANCH_NAME"
echo "🚀 使用: cd $WORKTREE_DIR/$BRANCH_NAME"
```

使用脚本:

```bash
# 赋予执行权限
chmod +x ~/bin/worktree-create.sh

# 创建 worktree
worktree-create.sh feature-payment
worktree-create.sh bugfix-auth main
```

---

## 多目录联调最佳实践

### 联调场景分析

在实际开发中,常见的联调需求包括:

- **前后端联调**:前端分支 + 后端 API 分支

- **多模块集成**:支付模块 + 订单模块 + 通知模块

- **功能依赖测试**:新功能依赖其他正在开发的功能

- **兼容性验证**:多个功能同时上线前的集成测试

### 推荐的联调方式:专门联调 Worktree

这是最规范和安全的联调方式,创建独立的集成测试环境。

#### 完整流程

```bash
# Step 1: 创建联调专用 worktree
cd ~/Projects/my-app
git worktree add ../my-app-worktrees/integration-test -b integration-test

# Step 2: 进入联调环境
cd ../my-app-worktrees/integration-test

# Step 3: 合并需要联调的功能分支
git merge feature-payment
git merge feature-login
git merge feature-notifications

# Step 4: 安装依赖(如果有变化)
npm install

# Step 5: 启动服务进行联调
npm run dev

# Step 6: 进行功能测试
# 测试支付 + 登录 + 通知的完整流程

# Step 7: 发现问题,在原 worktree 中修复
cd ../feature-payment
# 修改代码
git add .
git commit -m "fix: payment integration issue"

# Step 8: 在联调环境中更新
cd ../integration-test
git merge feature-payment
npm run dev  # 重新测试

# Step 9: 联调通过,清理环境
cd ~/Projects/my-app
git worktree remove ../my-app-worktrees/integration-test
git branch -D integration-test
```

#### 前后端联调实战

```bash
# 场景:前端(feature-ui)和后端 API(feature-api)需要联调

# 1. 创建联调环境
cd ~/Projects/my-app
git worktree add ../my-app-worktrees/integration-fullstack -b integration-fullstack

# 2. 合并前后端分支
cd ../my-app-worktrees/integration-fullstack
git merge feature-ui
git merge feature-api

# 3. 安装前后端依赖
npm install          # 后端依赖
cd client && npm install  # 前端依赖

# 4. 启动服务
# 终端 1:启动后端
npm run server

# 终端 2:启动前端
npm run client

# 5. 测试前后端交互
# 访问 http://localhost:3000
# 测试 API 调用:curl http://localhost:8080/api/users

# 6. 发现前端 bug,回到前端 worktree 修复
cd ~/Projects/my-app-worktrees/feature-ui
# 修改代码
git commit -am "fix: ui component bug"

# 7. 在联调环境中更新前端代码
cd ../integration-fullstack
git merge feature-ui
cd client && npm install  # 重新安装依赖
cd .. && npm run client   # 重启前端

# 8. 继续测试直到通过
```

### 联调冲突处理

在联调过程中遇到合并冲突的标准处理流程:

```bash
# 在 integration-test worktree 中合并时遇到冲突
cd ~/Projects/my-app-worktrees/integration-test

git merge feature-payment  # ✅ 成功
git merge feature-login    # ❌ 冲突!

# CONFLICT (content): Merge conflict in src/auth.js
# Automatic merge failed; fix conflicts and then commit the result.

# 查看冲突文件
git status
# You have unmerged paths.
# Unmerged paths:
#   both modified:   src/auth.js

# 打开文件解决冲突
code src/auth.js

# 文件内容示例:
# <<<<<<< HEAD
# // Payment authentication
# function validatePayment() { ... }
# =======
# // Login authentication
# function validateLogin() { ... }
# >>>>>>> feature-login

# 手动解决冲突,保留两者
# // Payment authentication
# function validatePayment() { ... }
#
# // Login authentication
# function validateLogin() { ... }

# 标记冲突已解决
git add src/auth.js

# 完成合并
git commit -m "chore: resolve merge conflicts for integration test"

# 继续联调测试
npm run dev
```

### 自动化联调脚本

创建自动化脚本简化联调流程:

```bash
# 保存为 scripts/integration-test.sh
#!/bin/bash

# 配置
MAIN_REPO=~/Projects/my-app
WORKTREE_DIR=~/Projects/my-app-worktrees
INTEGRATION_NAME=integration-test

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 创建联调环境...${NC}"

# 检查是否已存在
if [ -d "$WORKTREE_DIR/$INTEGRATION_NAME" ]; then
    echo -e "${RED}❌ 联调环境已存在,请先清理${NC}"
    echo "运行: git worktree remove $WORKTREE_DIR/$INTEGRATION_NAME"
    exit 1
fi

# 创建 worktree
cd $MAIN_REPO
git worktree add $WORKTREE_DIR/$INTEGRATION_NAME -b $INTEGRATION_NAME

cd $WORKTREE_DIR/$INTEGRATION_NAME

# 合并指定的分支(从参数获取)
echo -e "${BLUE}🔀 合并功能分支...${NC}"
for branch in "$@"; do
    echo -e "${GREEN}  合并: $branch${NC}"
    git merge $branch || {
        echo -e "${RED}❌ 合并 $branch 失败,请手动解决冲突${NC}"
        exit 1
    }
done

# 安装依赖
echo -e "${BLUE}📦 安装依赖...${NC}"
npm install

# 启动服务
echo -e "${GREEN}✅ 联调环境准备完成!${NC}"
echo -e "${BLUE}📂 路径: $WORKTREE_DIR/$INTEGRATION_NAME${NC}"
echo -e "${BLUE}🚀 启动服务: npm run dev${NC}"
echo ""
echo "清理命令:"
echo "  cd $MAIN_REPO"
echo "  git worktree remove $WORKTREE_DIR/$INTEGRATION_NAME"
echo "  git branch -D $INTEGRATION_NAME"
```

使用脚本:

```bash
# 赋予执行权限
chmod +x scripts/integration-test.sh

# 创建联调环境并合并指定分支
./scripts/integration-test.sh feature-payment feature-login feature-notifications

# 输出:
# 🔧 创建联调环境...
# 🔀 合并功能分支...
#   合并: feature-payment
#   合并: feature-login
#   合并: feature-notifications
# 📦 安装依赖...
# ✅ 联调环境准备完成!
# 📂 路径: ~/Projects/my-app-worktrees/integration-test
# 🚀 启动服务: npm run dev
```

### 联调清理脚本

```bash
# 保存为 scripts/clean-integration.sh
#!/bin/bash

MAIN_REPO=~/Projects/my-app
WORKTREE_DIR=~/Projects/my-app-worktrees
INTEGRATION_NAME=integration-test

echo "🗑️  清理联调环境..."

cd $MAIN_REPO

# 删除 worktree
git worktree remove $WORKTREE_DIR/$INTEGRATION_NAME 2>/dev/null

# 删除分支
git branch -D $INTEGRATION_NAME 2>/dev/null

echo "✅ 清理完成!"
```

---

## 完整工作流程

### 标准开发流程

```bash
# === 阶段 1:准备工作 ===

# 1. 更新主仓库
cd ~/Projects/my-app
git checkout main
git pull origin main

# 2. 创建功能分支的 worktree
git worktree add ../my-app-worktrees/feature-payment -b feature-payment

# 3. 进入工作目录开始开发
cd ../my-app-worktrees/feature-payment
npm install
code .

# === 阶段 2:开发提交 ===

# 4. 开发功能
# 编写代码...

# 5. 提交代码
git add .
git commit -m "feat: add payment module"

# 6. 推送到远程
git push -u origin feature-payment

# === 阶段 3:联调测试 ===

# 7. 需要与其他功能联调
cd ~/Projects/my-app
./scripts/integration-test.sh feature-payment feature-login

# 8. 在联调环境测试
cd ../my-app-worktrees/integration-test
npm run dev
# 进行集成测试...

# 9. 发现问题,回到功能 worktree 修复
cd ../feature-payment
# 修改代码
git commit -am "fix: payment integration bug"
git push

# 10. 在联调环境更新代码
cd ../integration-test
git merge feature-payment
npm run dev  # 重新测试

# === 阶段 4:合并主线 ===

# 11. 联调通过,合并到 main
cd ~/Projects/my-app
git checkout main
git pull origin main
git merge feature-payment

# 12. 解决可能的冲突
# 如果有冲突,按照冲突处理流程解决

# 13. 推送到远程
git push origin main

# === 阶段 5:清理 ===

# 14. 删除 worktree
git worktree remove ../my-app-worktrees/feature-payment

# 15. 删除本地分支
git branch -d feature-payment

# 16. 删除远程分支
git push origin --delete feature-payment

# 17. 清理联调环境
./scripts/clean-integration.sh
```

### 多人协作流程

```bash
# 场景:团队成员同时开发多个功能

# === 成员 A:开发支付功能 ===
cd ~/Projects/my-app
git worktree add ../my-app-worktrees/feature-payment -b feature-payment
cd ../my-app-worktrees/feature-payment
# 开发...
git push -u origin feature-payment

# === 成员 B:开发登录功能 ===
cd ~/Projects/my-app
git worktree add ../my-app-worktrees/feature-login -b feature-login
cd ../my-app-worktrees/feature-login
# 开发...
git push -u origin feature-login

# === 成员 C:拉取两个功能进行联调 ===
cd ~/Projects/my-app
git fetch origin

# 创建联调环境
git worktree add ../my-app-worktrees/integration-fullstack -b integration-fullstack

cd ../my-app-worktrees/integration-fullstack
git merge origin/feature-payment
git merge origin/feature-login

# 运行联调测试
npm install
npm run dev

# === 发现问题,反馈给对应成员 ===
# 成员 A 修复支付问题
cd ../feature-payment
git pull origin feature-payment
# 修复...
git push

# === 成员 C 重新测试 ===
cd ../integration-fullstack
git fetch origin
git merge origin/feature-payment
npm run dev
```

### 紧急修复流程

```bash
# 场景:正在开发功能,突然需要修复线上 bug

# 1. 当前正在 feature-payment worktree 开发
cd ~/Projects/my-app-worktrees/feature-payment
# 代码未提交,保持原样即可

# 2. 新建 hotfix worktree 修复 bug
cd ~/Projects/my-app
git worktree add ../my-app-worktrees/hotfix-urgent -b hotfix-urgent

# 3. 在 hotfix worktree 中修复
cd ../my-app-worktrees/hotfix-urgent
# 修复 bug...
git commit -am "hotfix: fix critical security issue"
git push -u origin hotfix-urgent

# 4. 立即合并到 main
cd ~/Projects/my-app
git checkout main
git merge hotfix-urgent
git push

# 5. 清理 hotfix worktree
git worktree remove ../my-app-worktrees/hotfix-urgent
git branch -d hotfix-urgent

# 6. 回到功能开发
cd ../my-app-worktrees/feature-payment
# 继续之前的工作,代码完好无损

# 7. 将 hotfix 合并到功能分支(避免冲突)
git fetch origin
git merge origin/main
```

---

## 实用命令速查

### Worktree 管理命令

```bash
# 列出所有 worktree
git worktree list
git worktree list --porcelain  # 详细信息

# 创建 worktree
git worktree add <路径> -b <新分支名>
git worktree add <路径> <已有分支名>

# 删除 worktree
git worktree remove <路径>
git worktree remove <路径> --force  # 强制删除(有未提交修改)

# 清理陈旧的 worktree 信息
git worktree prune

# 锁定/解锁 worktree(防止误删)
git worktree lock <路径>
git worktree unlock <路径>
```

### 目录管理命令

```bash
# 查看当前所在 worktree
git rev-parse --show-toplevel

# 查看当前分支
git branch --show-current

# 切换到其他 worktree 目录
cd $(git worktree list | grep <分支名> | awk '{print $1}')

# 批量删除所有 worktree
git worktree list --porcelain | grep "worktree" | cut -d' ' -f2 | xargs -I {} git worktree remove {}
```

### 联调相关命令

```bash
# 在联调 worktree 中合并多个分支
git merge <分支1> <分支2> <分支3>

# 查看合并了哪些分支
git log --oneline --graph --all

# 查看当前分支与其他分支的差异
git diff <分支名>

# 回滚合并(如果联调失败)
git reset --hard HEAD~<提交数>

# 重新开始联调
git reset --hard origin/main
git merge <分支1> <分支2>
```

### 分支操作命令

```bash
# 查看所有分支
git branch -a

# 删除本地分支
git branch -d <分支名>      # 安全删除(已合并)
git branch -D <分支名>      # 强制删除(未合并)

# 删除远程分支
git push origin --delete <分支名>

# 重命名分支
git branch -m <旧名> <新名>

# 查看分支关联
git branch -vv
```

### 实用脚本命令

```bash
# 快速创建 worktree(添加到 ~/.zshrc 或 ~/.bashrc)
function wt-add() {
    local branch=$1
    local worktree_dir=../my-app-worktrees
    git worktree add $worktree_dir/$branch -b $branch
    cd $worktree_dir/$branch
}

# 快速删除 worktree
function wt-remove() {
    local branch=$1
    git worktree remove ../my-app-worktrees/$branch
    git branch -D $branch
}

# 快速列出 worktree
function wt-list() {
    git worktree list | column -t
}

# 快速进入 worktree
function wt-cd() {
    local branch=$1
    cd ../my-app-worktrees/$branch
}

# 使用示例
wt-add feature-payment      # 创建并进入
wt-cd feature-payment       # 进入已有 worktree
wt-list                     # 列出所有 worktree
wt-remove feature-payment   # 删除 worktree
```

---

## 最佳实践总结

### 目录管理原则

1. **统一管理**:所有 worktree 放在专用目录 `my-app-worktrees/`

2. **命名规范**:使用 `feature-`、`bugfix-`、`hotfix-` 等前缀

3. **保持整洁**:及时清理已完成的 worktree

4. **避免嵌套**:不要在主仓库内创建 worktree 子目录

### 联调测试原则

1. **专用环境**:创建独立的 `integration-test` worktree

2. **隔离修改**:在原 worktree 中修复问题,不在联调环境直接改

3. **及时更新**:修复后立即在联调环境中合并更新

4. **清理规范**:测试完成后删除联调 worktree 和分支

### 团队协作建议

1. **文档规范**:在项目 README 中说明 worktree 使用规范

2. **脚本共享**:将常用脚本放在 `scripts/` 目录供团队使用

3. **命名约定**:团队统一分支命名和 worktree 目录命名

4. **定期清理**:每周清理无用的 worktree 和分支

### 注意事项

⚠️ **不要在 worktree 中切换分支**:一个 worktree 专注一个分支

⚠️ **同一分支不能同时被多个 worktree 使用**:Git 会阻止这种操作

⚠️ **删除 worktree 不会删除分支**:需要手动删除分支

⚠️ **联调完成后必须清理**:避免 worktree 目录过于庞大

通过遵循这些最佳实践,可以充分发挥 Git Worktree 的优势,实现高效的并行开发和无缝的多目录联调。

---

## 常见坑 & FAQ 小结

**Q1: 删除 worktree 时提示分支正在被使用,无法删除怎么办?**  
A: 说明该分支当前正被某个 worktree 检出。先使用 `git worktree list` 找到对应目录,在主仓库根目录执行 `git worktree remove <路径>`(必要时加 `--force`),确认移除后再用 `git branch -d/-D <分支名>` 删除分支。

**Q2: 为什么在 worktree 里切换到其他分支会被 Git 阻止?**  
A: 每个 worktree 只能绑定一个分支,不能随意在其中 `git checkout` 其他分支。如需在新分支上开发,应该在主仓库用 `git worktree add <新路径> -b <新分支>` 创建新的 worktree,而不是在原 worktree 内换分支。

**Q3: 手动删除了某个 worktree 目录,但 `git worktree list` 里还有记录怎么办?**  
A: 这是典型的“陈旧 worktree 信息”。在主仓库目录执行 `git worktree prune` 即可清理失效记录,让 `git worktree list` 与实际目录保持一致。

**Q4: 在联调 worktree 里直接修改代码可以吗?**  
A: 不推荐。联调 worktree(如 `integration-test`、`integration-fullstack`)只负责合并和验证。发现问题后应回到对应功能 worktree(如 `feature-ui`、`feature-api`)修复并提交,再在联调 worktree 中 `git merge` 最新分支继续测试,这样历史清晰、回滚简单。

**Q5: rebase/reset 会不会影响其他 worktree?**  
A: 会影响**同一分支的所有 worktree**。例如在某个 worktree 中对 `feature-payment` 做了 `git rebase` 或 `git reset --hard`,其他检出 `feature-payment` 的 worktree 也会看到相同的提交历史变化,因此在共享分支上进行历史重写要格外谨慎。
