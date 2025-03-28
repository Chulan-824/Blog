# Go 函数教程

## 函数定义与调用

Go 语言中函数的定义格式如下：

```go
func name([parameter list]) [return_type list] {
  // 函数体
}
```

示例：

```go
// 定义一个 print 函数, 它接受 0 个参数，返回 0 个值
func print() {
	fmt.Println("hello world")
}

// 定义一个 add 函数, 它接受 2 个 int 类型的参数,返回 1 个 int 类型的值
func add(x int, y int) int {
	return x + y
}

// 定义一个 swap 函数, 它接受 2 个 int 类型的参数,返回 2 个 int 类型的值
func swap(x, y int) (int, int) {
	return y, x
}

// 返回值可被命名(a,b)，它们会被视作定义在函数顶部的变量
func swap2(x, y int) (a int, b int) {
	a = y
	b = x
	return
}

// 传递不定长参数 ...T
func variableCut(x int, y ...int) int {
	for _, v := range y {
		x += v
	}
	return x
}
```

## 变量传递与指针传递

值类型参数与指针类型参数的区别：

- 值类型参数：将实际数据复制一份传递给函数
- 指针类型参数：将实际数据的地址传递给函数

示例：

```go
// 值类型参数
func modifyValue(x int) {
	x = x * 10
}

// 指针类型参数
func modifyPointer(x *int) {
	*x = (*x) * 10
}
```

## 匿名函数

匿名函数是指没有名称的函数，可以直接定义在函数体中或作为变量赋值。

示例：

```go
// 定义匿名函数并赋值给add变量
var add = func(x, y int) int {
	return x + y
}

// 定义匿名函数并赋值给Multi变量
Multi := func(x, y int) int {
	return x * y
}
```

## 闭包

闭包是引用了外部变量的匿名函数，可以访问外部作用域中的变量。

示例：

```go
func counter() func() int {
	total := 0 // 闭包打包的外部作用域环境
	return func() int { // 闭包函数
		total++
		return total
	}
}
```

## Init 函数

init 函数是一个特殊的函数，用于在程序执行前自动执行一些初始化操作。

示例：

```go
// init 函数会在 main 函数之前执行
func init() {
	fmt.Println("Golang Tutorial")
}
```

## 思考题

1. 通过传参实现加减乘除这四个函数
2. 通过指针的方式实现加减乘除这四个函数
3. 通过 init 函数初始化全局变量

## 自检

- 函数的定义和调用
- 函数的参数
- 函数的不定长参数
- 函数的指针参数
- 函数的返回值和多返回值
- 函数作为变量和参数传递
- 匿名函数
- 闭包
- init 函数的定义和作用
- init 函数的执行顺序

## 参考

- [https://llmxby.com/2022/08/27/探究 Golang 中的闭包/](https://llmxby.com/2022/08/27/探究Golang中的闭包/)
- [https://www.cnblogs.com/mfrank/p/13383467.html](https://www.cnblogs.com/mfrank/p/13383467.html)
- [https://stackoverflow.com/questions/24790175/when-is-the-init-function-run/49831018#49831018](https://stackoverflow.com/questions/24790175/when-is-the-init-function-run/49831018#49831018)
