# Go Map 学习笔记

## 1. Map 基本概念

- Map 是 Go 语言中的内置数据结构，也称为哈希表或字典
- 无序的键值对集合，键唯一对应值
- 所有键必须是同一类型，所有值也必须是同一类型
- Map 是指针持有者类型，指向底层 hmap 结构

## 2. Map 定义与初始化

```go
// 声明
var mapName map[keyType]valueType

// 使用make初始化
mapName := make(map[keyType]valueType, [size])

// 直接初始化
mapName := map[keyType]valueType{}
mapName := map[keyType]valueType{
    key1: value1,
    key2: value2,
}
```

## 3. Map 操作

### 添加/修改元素

```go
mapName[key] = value
```

### 获取元素

```go
value := mapName[key]  // 不存在返回零值
```

### 删除元素

```go
delete(mapName, key)
```

### 长度

```go
len(mapName)
```

### 遍历

```go
for key, value := range mapName {
    // 无序
}
```

### 检查存在

```go
value, ok := mapName[key]
```

## 4. Map 深浅拷贝

- 直接赋值是浅拷贝，共享底层存储
- 深拷贝需要遍历复制所有元素

## 5. Map 参数传递

- 传递的是指向底层映射的指针
- 函数内修改会影响原 map

## 6. 自检问题解答

1. **map 的定义和声明**：

   - 使用`var mapName map[keyType]valueType`声明
   - 声明后需要初始化才能使用

2. **map 的初始化**：

   - 使用`make`函数：`make(map[keyType]valueType, [size])`
   - 直接初始化：`map[keyType]valueType{}`或带初始值

3. **map 的元素访问和赋值**：

   - 使用`mapName[key]`访问
   - 使用`mapName[key] = value`赋值/修改

4. **map 的长度和删除元素**：

   - `len(mapName)`获取长度
   - `delete(mapName, key)`删除元素

5. **map 的遍历**：

   - 使用`for key, value := range mapName`遍历
   - 遍历顺序不确定

6. **map 的传递方式**：
   - 传递的是指向底层数据的指针
   - 函数内修改会影响原 map

## 7. 思考题实现

### 7.1 人员统计小程序

```go
package main

import "fmt"

func main() {
    people := make(map[string]bool)

    // 1.1 添加名字
    people["Alice"] = true
    people["Bob"] = true

    // 1.2 查询名字
    if _, ok := people["Alice"]; ok {
        fmt.Println("Alice exists")
    }

    // 1.3 删除名字
    delete(people, "Bob")

    // 1.4 更新名字
    people["Alice"] = false // 假设表示状态变更

    // 1.5 打印所有名字
    for name := range people {
        fmt.Println(name)
    }

    // 1.6 统计总人数
    fmt.Println("Total:", len(people))
}
```

### 7.2 班级成绩统计

```go
package main

import "fmt"

type Student struct {
    language float32
    math     float32
    english  float32
}

type Class struct {
    mp map[string]Student
}

func (c Class) ClassMaxScore() float32 {
    max := float32(0)
    for _, s := range c.mp {
        total := s.language + s.math + s.english
        if total > max {
            max = total
        }
    }
    return max
}

func (c Class) ClassLanguageMaxScore() float32 {
    max := float32(0)
    for _, s := range c.mp {
        if s.language > max {
            max = s.language
        }
    }
    return max
}

func (c Class) PrintAllStudent() {
    for name, s := range c.mp {
        fmt.Printf("%s: 语文%.1f 数学%.1f 英语%.1f\n",
            name, s.language, s.math, s.english)
    }
}

func main() {
    class := Class{
        mp: map[string]Student{
            "Alice": {90, 85, 92},
            "Bob":   {88, 90, 78},
        },
    }

    fmt.Println("最高总分:", class.ClassMaxScore())
    fmt.Println("语文最高分:", class.ClassLanguageMaxScore())
    class.PrintAllStudent()
}
```
