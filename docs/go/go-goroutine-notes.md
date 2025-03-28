# Go Goroutine 学习笔记

## Goroutine 基本概念

Goroutine 是 Go 语言中的轻量级线程，由 Go 运行时管理。与系统线程相比，Goroutine 的创建和切换开销很小。

### 特点：

- 轻量级(初始仅 2KB 栈，可动态扩容)
- 由 Go 运行时调度，非操作系统调度
- 使用`go`关键字启动
- 与通道(channel)配合实现通信

## 基本使用示例

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world") // 启动goroutine
    say("hello")
}
```

## WaitGroup 同步

使用 sync.WaitGroup 等待多个 goroutine 完成：

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func listLanguage(items []string, wg *sync.WaitGroup) {
    defer wg.Done()
    for i := range items {
        fmt.Printf("language: %s\n", items[i])
        time.Sleep(time.Second)
    }
}

func main() {
    language := []string{"golang", "java", "c++", "python", "rust", "js"}

    var wg sync.WaitGroup
    wg.Add(1) // 设置需要等待的goroutine数量

    go listLanguage(language, &wg)

    wg.Wait() // 等待所有goroutine完成
    fmt.Println("return")
}
```

## 并发安全

### 原子操作

使用 sync/atomic 包实现原子操作：

```go
package main

import (
    "fmt"
    "sync"
    "sync/atomic"
)

func main() {
    var sum int64 = 0
    var wg sync.WaitGroup

    wg.Add(2)

    go func() {
        defer wg.Done()
        for i := 0; i < 10000000; i++ {
            atomic.AddInt64(&sum, 1)
        }
    }()

    go func() {
        defer wg.Done()
        for i := 0; i < 10000000; i++ {
            atomic.AddInt64(&sum, 1)
        }
    }()

    wg.Wait()
    fmt.Println(sum) // 正确输出20000000
}
```

### 互斥锁

使用 sync.Mutex 保护临界区：

```go
package main

import (
    "fmt"
    "sync"
)

func main() {
    sum := 0
    var wg sync.WaitGroup
    var mu sync.Mutex

    wg.Add(2)

    go func() {
        defer wg.Done()
        for i := 0; i < 10000000; i++ {
            mu.Lock()
            sum++
            mu.Unlock()
        }
    }()

    go func() {
        defer wg.Done()
        for i := 0; i < 10000000; i++ {
            mu.Lock()
            sum++
            mu.Unlock()
        }
    }()

    wg.Wait()
    fmt.Println(sum) // 正确输出20000000
}
```

## 读写锁(RWMutex)示例

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

var (
    count int
    rwMu  sync.RWMutex
)

func read() {
    rwMu.RLock()
    defer rwMu.RUnlock()
    fmt.Println("Read count:", count)
    time.Sleep(10 * time.Millisecond)
}

func write() {
    rwMu.Lock()
    defer rwMu.Unlock()
    count++
    fmt.Println("Write count to", count)
    time.Sleep(100 * time.Millisecond)
}

func main() {
    for i := 0; i < 100; i++ {
        go read()
    }

    for i := 0; i < 10; i++ {
        go write()
    }

    time.Sleep(2 * time.Second)
    fmt.Println("Final count:", count)
}
```

## 自检问题答案

1. **Goroutine 的定义和启动**

   - Goroutine 是 Go 语言的轻量级线程
   - 使用`go`关键字启动，如`go functionName()`

2. **Goroutine 的同步方式**

   - 使用 sync.WaitGroup 等待多个 goroutine 完成
   - 使用 channel 进行通信和同步
   - 使用 sync.Mutex/sync.RWMutex 保护共享资源

3. **Goroutine 的调度器**

   - Go 运行时实现的 M:N 调度模型
   - 将 M 个 goroutine 映射到 N 个操作系统线程
   - 使用工作窃取(work-stealing)算法平衡负载

4. **Goroutine 的并发安全**

   - 使用原子操作(sync/atomic)
   - 使用互斥锁(sync.Mutex)
   - 使用读写锁(sync.RWMutex)

5. **WaitGroup 的定义和使用**
   - var wg sync.WaitGroup
   - wg.Add(n) 设置等待数
   - wg.Done() 减少等待数(通常用 defer 调用)
   - wg.Wait() 阻塞直到等待数为 0
