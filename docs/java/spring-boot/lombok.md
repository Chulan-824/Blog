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
