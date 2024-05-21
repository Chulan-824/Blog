<script setup>
import ImgConfiguration1 from '../images/configuration-1.png'
import ImgConfiguration2 from '../images/configuration-2.png'
</script>

# 配置文件

## yml 配置文件

spring-boot 项目创建完成后在自带的 application.properties 文件中进行属性配置，除此之外，还支持 yml 格式的配置文件

::: code-group

```properties [application.properties]
server.port=8080
server.address=127.0.0.1
```

```yml [application.yml ]
server:
  port: 8080
  address: 127.0.0.1
```

```yaml [application.yaml ]
server:
  port: 8080
  address: 127.0.0.1
```

:::

yml 格式的配置文件，后缀名有两种：

- **yml（推荐）**
- yaml

常见配置文件格式对比：

<Image :src="ImgConfiguration1" />

### 特点

我们可以看到配置同样的数据信息，yml格式的数据有以下特点：

- 容易阅读
- 容易与脚本语言交互
- 以数据为核心，重数据轻格式

### 基本语法

- 大小写敏感
- 数值前边必须有空格，作为分隔符
- 使用缩进表示层级关系，缩进时，不允许使用 Tab 键，只能用空格（idea 中会自动将 Tab 转换为空格）
- 缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
- `#`表示注释，从这个字符一直到行尾，都会被解析器忽略

<Image :src="ImgConfiguration2" />

### 常见数据格式

::: code-group

```yml [对象/Map集合]
user:
  name: zhangsan
  age: 18
  password: 123456
```

```yml [数组/List/Set集合]
hobby: 
  - java
  - game
  - sport
```

:::