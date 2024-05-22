<script setup>
import ImgMysql1 from '../images/mysql-1.png'
import ImgMysql2 from '../images/mysql-2.png'
import ImgMysql3 from '../images/mysql-3.png'
import ImgMysql4 from '../images/mysql-4.png'
import ImgMysql5 from '../images/mysql-5.png'
import ImgMysql6 from '../images/mysql-6.png'
import ImgMysql7 from '../images/mysql-7.png'
import ImgMysql8 from '../images/mysql-8.png'
</script>

# MySQL

## 安装

一、登录官网下载 [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)

<Image :src="ImgMysql1" />

二、一直 next 到 Configuration，选择 Use Strong Password Encryption，设置密码完成安装

<Image :src="ImgMysql2" />

三、配置环境变量

```shell
open ~/.bash_profile
```

```shell
export PATH=${PATH}:/usr/local/mysql/bin
```

四、测试

查看版本

```shell
mysql --version
```

连接

```shell
mysql -u root -p
```

退出

```shell
quit
```

## Spring-Boot 配置 MySQL

新建 Spring-boot 项目

<Image :src="ImgMysql3" />

添加 MySQL 的 Java 连接驱动依赖和 JDBC Starter。

<Image :src="ImgMysql4" />

pom.xml 对应依赖

```xml
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <scope>runtime</scope>
</dependency>

<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```

在 application.yml 文件中添加数据库链接驱动信息

```yml
spring:
  datasource:
    username: root
    password: 12344321
    url: jdbc:mysql://localhost:3306/mybatis
    driver-class-name: com.mysql.cj.jdbc.Driver
```

- url
  - jdbc:mysql://：表示使用 MySQL 的 JDBC 连接。
  - localhost：数据库服务器运行在本地主机。
  - 3306：MySQL 的默认端口。
  - mybatis：要连接的数据库名称。

编写测试代码

```java
package com.example.springbootmysql;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.sql.DataSource;

@SpringBootTest
class SpringBootMysqlApplicationTests {

  @Resource
  DataSource dataSource;

  @Test
  void contextLoadsOne() throws Exception {
      System.out.println("获取的数据库连接为:" + dataSource.getConnection());
  }
}
```

<Image :src="ImgMysql5" />

## IntelliJ IDEA 连接 MySQL

<Image :src="ImgMysql6" />

<Image :src="ImgMysql7" />

<Image :src="ImgMysql8" />
