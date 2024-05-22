<script setup>
import ImgIocDi1 from '../images/iocdi-1.png'
import ImgIocDi2 from '../images/iocdi-2.png'
import ImgIocDi3 from '../images/iocdi-3.png'
import ImgIocDi4 from '../images/iocdi-4.png'
</script>

# IOC / DI

## IOC 控制反转

### 是什么

IOC（Inversion of Control）即控制反转，它不是什么技术，而是一种设计思想。

传统的应用程序是有我们在类的内部**主动创建**对象，从而导致类与类之间高耦合，难于测试。有了 IOC 容器后，把**创建**和**查找**依赖对象的控制权交给容器，再由容器注入组合对象，所以对象与对象之间是 松散耦合，这样也方便测试，利于功能复用，更重要的是使得程序的整个体系结构变得非常灵活。

这里**反转的是对象的控制**，应用程序从**主动出击**到**被动等待** IOC 容器创建并注入所需对象。

<Image :src="ImgIocDi1" />

### 好处

1. 降低耦合度：IOC 使得组件之间的依赖关系不由组件自身管理，而是由外部容器来管理。这减少了组件间的直接依赖，提高了组件的可重用性和可替换性。
2. 提高模块化：通过分离应用程序的配置和依赖解决方案从其业务逻辑中，可以更容易地修改或更新依赖关系而不影响其他模块。
3. 更易于测试：IOC 容易插入模拟对象或测试双（stubs）作为正常依赖的替代品，这在单元测试和集成测试中非常有用。
4. 集中管理：由于依赖关系是由容器集中管理，应用程序的配置和依赖关系管理更加集中和一致，易于跟踪和维护。

### 实现

在Spring-boot 中由 IOC 容器创建的对象统称为 bean 对象，实现 IOC 也就是创建 bean 的过程。

常用的几种声明方式：

#### 基于 XML 配置

1. .src/main/resources 目录下创建 beans.xml 文件
2. 添加测试代码

::: code-group

```xml [beans.xml]
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="emp" class="com.example.pojo.Emp" />
</beans>
```

```java [SpringbootWebReqRespApplicationTests.java]
package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootTest
class SpringbootWebReqRespApplicationTests {
    @Test
    public void testFirst(){
        // 初始化Spring容器上下文（解析beans.xml文件，创建所有的bean对象）
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        // 根据id获取bean对象
        Object emp = applicationContext.getBean("emp");
        // 打印该对象
        System.out.println(emp);
    }
}
```

:::

#### 基于注解配置

为了更好的标识 bean 对象,Spring 框架提供了 @Component 的衍生注解:

- @Controller （标注在控制层类上）
- @Service （标注在业务层类上）
- @Repository （标注在数据访问层类上）
- @Component （不属于以上三类时，用此注解）

