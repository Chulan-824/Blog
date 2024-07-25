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

## 查询功能

如果查询出的数据只有一条，可以通过

1. 实体类对象接收
2. List 集合接收
3. Map 集合接收，结果`{password=123456, sex=男, id=1, age=23, username=admin}`

如果查询出的数据有多条，一定不能用实体类对象接收，会抛异常 TooManyResultsException，可以通过

1. 实体类类型的 List 集合接收
2. Map 类型的 List 集合接收
3. 在 mapper 接口的方法上添加@MapKey注解

针对获取参数推荐采用 实例类型/@Params 标识两种方法

### 查询一个实体类对象

:::code-group

```java [java]
/**
 * 根据用户id查询用户信息
 * @param id
 * @return
 */
User getUserById(@Param("id") int id);
```

````xml [xml]
User getUserById(@Param("id") int id);
```<!--User getUserById(@Param("id") int id);-->
<select id="getUserById" resultType="User">
	select * from t_user where id = #{id}
</select>
````

:::

### 查询一个List集合

:::code-group

```java [java]
/**
 * 查询所有用户信息
 * @return
 */
List<User> getUserList();
```

```xml [xml]
<!--List<User> getUserList();-->
<select id="getUserList" resultType="User">
	select * from t_user
</select>
```

:::

### 查询单个数据

:::code-group

```java [java]
/**
 * 查询用户的总记录数
 * @return
 * 在MyBatis中，对于Java中常用的类型都设置了类型别名
 * 例如：java.lang.Integer-->int|integer
 * 例如：int-->_int|_integer
 * 例如：Map-->map,List-->list
 */
int getCount();
```

```xml [xml]
<!--int getCount();-->
<select id="getCount" resultType="_integer">
	select count(id) from t_user
</select>
```

:::

### 查询一条数据为map集合

:::code-group

```java [java]
/**
 * 根据用户id查询用户信息为map集合
 * @param id
 * @return
 */
Map<String, Object> getUserToMap(@Param("id") int id);
```

```xml [xml]
<!--Map<String, Object> getUserToMap(@Param("id") int id);-->
<select id="getUserToMap" resultType="map">
	select * from t_user where id = #{id}
</select>
<!--结果：{password=123456, sex=男, id=1, age=23, username=admin}-->
```

:::

### 查询多条数据为map集合

:::code-group

```java [方法一java]
/**
 * 查询所有用户信息为map集合
 * @return
 * 将表中的数据以map集合的方式查询，一条数据对应一个map；若有多条数据，就会产生多个map集合，此时可以将这些map放在一个list集合中获取
 */
List<Map<String, Object>> getAllUserToMap();
```

```xml [方法一xml]
<!--Map<String, Object> getAllUserToMap();-->
<select id="getAllUserToMap" resultType="map">
	select * from t_user
</select>
<!--
	结果：
	[{password=123456, sex=男, id=1, age=23, username=admin},
	{password=123456, sex=男, id=2, age=23, username=张三},
	{password=123456, sex=男, id=3, age=23, username=张三}]
-->
```

```java [方法二java]
/**
 * 查询所有用户信息为map集合
 * @return
 * 将表中的数据以map集合的方式查询，一条数据对应一个map；
 * 若有多条数据，就会产生多个map集合，并且最终要以一个map的方式返回数据
 * 此时需要通过@MapKey注解设置map集合的键，值是每条数据所对应的map集合
 */
@MapKey("id")
Map<String, Object> getAllUserToMap();
```

```xml [方法二xml]
<!--Map<String, Object> getAllUserToMap();-->
<select id="getAllUserToMap" resultType="map">
	select * from t_user
</select>
<!--
	结果：
	{
	1={password=123456, sex=男, id=1, age=23, username=admin},
	2={password=123456, sex=男, id=2, age=23, username=张三},
	3={password=123456, sex=男, id=3, age=23, username=张三}
	}
-->
```

:::

## 特殊SQL的执行

### 模糊查询

:::code-group

```java [java]
/**
 * 根据用户名进行模糊查询
 * @param username
 * @return java.util.List<com.atguigu.mybatis.pojo.User>
 */
