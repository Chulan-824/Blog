# Go 数组与切片学习笔记

## 概述

在 Go 中，数组和切片是两个非常常用的数据结构：

- **数组**：固定大小的数据结构，创建后大小不能改变，所有元素必须是相同类型
- **切片**：动态大小的数据结构，可以根据需要动态增长或缩小

主要区别：

- 数组大小固定，切片大小可变
- 切片是对底层数组的引用，传递切片时修改会影响原数据

## 数组基础用法

### 定义和初始化

```go
// 定义数组
var arr [3]int

// 定义并初始化
arr := [3]int{1, 2, 3}

// 二维数组
arr2 := [2][3]int{{1,2,3}, {4,5,6}}
```

### 访问和修改

```go
arr[0] = 10  // 修改
val := arr[1] // 访问
```

### 遍历

```go
// 方式一
for i := 0; i < len(arr); i++ {
    fmt.Println(arr[i])
}

// 方式二
for i, v := range arr {
    fmt.Println(i, v)
}
```

## 切片基础用法

### 定义和初始化

```go
// 定义切片
var slice []int

// 初始化
slice := []int{1, 2, 3}

// 通过make创建
slice := make([]int, 5)     // 长度5，容量5
slice := make([]int, 5, 10) // 长度5，容量10
```

### 截取切片

```go
arr := [5]int{1,2,3,4,5}
slice := arr[1:3]  // [2,3]
```

### 添加元素

```go
slice = append(slice, 6)
```

### 拷贝切片

```go
// 浅拷贝
slice2 := slice1

// 深拷贝
slice2 := make([]int, len(slice1))
copy(slice2, slice1)
```

## 参数传递区别

- **数组**：值传递，会拷贝整个数组
- **切片**：传递指针(引用)，修改会影响原切片

## 自检问题答案

1. **数组的定义和声明**：`var arr [n]T`，n 是长度，T 是元素类型
2. **数组的初始化**：`arr := [3]int{1,2,3}` 或 `var arr = [3]int{1,2,3}`
3. **数组的访问和赋值**：通过索引`arr[index]`访问和赋值
4. **数组的长度**：固定，声明时确定，通过`len(arr)`获取
5. **数组的传递方式**：值传递，会拷贝整个数组
6. **多维数组的定义和使用**：`var arr [2][3]int`，通过`arr[i][j]`访问
7. **切片的定义和声明**：`var slice []T`，T 是元素类型
8. **切片的底层原理**：包含指向数组的指针、长度和容量
9. **切片的容量和长度**：`len()`获取长度，`cap()`获取容量
10. **切片的访问和修改**：通过索引`slice[index]`访问和修改
11. **切片的传递方式**：传递引用(指针)，修改会影响原切片
12. **切片的扩容**：使用`append()`会自动扩容
13. **切片的拷贝**：`copy(dst, src)`进行深拷贝
14. **切片和数组的关系**：切片是对数组的引用

## 思考题答案

### 1. 求奇数和偶数和

```go
func sumOddEven(arr []int) (oddSum, evenSum int) {
    for _, num := range arr {
        if num%2 == 0 {
            evenSum += num
        } else {
            oddSum += num
        }
    }
    return
}
```

### 2. 自定义数组类型和方法

```go
type myInt [5]int

func (m myInt) Print() {
    for _, v := range m {
        fmt.Println(v)
    }
}

func (m myInt) Sum() int {
    sum := 0
    for _, v := range m {
        sum += v
    }
    return sum
}
```

### 3. 大数计算

```go
// 使用math/big包处理大数
a, _ := new(big.Int).SetString("12345678912345678912", 10)
b, _ := new(big.Int).SetString("12345678912345678912", 10)

sum := new(big.Int).Add(a, b)
```

### 4. 学生成绩统计

```go
type Student struct {
    name     string
    language float32
    math     float32
    english  float32
}

func ClassMaxScore(students []Student) float64 {
    max := 0.0
    for _, s := range students {
        total := float64(s.language + s.math + s.english)
        if total > max {
            max = total
        }
    }
    return max
}

func ClassLanguageMaxScore(students []Student) float64 {
    max := 0.0
    for _, s := range students {
        if float64(s.language) > max {
            max = float64(s.language)
        }
    }
    return max
}
```

## 参考

- [Go Slices: usage and internals](https://go.dev/blog/slices-intro)
- [Arrays and Slices in Go](https://www.practical-go-lessons.com/chap-21-slices)
