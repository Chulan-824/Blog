# 注解

## @Component

自动检测和配置类到 Spring IOC 容器中，当你将 @Component 注解添加到一个类上时，Spring 将在启动时自动扫描并将这个类实例化为一个 Bean，这个 Bean 随后可以在整个应用程序中被自动注入到需要它的地方。

```java
package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class MyComponent {
    public void doSomething() {
        System.out.println("Doing something...");
    }
}
```

不过，大多数时候应该使用更专业的元（Stereotype）注解来实现这一功能。

与 @Components 相同功能的 Spring 元注解：@Controller（表现层）、@Service（业务逻辑层） 和 @Repository（持久层）。

[Spring 中的 @Component 注解](https://springdoc.cn/spring-component-annotation/)

## @RequestMapping

主要作用是定义请求的处理规则,用于映射 HTTP 请求到特定的类或方法上。

关键语法和特性：

::: details 路径映射
通过 value 或 path 属性指定 URL 路径。

例如，@RequestMapping(value = "/home") 或 @RequestMapping("/home") 都会将 HTTP 请求映射到 /home 路径的处理器。

```java
@RequestMapping(value = "/home") / @RequestMapping("/home")
@ResponseBody
public String getHome() {
    return "home";
}
```

:::

::: details HTTP 方法限定
使用 method 属性可以限定处理特定 HTTP 方法的请求。

例如，@RequestMapping(value = "/submit", method = RequestMethod.POST) 仅处理对 /submit 的 POST 请求。

```java
@RequestMapping(value = "/submit", method = POST)
@ResponseBody
public String postSubmit() {
    return "Post Submit";
}
```

:::

::: details 请求参数和请求头
params 属性用于进一步细化映射条件，只有当请求中包含指定的请求参数时，才映射到该方法。

例如，@RequestMapping(value = "/item", params = "type=book") 仅处理查询参数中包含 type=book 的请求。

headers 属性允许根据请求头部进行映射。

例如，@RequestMapping(value = "/path", headers = "X-API-KEY=secret") 只处理包含有正确 X-API-KEY 请求头的请求。

```java
@RequestMapping(value = "/ex/foos", headers = "key=val", method = GET)
@ResponseBody
public String getFoosWithHeader() {
    return "Get some Foos with Header";
}
```

:::

::: details 生产与消费
consumes 属性定义了方法可以处理的请求的内容类型（即 Content-Type），例如 consumes = "application/json" 表示该方法仅处理 Content-Type 为 application/json 的请求。

produces 属性指定了响应的媒体类型（即 Accept 请求头），例如 produces = "application/json" 表示该方法返回的响应内容类型为 application/json。
:::

::: details 新的请求映射快捷方式

Spring Framework 4.3引入了一些新的HTTP映射注释，全部基于@RequestMapping:

- @GetMapping
- @PostMapping
- @PutMapping
- @DeleteMapping
- @PatchMapping

新的注释可以提高可读性并减少代码的冗长。

```java
@GetMapping("/{id}")
public ResponseEntity<?> getBazz(@PathVariable String id){
    return new ResponseEntity<>(new Bazz(id, "Bazz"+id), HttpStatus.OK);
}

@PostMapping
public ResponseEntity<?> newBazz(@RequestParam("name") String name){
    return new ResponseEntity<>(new Bazz("5", name), HttpStatus.OK);
}

@PutMapping("/{id}")
public ResponseEntity<?> updateBazz(
  @PathVariable String id,
  @RequestParam("name") String name) {
    return new ResponseEntity<>(new Bazz(id, name), HttpStatus.OK);
}

@DeleteMapping("/{id}")
public ResponseEntity<?> deleteBazz(@PathVariable String id){
    return new ResponseEntity<>(new Bazz(id), HttpStatus.OK);
}
```

:::

更多: [Spring RequestMapping](https://www.baeldung.com/spring-requestmapping)

## @RequestBody

## @ResponseBody​​​​

功能：

- 直接写入响应体：方法的返回值应直接在 HTTP 响应体中返回给客户端，而不是作为模型数据传递给视图层。
- 自动序列化：通常用于返回 JSON 或 XML 格式的数据。Spring 会使用合适的 HTTP 消息转换器将返回值序列化为请求头中 Accept 字段指定的格式。例如，如果返回类型是 Java 对象，Spring 将使用 JSON 或 XML 转换器来转换对象，前提是你已经在项目中添加了支持 JSON 或 XML 的库（如 Jackson 或 JAXB）。

> ​​@ResponseBody ​​会自动将控制器中方法的返回值写入到HTTP响应中。特别的，​​@ResponseBody​ ​注解只能用在被​ ​@Controller ​​注解标记的类中。如果在被 ​​@RestController​ ​标记的类中，则方法不需要使用​​ @ResponseBody​ ​注解进行标注。​​@RestController ​​相当于是 ​​@Controller​ ​和 ​​@ResponseBody​ ​的组合注解。

```java
@Controller
public class UserController {

    @GetMapping("/user")
    @ResponseBody
    public User getUser() {
        User user = new User("Alice", 25);
        return user;  // 返回值将被自动转化为 JSON
    }
}
```

## @RestController

@RestController = @Controller + @ResponseBody

用途和特点：

1. 自动响应序列化：使用 @RestController，Spring 会自动将方法的返回值序列化为 JSON 或 XML，返回给客户端，适用于构建 RESTful Web 服务
2. 便捷的API开发：@RestController 使得创建 RESTful Web 服务变得非常简单和直接，因为它减少了常规的模板代码（例如，在每个方法上显式地添加 @ResponseBody）
3. 请求处理：标记为 @RestController 的类可以使用 @RequestMapping 或其变体（如 @GetMapping, @PostMapping, @PutMapping 等）来映射 HTTP 请求到对应的处理方法。

```java
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/greeting")
    public String greeting() {
        return "Hello, World!";
    }
}
```

## @ConfigurationProperties

用于将外部配置文件（如 application.properties 或 application.yml）中的配置属性映射到 Java 类中。

主要作用是简化配置的管理，使得配置项可以通过强类型的方式进行访问和使用。

::: code-group

```yml [application.yml]
app:
  name: MyApp
  description: This is my application
  version: 1.0.0
```

```java [AppProperties]
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String description;
    private String version;
}

```

:::
