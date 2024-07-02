# Mybatis

## 历史

- MyBatis 最初是Apache的一个开源项目 iBatis, 2010 年 6 月这个项目由 Apache Software Foundation 迁移到了 Google Code。随着开发团队转投 Google Code 旗下，iBatis3.x 正式更名为 MyBatis。代码于 2013 年 11 月迁移到 Github

- iBatis 一词来源于“internet”和“abatis”的组合，是一个基于 Java 的持久层框架。iBatis 提供的持久层框架包括 SQL Maps 和 Data Access Objects（DAO）

## 特性

1. MyBatis 是支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架
2. MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集
3. MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和 Java 的 POJO（Plain Old Java Objects，普通的 Java 对象）映射成数据库中的记录
4. MyBatis 是一个 半自动的 ORM（Object Relation Mapping）框架

## 核心配置文件详解

::: details mybatis-config.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//MyBatis.org//DTD Config 3.0//EN"
        "http://MyBatis.org/dtd/MyBatis-3-config.dtd">
<configuration>
    <!--引入properties文件，此时就可以${属性名}的方式访问属性值-->
    <properties resource="jdbc.properties"></properties>
    <settings>
        <!--将表中字段的下划线自动转换为驼峰-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <!--开启延迟加载-->
        <setting name="lazyLoadingEnabled" value="true"/>
    </settings>
    <typeAliases>
        <!--
        typeAlias：设置某个具体的类型的别名
        属性：
        type：需要设置别名的类型的全类名
        alias：设置此类型的别名，且别名不区分大小写。若不设置此属性，该类型拥有默认的别名，即类名
        -->
        <!--<typeAlias type="com.atguigu.mybatis.bean.User"></typeAlias>-->
        <!--<typeAlias type="com.atguigu.mybatis.bean.User" alias="user">
        </typeAlias>-->
        <!--以包为单位，设置改包下所有的类型都拥有默认的别名，即类名且不区分大小写-->
        <package name="com.atguigu.mybatis.bean"/>
    </typeAliases>
    <!--
    environments：设置多个连接数据库的环境
    属性：
	    default：设置默认使用的环境的id
    -->
    <environments default="mysql_test">
        <!--
        environment：设置具体的连接数据库的环境信息
        属性：
	        id：设置环境的唯一标识，可通过environments标签中的default设置某一个环境的id，表示默认使用的环境
        -->
        <environment id="mysql_test">
            <!--
            transactionManager：设置事务管理方式
            属性：
	            type：设置事务管理方式，type="JDBC|MANAGED"
	            type="JDBC"：设置当前环境的事务管理都必须手动处理
	            type="MANAGED"：设置事务被管理，例如spring中的AOP
            -->
            <transactionManager type="JDBC"/>
            <!--
            dataSource：设置数据源
            属性：
	            type：设置数据源的类型，type="POOLED|UNPOOLED|JNDI"
	            type="POOLED"：使用数据库连接池，即会将创建的连接进行缓存，下次使用可以从缓存中直接获取，不需要重新创建
	            type="UNPOOLED"：不使用数据库连接池，即每次使用连接都需要重新创建
	            type="JNDI"：调用上下文中的数据源
            -->
            <dataSource type="POOLED">
                <!--设置驱动类的全类名-->
                <property name="driver" value="${jdbc.driver}"/>
                <!--设置连接数据库的连接地址-->
                <property name="url" value="${jdbc.url}"/>
                <!--设置连接数据库的用户名-->
                <property name="username" value="${jdbc.username}"/>
                <!--设置连接数据库的密码-->
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <!--引入映射文件-->
    <mappers>
        <!-- <mapper resource="UserMapper.xml"/> -->
        <!--
        以包为单位，将包下所有的映射文件引入核心配置文件
        注意：
			1. 此方式必须保证mapper接口和mapper映射文件必须在相同的包下
			2. mapper接口要和mapper映射文件的名字一致
        -->
        <package name="com.atguigu.mybatis.mapper"/>
    </mappers>
</configuration>
```

:::

## 增删改查

::: code-group

```xml [添加]
<!--int insertUser();-->
<insert id="insertUser">
	insert into t_user values(null,'admin','123456',23,'男','12345@qq.com')
</insert>
```

```xml [删除]
<!--int deleteUser();-->
 <delete id="deleteUser">
  delete from t_user where id = 6
 </delete>
```

```xml [修改]
<!--int updateUser();-->
 <update id="updateUser">
  update t_user set username = '张三' where id = 5
 </update>
