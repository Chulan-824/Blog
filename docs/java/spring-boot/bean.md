# Bean 的管理

## 获取 bean

默认情况下，SpringBoot 项目在启动的时候会自动的创建 IOC 容器(也称为 Spring 容器)，并且在启动的过程当中会自动的将 bean 对象都创建好，存放在 IOC 容器当中。应用程序在运行时需要依赖什么 bean 对象，就直接进行依赖注入就可以了。

而在 Spring 容器中提供了一些方法，可以主动从 IOC 容器中获取到 bean 对象，下面介绍 3 种常用方式：

1. 根据 name 获取 bean：`Object getBean(String name)`
2. 根据类型获取 bean：`<T> T getBean(Class<T> requireType)`
3. 根据 name 和类型获取 bean：`<T> T getBean(String name, Class<T> requireType)`

```java
@SpringBootTest
class SpringBootDemoApplicationTests {
  @Autowired
  private ApplicationContext applicationContext; //IOC容器对象

  //获取bean对象
  @Test
  public void testGetBean(){
    //根据bean的名称获取
    EmpController bean1 = (EmpController) applicationContext.getBean("empController");
    System.out.println(bean1);

    //根据bean的类型获取
    EmpController bean2 = applicationContext.getBean(EmpController.class);
    System.out.println(bean2);

    //根据bean的名称 及 类型获取
    EmpController bean3 = applicationContext.getBean("empController", EmpController.class);
    System.out.println(bean3);
  }
}
```

> [!TIP]
> 上述所说的 【Spring项目启动时，会把其中的bean都创建好】还会受到作用域及延迟初始化影响，这里主要针对于默认的单例非延迟加载的bean而言。

## bean 的作用域

| **作用域**    | **说明**                                         |
| ------------- | ------------------------------------------------ |
| **singleton** | 容器内同名称的 bean 只有一个实例（单例）（默认） |
| **prototype** | 每次使用该 bean 时会创建新的实例（非单例）       |
| request       | 每个请求范围内会创建新的实例（web环境中，了解）  |
| session       | 每个会话范围内会创建新的实例（web环境中，了解）  |
| application   | 每个应用范围内会创建新的实例（web环境中，了解）  |

```java{1}
@Scope("prototype")
@Slf4j
@RestController
@RequestMapping("/emps")
public class EmpController {}
```

> [!TIP]
>
> - IOC 容器中的 bean 默认使用的作用域：singleton (单例)
> - 默认 singleton 的 bean，在容器启动时被创建，可以使用 @Lazy 注解来延迟初始化(延迟到第一次使用时)
> - prototype 的 bean，每一次使用该 bean 的时候都会创建一个新的实例
> - 实际开发当中，绝大部分的 Bean 是单例的，也就是说绝大部分 Bean 不 需要配置 scope 属性

## 第三方 bean

在引入第三方依赖提供的对象时，使用并定义第三方的 bean 对象有两种方式：

1. 在配置类中定义 @Bean 标识的方法(推荐)
2. 在启动类上添加 @Bean 标识的方法

以 dom4j 为例：

::: code-group

```java [配置类中定义]
@Configuration //配置类
public class CommonConfig {
  //声明第三方bean
  @Bean //将当前方法的返回值对象交给 IOC 容器管理, 成为 IOC 容器 bean
        //通过 @Bean 注解的 name/value 属性指定bean名称, 如果未指定, 默认是方法名
  public SAXReader reader(DeptService deptService){
    System.out.println(deptService);
    return new SAXReader();
  }
}
```

```java [启动类中添加]
@SpringBootApplication
public class SpringbootWebConfig2Application {
  public static void main(String[] args) {
    SpringApplication.run(SpringbootWebConfig2Application.class, args);
  }

  //声明第三方bean
  @Bean //将当前方法的返回值对象交给 IOC 容器管理, 成为 IOC 容器 bean
  public SAXReader saxReader(){
    return new SAXReader();
  }
}
```

```xml [Dom4j]
<!--Dom4j-->
<dependency>
  <groupId>org.dom4j</groupId>
  <artifactId>dom4j</artifactId>
  <version>2.1.3</version>
</dependency>
```

:::

> [!TIP]
> 注意事项
>
> - 通过@Bean注解的name或value属性可以声明bean的名称，如果不指定，默认bean的名称就是方法名。
> - 如果第三方bean需要依赖其它bean对象，直接在bean定义方法中设置形参即可，容器会根据类型自动装配。

关于 Bean 只需要保持一个原则：

- 自己定义的类，想将这些类交给 IOC 容器管理，我们直接使用 @Component 以及它的衍生注解来声明就可以。
- 引入的第三方依赖当中提供的类,在配置类中定义一个方法，在方法上加上一个 @Bean 注解，通过这种方式来声明第三方的 bean 对象。
