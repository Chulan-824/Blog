# Go 模块管理命令总结

## 常用命令

### `go mod init [module-path]`

- 初始化一个新的 Go 模块
- 在当前目录创建 `go.mod` 文件
- 如果不指定模块路径，将使用当前目录名

### `go mod tidy`

- 添加缺失的依赖项
- 删除未使用的依赖项
- 更新 `go.mod` 和 `go.sum` 文件
- 最常用的依赖管理命令

### `go get [packages]`

- 添加或更新依赖包
- 常用选项：
  - `-u`: 更新到最新版本
  - `-d`: 仅下载，不安装
  - `@version`: 指定版本，如 `@latest`、`@v1.2.3`
- 示例：
  ```bash
  go get github.com/pkg/errors
  go get -u github.com/gin-gonic/gin
  go get github.com/go-sql-driver/mysql@v1.7.0
  ```
- 注意：在新版本中，`go get` 主要用于下载依赖，添加新依赖推荐使用 `go mod tidy`

### `go mod download`

- 下载 `go.mod` 中指定的所有依赖
- 不会修改 `go.mod` 和 `go.sum` 文件
- 通常 `go mod tidy` 会自动调用此命令

### `go mod verify`

- 验证当前模块的依赖是否完整且未被修改
- 检查 `go.sum` 中的校验和是否匹配

### `go mod vendor`

- 将依赖复制到项目的 `vendor` 目录
- 用于离线构建或确保依赖版本一致性
- 创建 `vendor/modules.txt` 文件

### `go mod graph`

- 显示模块依赖图
- 输出格式为 "模块@版本 依赖模块@版本"
- 用于分析项目依赖关系

### `go mod why [-m] [-v] packages...`

- 解释为什么需要某个包
- `-m`: 显示模块级别的依赖关系
- `-v`: 显示详细的依赖路径

## 使用建议

1. 新项目初始化：

   ```bash
   go mod init project-name
   ```

2. 日常依赖管理：

   ```bash
   go mod tidy
   ```

3. 离线开发：

   ```bash
   go mod vendor
   ```

4. 依赖分析：
   ```bash
   go mod graph
   go mod why package-name
   ```

## 注意事项

- `go.mod` 文件应该提交到版本控制系统
- `go.sum` 文件也应该提交，用于验证依赖完整性
- 使用 `go mod tidy` 是最安全和推荐的方式
- 在团队协作时，建议统一使用相同的 Go 版本
