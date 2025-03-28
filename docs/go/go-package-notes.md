# Go Package 学习笔记

## 1. 包基础概念

- 包是 Go 语言中代码组织和重用的基本单元
- 每个 Go 程序至少包含一个 main 包，main 函数作为程序入口
- 通过 import 语句导入标准库和第三方包

## 2. 包管理

### 导入标准库

```go
import (
    "fmt"
    "math/rand"
    "time"
)
```

### 导出规则

- 首字母大写的函数、变量、常量可以被其他包访问
- 首字母小写的为包私有，只能在当前包内使用

## 3. 包别名和匿名包

### 包别名

```go
import m "math"
```

### 匿名包

```go
import _ "math/rand"
```

- 用于执行包的 init 函数
- 常用于数据库驱动注册等初始化操作

## 4. 包初始化顺序

1. 导入的包按依赖顺序初始化
2. 包级变量初始化
3. 执行包的 init 函数
4. 执行 main 函数

## 5. 最佳实践

- 保持包职责单一
- 合理使用导出控制
- 注意包初始化顺序
- 适度使用包别名

## 6. 常见问题

- 包循环依赖
- 包初始化顺序错误
- 导出控制不当
- 包命名冲突

## 7. 参考

- [Go Modules](https://go.dev/doc/modules/managing-source)
- [Go Packages](https://golangdocs.com/packages-in-golang)