```

```xml [查询一个实体类对象]
<!--User getUserById();-->
<select id="getUserById" resultType="com.atguigu.mybatis.bean.User">
	select * from t_user where id = 2
</select>
```

```xml [查询集合]
<!--List<User> getUserList();-->
<select id="getUserList" resultType="com.atguigu.mybatis.bean.User">
	select * from t_user
</select>
```

:::

> [!TIP]
>
> 1. 查询的标签select必须设置属性resultType或resultMap，用于设置实体类和数据库表的映射关系
>
> - resultType：自动映射，用于属性名和表中字段名一致的情况
> - resultMap：自定义映射，用于一对多或多对一或字段名和属性名不一致的情况
>
> 2. 当查询的数据为多条时，不能使用实体类作为返回值，只能使用集合，否则会抛出异常TooManyResultsException  
>    但是若查询的数据只有一条，可以使用实体类或集合作为返回值

## 获取参数

MyBatis 获取参数值的两种方式：${} 和 #{}

- ${} 的本质就是字符串拼接，#{} 的本质就是占位符赋值
- ${} 使用字符串拼接的方式拼接sql，若为字符串类型或日期类型的字段进行赋值时，需要手动加单引号；但是 #{} 使用占位符赋值的方式拼接 sql，此时为字符串类型或日期类型的字段进行赋值时，可以自动添加单引号

### 单个字面量类型的参数

若 mapper 接口中的方法参数为单个的字面量类型，此时可以使用 ${} 和 #{} 任意的名称（最好见名识意）获取参数的值，注意 ${} 需要手动加单引号

```xml
<!--User getUserByUsername(String username);-->
<select id="getUserByUsername" resultType="User">
	select * from t_user where username = #{username}
</select>
```

```xml
<!--User getUserByUsername(String username);-->
<select id="getUserByUsername" resultType="User">
	select * from t_user where username = '${username}'
</select>
```

### 多个字面量类型的参数

若 mapper 接口中的方法参数为多个时，此时 MyBatis `会自动将这些参数放在一个 map 集合中`

```xml
<!--User checkLogin(String username,String password);-->
<select id="checkLogin" resultType="User">
	select * from t_user where username = #{arg0} and password = #{arg1}
</select>
```

```xml
<!--User checkLogin(String username,String password);-->
<select id="checkLogin" resultType="User">
	select * from t_user where username = '${param1}' and password = '${param2}'
</select>
```

> [!TIP]
>
> 1. 以arg0,arg1...为键，以参数为值；
> 2. 以param1,param2...为键，以参数为值；

### map集合类型的参数

手动创建 map 集合，通过map 集合的键就可以获取相对应的值

:::code-group

```xml [xml]
<!--User checkLoginByMap(Map<String,Object> map);-->
<select id="checkLoginByMap" resultType="User">
	select * from t_user where username = #{username} and password = #{password}
</select>
```

```java [Test]
@Test
public void checkLoginByMap() {
	SqlSession sqlSession = SqlSessionUtils.getSqlSession();
	ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
	Map<String,Object> map = new HashMap<>();
	map.put("usermane","admin");
	map.put("password","123456");
	User user = mapper.checkLoginByMap(map);
	System.out.println(user);
}
```

:::

### 实体类类型的参数

通过访问实体类对象中的属性名获取属性值

:::code-group

```xml [xml]
<!--int insertUser(User user);-->
<insert id="insertUser">
	insert into t_user values(null,#{username},#{password},#{age},#{sex},#{email})
</insert>
```

```java [Test]
@Test
public void insertUser() {
	SqlSession sqlSession = SqlSessionUtils.getSqlSession();
	ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
	User user = new User(null,"Tom","123456",12,"男","123@321.com");
	mapper.insertUser(user);
}
```

:::

### 使用 @Param 标识参数

通过 @Param 注解标识 mapper 接口中的方法参数，此时，会将这些参数放在 map 集合中

1. 以 @Param 注解的 value 属性值为键，以参数为值；
2. 以 param1,param2...为键，以参数为值；

:::code-group

```xml [xml]
<!--User CheckLoginByParam(@Param("username") String username, @Param("password") String password);-->
<select id="CheckLoginByParam" resultType="User">
  select * from t_user where username = #{username} and password = #{password}
</select>
```

```java [Test]
@Test
public void checkLoginByParam() {
	SqlSession sqlSession = SqlSessionUtils.getSqlSession();
	ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
	mapper.CheckLoginByParam("admin","123456");
}
```

:::

### 总结

针对获取参数推荐采用 实例类型/@Params 标识两种方法
