<script setup>
import ImgLombok1 from '../images/lombok-1.png'
</script>

# Lombok

## 概述

Lombok 在官网是这样作自我介绍的：

> Project Lombok is a java library that automatically plugs into your editor and build tools, spicing up your java. Never write another getter or equals method again, with one annotation your class has a fully featured builder, automate your logging variables, and much more.

Lombok 是一个 java 库，它会自动插入您的编辑器和构建工具，为您的 java 增添趣味。再也不用编写另一个 getter 或 equals 方法，只需一个注释，您的类就拥有一个功能齐全的构建器、自动记录变量等等。

## 集成 Lombok

::: code-group

```xml [Maven 项目]
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.32</version>
</dependency>
```

:::

Intellij IDEA 安装 `Lombok` 插件

<Image :src="ImgLombok1" />

## 常用注解

### @Getter / @Setter

自动添加 getter、setter 方法

::: code-group

```java{1,2} [编译前]
@Getter
@Setter
public class UserLombok {
  private String name;
  private int age;
}
```

```java{8-22} [编译后]
public class UserLombok {
  private String name;
  private int age;

  public UserLombok() {
  }

  public String getName() {
      return this.name;
  }

  public int getAge() {
      return this.age;
  }

  public void setName(final String name) {
      this.name = name;
  }

  public void setAge(final int age) {
      this.age = age;
  }
}
```

:::

### @ToString

::: code-group

```java{1} [编译前]
@ToString
public class UserLombok {
  private String name;
  private int age;
}
```

```java{8-10} [编译后]
public class UserLombok {
  private String name;
  private int age;

  public UserLombok() {
  }

  public String toString() {
      return "UserLombok(name=" + this.name + ", age=" + this.age + ")";
  }
}
```

:::

### @Data

@Data = @Getter + @Setter + @ToString + @EqualsAndHashCode + @RequiredArgsConstructor

::: code-group

```java{1} [编译前]
@Data
public class UserLombok {
  private String name;
  private int age;
}
```

```java{8-67} [编译后]
public class UserLombok {
  private String name;
  private int age;

  public UserLombok() {
  }

  public String getName() {
    return this.name;
  }

  public int getAge() {
    return this.age;
  }

  public void setName(final String name) {
    this.name = name;
  }

  public void setAge(final int age) {
    this.age = age;
  }

  public boolean equals(final Object o) {
    if (o == this) {
      return true;
    } else if (!(o instanceof UserLombok)) {
      return false;
    } else {
      UserLombok other = (UserLombok)o;
      if (!other.canEqual(this)) {
        return false;
      } else if (this.getAge() != other.getAge()) {
        return false;
      } else {
        Object this$name = this.getName();
        Object other$name = other.getName();
        if (this$name == null) {
          if (other$name != null) {
              return false;
          }
        } else if (!this$name.equals(other$name)) {
          return false;
        }

        return true;
      }
    }
  }

  protected boolean canEqual(final Object other) {
    return other instanceof UserLombok;
  }

  public int hashCode() {
    int PRIME = true;
    int result = 1;
    result = result * 59 + this.getAge();
    Object $name = this.getName();
    result = result * 59 + ($name == null ? 43 : $name.hashCode());
    return result;
  }

  public String toString() {
    String var10000 = this.getName();
    return "UserLombok(name=" + var10000 + ", age=" + this.getAge() + ")";
  }
}
```

:::

### @Slf4j

`@Slf4j` 可以用来生成注解对象，你可以根据自己的日志实现方式来选用不同的注解，比如说：`@Log`、`@Log4j`、`@Log4j2`、`@Slf4j` 等。

::: code-group

```java{1} [编译前]
@Slf4j
public class Log4jDemo {
  public static void main(String[] args) {
    log.info("level:{}","info");
    log.warn("level:{}","warn");
    log.error("level:{}", "error");
  }
}
```

```java{2} [编译后]
public class Log4jDemo {
  private static final Logger log = LoggerFactory.getLogger(Log4jDemo.class);

  public Log4jDemo() {
  }

  public static void main(String[] args) {
    log.info("level:{}", "info");
    log.warn("level:{}", "warn");
    log.error("level:{}", "error");
  }
}
```

:::

### @Builder

`@Builder` 注解可以用来通过建造者模式来创建对象，这样就可以通过链式调用的方式进行对象赋值，非常的方便。

作用:

- 生成静态内部类
- 生成构建方法
- 生成build()方法
- 支持复杂对象构建

::: code-group

```java{1,8} [编译前]
@Builder
@ToString
public class User {
  private String name;
  private int age;

  public static void main(String[] args) {
    User demo = User.builder().age(18).name("鸡你太美").build();
    System.out.println(demo);
  }
}
```

```java{15-17,23-46} [编译后]
public class User {
  private String name;
  private int age;

  public static void main(String[] args) {
    User demo = builder().age(18).name("鸡你太美").build();
    System.out.println(demo);
  }

  User(final String name, final int age) {
    this.name = name;
    this.age = age;
  }

  public static UserBuilder builder() {
    return new UserBuilder();
  }

  public String toString() {
    return "User(name=" + this.name + ", age=" + this.age + ")";
  }

  public static class UserBuilder {
    private String name;
    private int age;

    UserBuilder() {
    }

    public UserBuilder name(final String name) {
      this.name = name;
      return this;
    }

    public UserBuilder age(final int age) {
      this.age = age;
      return this;
    }

    public User build() {
      return new User(this.name, this.age);
    }

    public String toString() {
      return "User.UserBuilder(name=" + this.name + ", age=" + this.age + ")";
    }
  }
}
```

:::

> 由于 @Data 和 @Builder 配合使用的时候会导致无参构造方法丢失，所以我们主动声明了无参构造方法，并使用 @Tolerate 注解来告诉 lombok 请允许我们的无参构造方法存在（没有无参构造方法的时候会导致 ORM 映射出错）

```java{1-2,7-8}
@Data
@Builder
public class User {
  private String name;
  private int age;

  @Tolerate
  public User() {}

  public static void main(String[] args) {
    User demo = User.builder().age(18).name("鸡你太美").build();
    System.out.println(demo);
  }
}
```
