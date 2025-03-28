# Go 变量与常量学习笔记

## 1. 变量基础概念

- 变量是给内存地址命名并存储特定类型值
- 变量声明方式：
  ```go
  var variableName T        // 声明变量，初始化为零值
  var variableName T = value // 声明并初始化
  variableName := value     // 简短声明
  ```

## 2. 数据类型

### 基本类型

#### 数值类型

- 整数类型：

  - `int8`: 8 位有符号整数 (-128 到 127)
  - `uint8`: 8 位无符号整数 (0 到 255)
  - `int16`: 16 位有符号整数 (-32768 到 32767)
  - `uint16`: 16 位无符号整数 (0 到 65535)
  - `int32`: 32 位有符号整数 (-2147483648 到 2147483647)
  - `uint32`: 32 位无符号整数 (0 到 4294967295)
  - `int64`: 64 位有符号整数 (-9223372036854775808 到 9223372036854775807)
  - `uint64`: 64 位无符号整数 (0 到 18446744073709551615)
  - `int`: 32 位或 64 位有符号整数（取决于平台）
  - `uint`: 32 位或 64 位无符号整数（取决于平台）
  - `uintptr`: 用于存储指针的整数类型

- 浮点数类型：

  - `float32`: 32 位浮点数，精度约 6 位小数
  - `float64`: 64 位浮点数，精度约 15 位小数

- 复数类型：
  - `complex64`: 由两个 float32 组成的复数
  - `complex128`: 由两个 float64 组成的复数

#### 字符类型

- `byte`: uint8 的别名，用于表示 ASCII 字符
- `rune`: int32 的别名，用于表示 Unicode 字符

#### 布尔类型

- `bool`: 只能为 true 或 false

#### 字符串类型

- `string`: 不可变的字节序列，支持 UTF-8 编码

### 复合类型

#### 数组

- 固定长度的同类型元素序列
- 声明方式：`[n]T`
- 示例：

```go
var arr [5]int
arr := [5]int{1, 2, 3, 4, 5}
```

#### 切片

- 动态长度的同类型元素序列
- 声明方式：`[]T`
- 示例：

```go
var slice []int
slice := make([]int, 5)
slice := []int{1, 2, 3}
```

#### 映射

- 键值对集合
- 声明方式：`map[K]V`
- 示例：

```go
var m map[string]int
m := make(map[string]int)
```

#### 结构体

- 自定义类型，可以包含不同类型的字段
- 示例：

```go
type Person struct {
    Name string
    Age  int
}
```

#### 指针

- 存储内存地址
- 声明方式：`*T`
- 示例：

```go
var p *int
p := new(int)
```

#### 函数类型

- 函数签名类型
- 示例：

```go
type Handler func(string) error
```

#### 接口

- 定义方法集合
- 示例：

```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

#### 通道

- 用于 goroutine 间通信
- 声明方式：`chan T`
- 示例：

```go
var ch chan int
ch := make(chan int)
```

### 特殊类型

#### 类型别名

- 使用 `type` 关键字创建类型别名
- 示例：

```go
type Celsius float64
type Fahrenheit float64
```

#### 空接口

- `interface{}`: 可以存储任意类型的值
- 示例：

```go
var i interface{}
i = 42
i = "hello"
```

#### 类型断言

- 用于检查接口值的具体类型
- 示例：

```go
if str, ok := i.(string); ok {
    fmt.Println(str)
}
```

### 类型转换规则

1. 数值类型转换

   - 整数类型之间可以相互转换
   - 浮点数类型之间可以相互转换
   - 整数和浮点数之间可以相互转换
   - 复数类型之间可以相互转换

2. 字符串转换

   - `[]byte` 和 `string` 之间可以相互转换
   - `[]rune` 和 `string` 之间可以相互转换

3. 注意事项
   - 转换可能导致精度损失
   - 转换可能导致溢出
   - 某些类型之间不能直接转换
   - 需要显式转换，不能隐式转换

## 3. 变量声明与赋值

### 全局变量

```go
var globalVar int = 10
var (
    a int
    b string
)
```

### 局部变量

```go
func main() {
    var localVar int = 20
    shortVar := 30
}
```

### 零值

- 数值类型：0
- 布尔类型：false
- 字符串类型：""（空字符串）
- 接口类型：nil

## 4. 类型转换

### 基本转换

```go
var a int = 10
b := float64(a)
```

### 注意事项

- 类型安全检查
- 精度损失
- 溢出问题

## 5. 常量

### 常量声明

```go
const Pi = 3.14
const (
    MaxInt = 1<<31 - 1
    MinInt = -1 << 31
)
```

### iota 枚举

```go
const (
    One = iota // 0
    Two        // 1
    Three      // 2
)
```

## 6. 函数变量

### 函数作为值

```go
var add = func(x, y int) int {
    return x + y
}
```

### 函数作为参数

```go
func compute(x, y int, handler func(int, int) int) int {
    return handler(x, y)
}
```

## 7. 指针变量

### 指针声明

```go
var p *int
a := 10
p = &a
```

### new 函数

```go
p := new(int)
*p = 20
```

### 指针操作

- 取地址：`&`
- 解引用：`*`
- 空指针：`nil`

## 8. 占位符

### 常用占位符

- `%d`：十进制整数
- `%f`：浮点数
- `%s`：字符串
- `%v`：默认格式
- `%T`：类型
- `%p`：指针地址

## 9. 运算符

### 算术运算符

- `+`, `-`, `*`, `/`, `%`

### 关系运算符

- `==`, `!=`, `<`, `>`, `<=`, `>=`

### 逻辑运算符

- `&&`, `||`, `!`

### 位运算符

- `&`, `|`, `^`, `<<`, `>>`

### 赋值运算符

- `=`, `+=`, `-=`, `*=`, `/=`, `%=`

## 10. 最佳实践

- 使用简短声明简化代码
- 注意变量作用域
- 合理使用类型转换
- 使用常量代替魔法数字
- 注意指针安全性

## 11. 常见问题

- 变量未使用导致编译错误
- 类型转换失败导致运行时错误
- 指针空引用导致程序崩溃
- 变量作用域混淆
- 常量不可修改

## 12. 参考

- [Go by Example: Variables](https://gobyexample.com/variables)
- [Go 语言圣经](https://books.studygolang.com/gopl-zh/)
- [Go 语言官方文档](https://go.dev/doc/)