List<User> getUserByLike(@Param("username") String username);
```

```xml [xml]
<!--List<User> getUserByLike(@Param("username") String username);-->
<select id="getUserByLike" resultType="User">
	<!--select * from t_user where username like '%${mohu}%'-->
	<!--select * from t_user where username like concat('%',#{mohu},'%')-->
	select * from t_user where username like "%"#{mohu}"%"
</select>
```

:::

> 其中`select * from t_user where username like "%"#{mohu}"%"`是最常用的

### 批量删除

只能使用 ${}，如果使用 #{}，则解析后的sql语句为 `delete from t_user where id in ('1,2,3')`，这样是将 `1,2,3` 看做是一个整体，只有id为 `1,2,3` 的数据会被删除。

正确的语句应该是 `delete from t_user where id in (1,2,3)`，或者 `delete from t_user where id in ('1','2','3')`

:::code-group

```java [java]
/**
 * 根据id批量删除
 * @param ids
 * @return int
 */
int deleteMore(@Param("ids") String ids);
```

```xml [xml]
<delete id="deleteMore">
	delete from t_user where id in (${ids})
</delete>
```

:::

### 动态设置表名

:::code-group

```java [java]
/**
 * 查询指定表中的数据
 * @param tableName
 * @return java.util.List<com.atguigu.mybatis.pojo.User>
 */
List<User> getUserByTable(@Param("tableName") String tableName);
```

```xml [xml]
<!--List<User> getUserByTable(@Param("tableName") String tableName);-->
<select id="getUserByTable" resultType="User">
	select * from ${tableName}
</select>
```

:::

### 添加功能获取自增的主键

在 mapper.xml 中设置两个属性

- useGeneratedKeys：设置使用自增的主键
- keyProperty：因为增删改有统一的返回值是受影响的行数，因此只能将获取的自增的主键放在传输的参数 user 对象的某个属性中

:::code-group

```java [java]
/**
 * 添加用户信息
 * @param user
 */
void insertUser(User user);
```

```xml [xml]
<!--void insertUser(User user);-->
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
	insert into t_user values (null,#{username},#{password},#{age},#{sex},#{email})
</insert>
```

:::

## 映射处理

### resultType

若字段名和实体类中的属性名不一致，但是字段名符合数据库的规则（使用\_），实体类中的属性名符合Java的规则（使用驼峰）。此时也可通过以下两种方式处理字段名和实体类中的属性的映射关系

:::code-group

```xml [方法一：字段起别名]
<!--List<Emp> getAllEmp();-->
<select id="getAllEmp" resultType="Emp">
  select eid,emp_name empName,age,sex,email from t_emp
</select>
```

```xml [方法二：全局配置]
<!-- 可以在MyBatis的核心配置文件中的`setting`标签中，设置一个全局配置信息mapUnderscoreToCamelCase
可以在查询表中数据时，自动将_类型的字段名转换为驼峰，例如：字段名user_name
设置了mapUnderscoreToCamelCase，此时字段名就会转换为userName。[核心配置文件详解](#核心配置文件详解) -->
<settings>
  <setting name="mapUnderscoreToCamelCase" value="true"/>
</settings>
```

:::

### 自定义映射 resultMap

resultMap处理字段和属性的映射关系

- resultMap：设置自定义映射

  - id：表示自定义映射的唯一标识，不能重复
  - type：查询的数据要映射的实体类的类型

- id：设置主键的映射关系
- result：设置普通字段的映射关系
  - property：设置映射关系中实体类中的属性名
  - column：设置映射关系中表中的字段名

若字段名和实体类中的属性名不一致，则可以通过 resultMap 设置自定义映射，**即使字段名和属性名一致的属性也要映射，也就是全部属性都要列出来**

```xml
<!--List<Emp> getAllEmp();-->
<select id="getAllEmp" resultMap="empResultMap">
	select * from t_emp
</select>

<resultMap id="empResultMap" type="Emp">
	<id property="eid" column="eid"></id>
	<result property="empName" column="emp_name"></result>
	<result property="age" column="age"></result>
	<result property="sex" column="sex"></result>
	<result property="email" column="email"></result>
</resultMap>
```

resultMap 一般**多用于**处理多对一或者一对多的关系

### 多对一映射处理

查询员工信息以及员工所对应的部门信息

:::code-group

```java [Emp]
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emp {
    private Integer id; //ID
    private String username; //用户名
    private String password; //密码
    private String name; //姓名
    private Short gender; //性别 , 1 男, 2 女
    private String image; //图像url
    private Short job; //职位 , 1 班主任 , 2 讲师 , 3 学工主管 , 4 教研主管 , 5 咨询师
    private LocalDate entrydate; //入职日期
    private Integer deptId; //部门ID
    private LocalDateTime createTime; //创建时间
    private LocalDateTime updateTime; //修改时间

    private Dept dept;
}
```

```java [Dept]
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dept {
  private Integer id;
  private String name;

  private List<Emp> emps;
}
```

:::

:::code-group

```xml [方法一: 级联方式] {18,19}
<select id="getEmpAndDept" resultMap="EmpDeptResultMap">
    select emp.*, dept.id as dept_id, dept.name as dept_name from emp LEFT JOIN dept on emp.dept_id = dept.id where
    emp.id = #{id}
</select>

<resultMap id="EmpDeptResultMap" type="com.chulan.springbootdemo.po.Emp">
    <id property="id" column="id"/>
    <result property="username" column="username"/>
    <result property="password" column="password"/>
    <result property="name" column="name"/>
    <result property="gender" column="gender"/>
    <result property="image" column="image"/>
    <result property="job" column="job"/>
    <result property="entrydate" column="entrydate"/>
    <result property="deptId" column="dept_id"/>
    <result property="createTime" column="create_time"/>
    <result property="updateTime" column="update_time"/>
    <result property="dept.id" column="dept_id"></result>
    <result property="dept.name" column="dept_name"></result>
</resultMap>
```

```xml [方法二: association] {18-21}
<select id="getEmpAndDept" resultMap="EmpDeptResultMap">
    select emp.*, dept.id as dept_id, dept.name as dept_name from emp LEFT JOIN dept on emp.dept_id = dept.id where
    emp.id = #{id}
</select>

<resultMap id="EmpDeptResultMap" type="com.chulan.springbootdemo.po.Emp">
    <id property="id" column="id"/>
    <result property="username" column="username"/>
    <result property="password" column="password"/>
    <result property="name" column="name"/>
    <result property="gender" column="gender"/>
    <result property="image" column="image"/>
    <result property="job" column="job"/>
    <result property="entrydate" column="entrydate"/>
    <result property="deptId" column="dept_id"/>
    <result property="createTime" column="create_time"/>
    <result property="updateTime" column="update_time"/>
    <association property="dept" javaType="com.chulan.springbootdemo.po.Dept">
        <id property="id" column="dept_id"/>
        <result property="name" column="dept_name"/>
    </association>
</resultMap>
```

```xml [方法三: 分步查询一]
<!--分步查询-->
<!--第一步查询员工信息-->
<!--Emp getEmpAndDeptByStepOne(@Param("id") Integer id);-->
<select id="getEmpAndDeptByStepOne" resultMap="empAndDeptByStepResultMap">
    select * from emp where id = #{id}
</select>

<resultMap id="empAndDeptByStepResultMap" type="com.chulan.springbootdemo.po.Emp">
    <id property="id" column="id"/>
    <result property="username" column="username"/>
    <result property="password" column="password"/>
    <result property="name" column="name"/>
    <result property="gender" column="gender"/>
    <result property="image" column="image"/>
    <result property="job" column="job"/>
    <result property="entrydate" column="entrydate"/>
    <result property="deptId" column="dept_id"/>
    <result property="createTime" column="create_time"/>
    <result property="updateTime" column="update_time"/>
    <association
            property="dept"
            select="com.chulan.springbootdemo.mapper.EmpMapper.getEmpAndDeptByStepTwo"
            column="dept_id"></association>
</resultMap>
```

```xml [方法三: 分步查询二]
<!--第二步查询部门信息-->
<!--Dept getEmpAndDeptByStepTwo(@Param("deptId") Integer deptId);-->
<select id="getEmpAndDeptByStepTwo" resultMap="empAndDeptByStepTwoResultMap">
    select id as dept_id, name as dept_name from dept where id = #{deptId}
</select>

<resultMap id="empAndDeptByStepTwoResultMap" type="com.chulan.springbootdemo.po.Dept">
    <id property="id" column="dept_id"></id>
    <result property="name" column="dept_name"></result>
</resultMap>
```

:::

association: 处理多对一的映射关系

- property：需要处理多对的映射关系的属性名
- javaType：该属性的类型
- select：设置分布查询的sql的唯一标识（namespace.SQLId或mapper接口的全类名.方法名）
- column：设置分步查询的条件

### 一对多映射处理

:::code-group

```xml [方法一: collection] {8-20}
<select id="getDeptAndEmp" resultMap="DeptAndEmpResultMap">
    SELECT *, emp.id as emp_id FROM dept LEFT JOIN emp on dept.id = emp.dept_id where dept.id = #{id}
</select>

<resultMap id="DeptAndEmpResultMap" type="com.chulan.springbootdemo.po.Dept">
    <id property="id" column="id"></id>
    <result property="name" column="name"></result>
    <collection property="emps" ofType="com.chulan.springbootdemo.po.Emp">
        <id property="id" column="emp_id"/>
        <result property="username" column="username"/>
        <result property="password" column="password"/>
        <result property="name" column="name"/>
        <result property="gender" column="gender"/>
        <result property="image" column="image"/>
        <result property="job" column="job"/>
        <result property="entrydate" column="entrydate"/>
        <result property="deptId" column="dept_id"/>
        <result property="createTime" column="create_time"/>
        <result property="updateTime" column="update_time"/>
    </collection>
</resultMap>
```

```xml [方法二: 分步查询一]
<!--第一步查询部门信息-->
<!--Dept getDeptAndEmpByStepOne(@Param("id") Integer id);-->
<select id="getDeptAndEmpByStepOne" resultMap="deptAndEmpResultMap">
    select * from dept where id = #{id}
</select>

<resultMap id="deptAndEmpResultMap" type="com.chulan.springbootdemo.po.Dept">
    <id property="id" column="id"></id>
    <result property="name" column="name"></result>
    <collection property="emps"
                select="com.chulan.springbootdemo.mapper.EmpMapper.getDeptAndEmpByStepTwo"
                column="id"></collection>
</resultMap>
```

```xml [方法二: 分步查询二]
<!--第二步查询员工信息-->
<!--List<Emp> getDeptAndEmpByStepTwo(@Param("deptId") Integer deptId);-->
<select id="getDeptAndEmpByStepTwo" resultType="com.chulan.springbootdemo.po.Emp">
    select * from emp where dept_id = #{deptId}
</select>
```

:::

## 相关资料

[Mybatis 类型别名](https://mybatis.org/mybatis-3/zh_CN/configuration.html#typeAliases)