[springboot中创建bean的7种方式](https://juejin.cn/post/7226696723354370085?searchId=2024051416214165E2AE301714E50D0407)

## DI 依赖注入

### 是什么

DI（Dependency Injection）即依赖注入，动态的向某个对象提供它所需要的其他对象。

比如对象A需要操作数据库，以前我们总是要在 A 中自己编写代码来获得一个 Connection 对象，有了 Spring 我们就只需要告诉 Spring，A 中需要一个 Connection，至于这个 Connection 怎么构造，何时构造，A 不需要知道。在系统运行时，Spring 会在适当的时候制造一个Connection，然后像打针一样，注射到A当中，这样就完成了对各个对象之间关系的控制。

### 好处

1. 代码复用：DI 支持代码的高复用性，因为它通过接口编程，使得任何符合接口的实现都可以被注入，增强了代码的灵活性和再利用性。
2. 代码解耦：由于组件不需要自行创建其依赖项，它们之间的耦合度降低。这意味着修改或替换依赖组件不需要修改依赖它的组件。
3. 易于配置变更：应用程序的行为可以通过更改其依赖项的配置来修改，而不需要改变代码。这可以通过配置文件或在 Spring 的情况下通过注解实现。
4. 更好的测试支持：由于依赖可以被轻松地注入，开发者可以注入特定于测试的实现（例如，使用内存数据库的数据访问对象，而不是真实数据库的数据访问对象），这使得单元测试和集成测试更为容易和有效。
5. 更好的可维护性和可扩展性：DI 支持更好的代码组织和管理，使得系统易于维护和扩展。新增和替换组件变得简单，因为系统的其他部分不依赖于具体的实现。

### 实现

#### 构造器注入

在基于构造函数的依赖注入中，类构造函数被标注为 @Autowired，并包含了许多与要注入的对象相关的参数。

```java{8}
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {
    private final UserRepository userRepository;

    @Autowired // 在Spring官方文档中，@Autowired 注解也是可以省去的。
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

基于构造函数注入的主要优点是可以将需要注入的字段声明为 final， 使得它们会在类实例化期间被初始化，这对于所需的依赖项很方便。

#### Setter 注入

```java{8}
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {
    private UserRepository userRepository;

    @Autowired // 同上也可以省略
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

这种方式在需要重新设置依赖或依赖可选时非常有用。

#### 字段注入(不推荐)

字段注入是将依赖直接注入到类的字段中。这种方法简单快速，但它可能导致难以追踪的依赖关系和难以进行单元测试的代码。

```java{6}
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```

> 如果存在多个相同类型的 bean 对象。会

不推荐原因：[公司为什么禁止在SpringBoot项目中使用@Autowired注解](https://juejin.cn/post/7275009721760432168#heading-5)

#### 存在多个同类型 bean 对象

解决方案：

- @Primary
- @Qualifier
- @Resource

1. 使用 @Primary 注解：当存在多个相同类型的 Bean 注入时，加上 @Primary 注解，来确定默认的实现。

<Image :src="ImgIocDi2" />

2. 使用@Qualifier注解：指定当前要注入的bean对象。 在@Qualifier的value属性中，指定注入的bean的名称。

   > @Qualifier注解不能单独使用，必须配合@Autowired使用
   > <Image :src="ImgIocDi3" />

3. 使用@Resource注解：是按照bean的名称进行注入。通过name属性指定要注入的bean的名称。

<Image :src="ImgIocDi4" />

## 参考

[从六个方面读懂IoC(控制反转)和DI(依赖注入)](https://juejin.cn/post/6901853709819445262?searchId=20240403142552CE5BF360F0ED97752125)

[【Java】第一个 Spring 入门程序](https://juejin.cn/post/7297094079116345355#heading-9)

<!-- ## 什么是 IOC / DI
https://juejin.cn/post/7297002272986120230#heading-13

### IOC

### DI

https://juejin.cn/post/6901853709819445262?searchId=20240411171554B983B2D5DFD62117F11E#heading-7


1.注入bean
2.请求注释 @RestController  = @Controller+@ResponseBody
3.nginx


注解：
@Component 将当前类交给IOC容器管理
@Autowired 自动装配（依赖注入）

￼
Bean组件扫描
@SpringBootApplication 具有包扫描作用，默认扫描当前包及其子包

@Autowired 默认是按照类型(interface)进行，如果存在多个相同类型的bean， 將会错误
￼
@Primary 想要那个生效 就在那个Bean上书写
@Qulifier  在@Autowired注解上指定具体的bean @Qulifer(“类名首字母小写(默认)”)
@Resource 在@Autowired注解上指定具体的bean的name

@Resource是JDK提供 其他则是SpringBoot框架提供
￼
￼



open={visible} modal显示需要修改
bodyStyle移除
localStorage.getItem('antd-pro-authority')) 权限相关获取修改
const carryBookRole = JSON.parse(localStorage.getItem('user')).permissions.includes(
    'update book author',
  );

type="danger" 需要替换

access?.['off Shelf UGC']

type="primary"
              danger

现在使用antdesignpro组件库的ProFormDateTimePicker组件，需要禁选当前时间之前的时间，需要具体到年月日时分秒

@ant-design/pro-table
@ant-design/pro-form

~antd/es/style/themes/default.less

@umijs/preset-ui/lib/bubble/utils

from 'umi'

@ant-design/pro-components

1.框架升级的优点
2.新增两个部署节点，chapter内部新增切换按钮


 -->
