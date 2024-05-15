# Maven

## Maven 简介

### 概述

Maven 是一款基于 Java 的软件项目管理和构建工具。它跟npm工具一样都是依赖的管理工具，同时，它还包含了打包，编译，测试，发布等功能的像 webpack 的工具。

### 作用

1. 依赖管理
2. 统一项目结构
3. 项目构建

#### 依赖管理

为了方便管理依赖的资源(jar 包)，避免版本冲突问题，在 Maven 项目中，会有 pom.xml 文件去解决这个问题。

::: details pom.xml 配置文件基础结构
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- 模型版本。maven2.0必须是这样写，现在是maven2唯一支持的版本 -->
    <modelVersion>4.0.0</modelVersion>

    <!--父项目的坐标。如果项目中没有规定某个元素的值，那么父项目中的对应值即为项目的默认值。 坐标包括group ID，artifact ID和 version。 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <!-- 项目基本信息 -->
    <groupId>com.chulan</groupId>  <!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成， 如com.chulan，maven会将该项目打成的jar包放本地路径：/com/chulan -->
    <artifactId>springt-boot-demo</artifactId> <!-- 本项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 -->
    <version>0.0.1-SNAPSHOT</version> <!--版本号 -->
    <name>springt-boot-demo</name>
    <description>springt-boot-demo</description>

    <!-- 为 pom 定义一些常量,在pom中的其它地方可以直接引用 使用方式 如下 ：${file.encoding} -->
    <properties>
        <file.encoding>UTF-8</file.encoding>
        <java.version>22</java.version>
    </properties>

    <!--项目引入插件所需要的额外依赖 -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!-- 构建配置 -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```
:::

Maven 坐标体系

在 `<dependencies>` 部分中使用，以定义项目所需的外部依赖。

- `<groupId>` 组 ID，它通常表示组织或项目的反向域名，用于对依赖进行分组。
- `<artifactId>` 构件 ID，表示特定项目或模块的名称，是该依赖的基本标识符。
- `<version>` 版本号，指定所需依赖的具体版本。
- `<classifier>` 分类器，用来区分同一个版本的不同构件，例如不同平台的构件或包含不同资源的构件。(可选)
- `<type>` 类型，表示依赖的包装类型，默认为 jar，但也可以是 war、ear、pom 等。(可选)

参考: [Maven POM](https://www.runoob.com/maven/maven-pom.html)

#### 项目结构

::: details Maven 工程项目结构
```xml
|-- pom.xml                               # Maven 项目管理文件 
|-- src
    |-- main                              # 项目主要代码
    |   |-- java                          # Java 源代码目录
    |   |   `-- com/example/myapp         # 开发者代码主目录
    |   |       |-- controller            # 存放 Controller 层代码的目录
    |   |       |-- service               # 存放 Service 层代码的目录
    |   |       |-- dao                   # 存放 DAO 层代码的目录
    |   |       `-- model                 # 存放数据模型的目录
    |   |-- resources                     # 资源目录，存放配置文件、静态资源等
    |   |   |-- log4j.properties          # 日志配置文件
    |   |   |-- spring-mybatis.xml        # Spring Mybatis 配置文件
    |   |   `-- static                    # 存放静态资源的目录
    |   |       |-- css                   # 存放 CSS 文件的目录
    |   |       |-- js                    # 存放 JavaScript 文件的目录
    |   |       `-- images                # 存放图片资源的目录
    |   `-- webapp                        # 存放 WEB 相关配置和资源
    |       |-- WEB-INF                   # 存放 WEB 应用配置文件
    |       |   |-- web.xml               # Web 应用的部署描述文件
    |       |   `-- classes               # 存放编译后的 class 文件
    |       `-- index.html                # Web 应用入口页面
    `-- test                              # 项目测试代码
        |-- java                          # 单元测试目录
        `-- resources                     # 测试资源目录

```
:::

## Macos 快速安装

1. 下载安装包 [Apache Maven Project](https://maven.apache.org/download.cgi)

选择后缀名为tar.gz的版本

<Image src='./images/maven-1.png' />

2. 解压至自己想要存放目录位置

3. 配置环境变量

打开配置文件
```bash
open ~/.bash_profile
```

写入配置
```bash
#MAVEN_HOME
export MAVEN_HOME=/Users/chulan/project/java/apache-maven-3.9.6 #Maven文件夹的路径
export PATH=$PATH:$MAVEN_HOME/bin
```

激活配置
```bash
source ~/.bash_profile
```

4. 验证是否安装成功

```bash
mvn -v
```
<Image src='./images/maven-2.png' />

## IDE 配置 Maven

1. 设置 => 构建、执行、部署 => 构建工具 => Maven
<Image src='./images/maven-3.png' />