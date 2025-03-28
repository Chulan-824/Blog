# Go 接口学习笔记

## 接口定义与实现

### 接口定义

接口是一种类型，用于定义一组方法签名。语法格式：

```go
type interfaceName interface {
    functionName() // 方法组
    // ...
}
```

### 接口实现

实现接口必须要实现接口的所有方法。例如：

```go
type Duck interface {
    GaGaga()
}

type BlackSwan struct {
    Name string
}

func (d BlackSwan) GaGaga() {
    fmt.Printf("%s, ga ga ga\n", d.Name)
}
```

### 接口使用

```go
func main() {
    var d Duck
    d = BlackSwan{Name: "黑天鹅"}
    d.GaGaga() // 调用接口方法
}
```

## 接口应用举例

接口可以用于定义通用的行为模式，例如游戏中的英雄角色：

```go
type Hero interface {
    Skills(index int)
    AddEquipments(eq string)
    Move(direction string)
}

func operation(h Hero) {
    // 通用操作逻辑
}
```

## 接口断言

接口断言用于从接口类型中提取具体值和类型信息：

```go
var i interface{} = "hello"

s, ok := i.(string) // 类型断言
if ok {
    fmt.Println(s) // 输出: hello
}
```

## 为什么需要接口

1. 允许 Go 具有多态性
2. 可以传递多种类型的函数
3. 减少重复/样板代码
4. 构建高度抽象的代码

## 自检问题与答案

1. **interface 的定义和声明？**

   - 接口是一种类型，用于定义一组方法签名
   - 声明方式：`type 接口名 interface { 方法列表 }`

2. **interface 的类型断言？**

   - 使用`x.(T)`语法进行类型断言
   - 可以配合 ok 参数避免 panic：`val, ok := x.(T)`

3. **interface 空的使用？**

   - 空接口`interface{}`可以表示任何类型
   - 常用于需要处理未知类型的情况

4. **interface 的比较？**

   - 接口值比较的是动态类型和动态值
   - 两个接口值相等当且仅当它们的动态类型相同且动态值相等

5. **interface 的底层原理？**

   - Go 接口底层实现使用两个指针：一个指向类型信息，一个指向值
   - 这种设计使得接口可以灵活地表示各种类型

6. **interface 的实现方式？**
   - 任何实现了接口所有方法的类型都自动实现了该接口
   - 不需要显式声明实现关系（隐式实现）
