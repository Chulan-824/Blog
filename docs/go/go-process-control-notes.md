# Go 流程控制学习笔记

## 循环语句

Go 中有三种循环方式：

1. **for 循环** - 唯一循环关键字

   ```go
   for initialization; condition; post {
     // 循环体
   }
   ```

   - 示例：累加 0-9

   ```go
   sum := 0
   for i := 0; i < 10; i++ {
     sum += i
   }
   ```

2. **range 循环** - 遍历字符串、数组、切片或映射

   ```go
   str := "Golang"
   for i, v := range str {
     fmt.Printf("i:%d,v:%c\n", i, v)
   }
   ```

3. **goto 语句** - 无条件跳转
   ```go
   i := 0
   Next: // 标签
     fmt.Println(i)
     i++
     if i < 5 {
       goto Next
     }
   ```

## 条件判断

1. **if 语句**

   ```go
   if condition {
     // 条件为真时执行
   } else if condition2 {
     // 条件2为真时执行
   } else {
     // 其他情况
   }
   ```

2. **switch 语句**
   - 基本用法：
   ```go
   switch flag {
   case 1:
     fmt.Println("case 1")
   case 2,3: // 多条件
     fmt.Println("case 2 or 3")
   default:
     fmt.Println("default")
   }
   ```
   - 无表达式用法：
   ```go
   switch {
   case flag < 2:
     fmt.Println("flag < 2")
   case flag < 4:
     fmt.Println("flag < 4")
   }
   ```

## 延迟执行

1. **defer**

   - 延迟调用，函数返回前执行
   - 多个 defer 按后进先出顺序执行

   ```go
   defer fmt.Println("world")
   fmt.Println("hello")
   // 输出: hello world
   ```

2. **defer+recover**
   - 捕获 panic 错误
   ```go
   defer func() {
     if err := recover(); err != nil {
       fmt.Println("捕获错误:", err)
     }
   ```

## 自检问题答案

1. **for 循环的语法和组成部分？**  
   for 循环由初始化语句、条件表达式和后置语句三部分组成，格式为：`for init; condition; post { ... }`

2. **range 循环与 for 循环的区别？**  
   range 专门用于遍历集合类型，自动处理索引和值；for 是通用循环结构，需要手动控制

3. **break 和 continue 的作用？**  
   break 立即终止当前循环；continue 跳过本次循环剩余代码，直接进入下一次循环

4. **if-else 语句的嵌套使用？**  
   可以在 if 或 else 代码块中再嵌套 if-else 语句，形成多级条件判断

5. **switch 语句的默认分支？**  
   default 分支在所有 case 都不匹配时执行，是可选的

6. **defer 语句的执行顺序？**  
   多个 defer 按后进先出(LIFO)顺序执行，最后定义的 defer 最先执行

7. **recover 的作用和使用场景？**  
   用于捕获 panic 异常，必须配合 defer 使用，通常用于错误恢复
   }()

## 思考题

1. 计算 100000 以内偶数且不是 4 的倍数的所有数值和
2. 通过 Switch 实现加减乘除计算函数
3. 使用 for 循环打印指定图形

## 自检问题

- for 循环的语法和组成部分？
- range 循环与 for 循环的区别？
- break 和 continue 的作用？
- if-else 语句的嵌套使用？
- switch 语句的默认分支？
- defer 语句的执行顺序？
- recover 的作用和使用场景？

## 参考资源

- [Go 控制流](https://gfw.go101.org/article/control-flows.html)
- [defer 知识点](https://www.songx.fun/blog/必修/7golang中的defer必掌握的7知识点/)
- [panic 和 recover](https://xiaomi-info.github.io/2020/01/20/go-trample-panic-recover/)
