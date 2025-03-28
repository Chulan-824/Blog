# Go 结构体学习笔记

## 结构体定义

在 Go 语言中，struct 是一种用户自定义的复合类型，可以将多个字段组合在一起形成新的结构体类型。结构体类型用于封装多个相关的数据字段。

```go
type StructName struct {
    Field1 FieldType1
    Field2 FieldType2
    // ...
    FieldN FieldTypeN
}
```

## 结构体初始化

可以通过结构体字面量的方式创建结构体变量：

```go
d := Demo{
    a: true,
    B: 'b',
    C: 1,
    D: 1.0,
    E: "E",
    F: []int{1},
    G: map[string]int{"GOLANG": 1},
}
```

## 结构体 Tag

可以为结构体字段设置 tag，用于指定元数据信息：

```go
type User struct {
    UserName string `json:"user_name"`
    PassWord string `json:"pass_word"`
}
```

## 结构体内存布局

结构体字段在内存中是连续排列的，可以通过打印地址查看：

```go
fmt.Printf("variable b   addr %p\n", &d)
fmt.Printf("variable b.a addr %p\n", &d.a)
fmt.Printf("variable b.B addr %p\n", &d.B)
// ...
```

## 结构体方法

结构体可以定义方法，分为值方法和指针方法：

### 值方法

```go
func (d Demo) print() {
    fmt.Printf("d %+v\n", d)
}
```

### 指针方法

```go
func (d *Demo) ModifyE() {
    d.E = "Hello World"
}
```

## 结构体应用

可以通过结构体组装电脑组件：

```go
type Computer struct {
    CPU
    Memory
    NetWork
    Display
}

func (c Computer) RUN() {
    c.CPU.operation()
    c.Memory.InteractiveData()
    c.NetWork.TransferData()
    c.Display.Display()
    fmt.Println("computer running")
}
```

## 思考题解答

1. 通过结构体方法实现加减乘除：

```go
type numb struct {
    a int
    b int
}

func (n numb) add() int {
    return n.a + n.b
}

func (n numb) sub() int {
    return n.a - n.b
}

func (n numb) mul() int {
    return n.a * n.b
}

func (n numb) div() int {
    return n.a / n.b
}
```

2. 圆结构体及方法：

```go
type circle struct {
    radius float64
}

func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}

func (c circle) circumference() float64 {
    return 2 * math.Pi * c.radius
}

func (c circle) arcLength(angle float64) float64 {
    return c.circumference() * angle / 360
}
```

## 自检问题答案

1. struct 的定义和声明：

   - 使用`type StructName struct {}`语法定义
   - 声明：`var s StructName`或`s := StructName{}`

2. struct 的初始化：

   - 字面量初始化：`s := StructName{Field1: value1, Field2: value2}`
   - new 初始化：`s := new(StructName)`
   - 零值初始化：`var s StructName`

3. struct 的字段访问：

   - 使用点号：`s.FieldName`

4. struct 的匿名字段：

   - 没有显式名字的字段，类型名作为字段名

5. struct 嵌套：

   - 一个结构体可以包含另一个结构体作为字段

6. struct 的指针类型：

   - `*StructName`是指向结构体的指针类型

7. struct 的值方法：

   - 接收者为值类型的方法，操作的是副本

8. struct 的指针方法：

   - 接收者为指针类型的方法，操作的是原对象

9. struct 标签的定义和语法：

   - 使用反引号定义：`` `key:"value"` ``
   - 多个标签用空格分隔

10. struct 标签的解析方法：
    - 使用 reflect 包：`field.Tag.Get("key")`
