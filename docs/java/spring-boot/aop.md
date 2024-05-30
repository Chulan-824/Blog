<script setup>
import ImgAop1 from '../images/aop-1.png'
import ImgAop2 from '../images/aop-2.png'
import ImgAop3 from '../images/aop-3.png'
import ImgAop4 from '../images/aop-4.png'
</script>

# AOP

## 概述

AOP（Aspect Oriented Programming）即面向切面编程，AOP 是 OOP（面向对象编程）的一种延续，二者互补，并不对立。

AOP是一种编程范式，用于在不修改原始代码的情况下向现有应用程序添加新功能。这种编程方式将应用程序分成许多独立的部分，称为切面。这些切面可以在应用程序的不同位置进行编写和维护，从而提高了应用程序的可重用性和可维护性。

AOP 的目的是将横切关注点（如日志记录、事务管理、权限控制、接口限流、接口幂等等）从核心业务逻辑中分离出来，通过动态代理、字节码操作等技术，实现代码的复用和解耦，提高代码的可维护性和可扩展性。OOP 的目的是将业务逻辑按照对象的属性和行为进行封装，通过类、对象、继承、多态等概念，实现代码的模块化和层次化（也能实现代码的复用），提高代码的可读性和可维护性。

## 关键术语

- 横切关注点（cross-cutting concerns） ：多个类或对象中的公共行为（如日志记录、事务管理、权限控制、接口限流、接口幂等等）。
- 切面（Aspect）：对横切关注点进行封装的类，一个切面是一个类。切面可以定义多个通知，用来实现具体的功能。
- 连接点（JoinPoint）：连接点是方法调用或者方法执行时的某个特定时刻（如方法调用、异常抛出等）。
- 通知（Advice）：通知就是切面在某个连接点要执行的操作。通知有五种类型，分别是前置通知（Before）、后置通知（After）、返回通知（AfterReturning）、异常通知（AfterThrowing）和环绕通知（Around）。前四种通知都是在目标方法的前后执行，而环绕通知可以控制目标方法的执行过程。
- 切点（Pointcut）：一个切点是一个表达式，它用来匹配哪些连接点需要被切面所增强。切点可以通过注解、正则表达式、逻辑运算等方式来定义。比如 execution(_ com.xyz.service.._(..))匹配 com.xyz.service 包及其子包下的类或接口。
- 织入（Weaving）：织入是将切面和目标对象连接起来的过程，也就是将通知应用到切点匹配的连接点上。常见的织入时机有两种，分别是编译期织入（AspectJ）和运行期织入（Javac）。

## 日志案例

导入依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

定义相关代码

::: code-group

```java:line-numbers{3,12,34,49} [日志记录切面类]
@Slf4j
@Component
@Aspect //切面类
public class LogAspect {

  @Autowired
  private HttpServletRequest request;

  @Autowired
  private OperateLogMapper operateLogMapper;

  @Around("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public Object recordLog(ProceedingJoinPoint joinPoint) throws Throwable {
    //获取请求头中的jwt令牌, 解析令牌
    String jwt = request.getHeader("token");
    Jws<Claims> claimsJws = TokenUtil.parseClaim(jwt);

    String operateUserName = (String) claimsJws.getPayload().get("username");
    //操作时间
    LocalDateTime operateTime = LocalDateTime.now();

    //操作类名
    String className = joinPoint.getTarget().getClass().getName();

    //操作方法名
    String methodName = joinPoint.getSignature().getName();

    //操作方法参数
    Object[] args = joinPoint.getArgs();
    String methodParams = Arrays.toString(args);

    long begin = System.currentTimeMillis();
    //调用原始目标方法运行
    Object result = joinPoint.proceed();
    long end = System.currentTimeMillis();

    //方法返回值
    String returnValue = JSON.toJSONString(result);

    //操作耗时
    Long costTime = end - begin;

    //记录操作日志
    OperateLog operateLog = new OperateLog(null, operateUserName, operateTime, className, methodName, methodParams, returnValue, costTime);
    operateLogMapper.insert(operateLog);

    log.info("AOP记录操作日志: {}", operateLog);

    return result;
  }

}
```

```java:line-numbers{1,2} [自定义注解]
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Log {
}
```

```java:line-numbers [OperateLogMapper]
@Mapper
public interface OperateLogMapper {

  //插入日志数据
  @Insert("insert into operate_log (operate_user_name, operate_time, class_name, method_name, method_params, return_value, cost_time) " + "values (#{operateUserName}, #{operateTime}, #{className}, #{methodName}, #{methodParams}, #{returnValue}, #{costTime});")
  public void insert(OperateLog log);
}
```

```java:line-numbers [OperateLog]
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OperateLog {
  private Integer id; //ID
  private String operateUserName; //操作人
  private LocalDateTime operateTime; //操作时间
  private String className; //操作类名
  private String methodName; //操作方法名
  private String methodParams; //操作方法参数
  private String returnValue; //操作方法返回值
  private Long costTime; //操作耗时
}
```

```java:line-numbers{1} [controller]
  @Log
  @GetMapping
  public CommonResult getEmpList() {
    // do something...
  }
```

:::

在上述日志记录案例中，对应的概念点：

1. 横切关注点：日志记录行为
2. 连接点：需要记录日志的 controller 方法（getEmpList）
3. 通知：因为需要记录方法的执行时间，这里采用的是环绕通知（Around），recordLog 方法包含了横切关注点所需要的重复逻辑
4. 切点：@Around 注解的参数，采用的是通过注解形式的切入表达式
5. 切面：切点+通知 => 切面,当通知和切入点结合在一起，就形成了一个切面

## 通知类型

Spring中AOP的通知类型：

- @Around：环绕通知，此注解标注的通知方法在目标方法前、后都被执行
- @Before：前置通知，此注解标注的通知方法在目标方法前被执行
- @After ：后置通知，此注解标注的通知方法在目标方法后被执行，无论是否有异常都会执行
- @AfterReturning ： 返回后通知，此注解标注的通知方法在目标方法后被执行，有异常不会执行
- @AfterThrowing ： 异常后通知，此注解标注的通知方法发生异常后执行

### 案例

对于不同通知类型的的案例演示

```java
@Slf4j
@Component
@Aspect //切面类
public class LogAspectTest {

  //前置通知
  @Before("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public void before(JoinPoint joinPoint){
    log.info("before ...");
  }

  //环绕通知
  @Around("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    log.info("around before ...");

    //调用目标对象的原始方法执行
    Object result = proceedingJoinPoint.proceed();

    //原始方法如果执行时有异常，环绕通知中的后置代码不会在执行了

    log.info("around after ...");
    return result;
  }

  //后置通知
  @After("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public void after(JoinPoint joinPoint){
    log.info("after ...");
  }

  //返回后通知（程序在正常执行的情况下，会执行的后置通知）
  @AfterReturning("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public void afterReturning(JoinPoint joinPoint){
    log.info("afterReturning ...");
  }

  //异常通知（程序在出现异常的情况下，执行的后置通知）
  @AfterThrowing("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public void afterThrowing(JoinPoint joinPoint){
    log.info("afterThrowing ...");
  }
}
```

1. 没有异常情况下

<Image :src="ImgAop1" />

> 程序没有发生异常的情况下，@AfterThrowing标识的通知方法不会执行。

2. 出现异常情况

```java:line-numbers {14,15}
@Service
public class EmpServiceImp implements EmpService {
  @Autowired
  EmpMapper empMapper;

  @Override
  public List<Emp> getEmpList(
      EmpSearchDTO empSearchDTO,
      Integer page, Integer size
  ) {
    PageHelper.startPage(page, size);
    List emps = empMapper.getEmpList(empSearchDTO);

    //模拟异常
    int num = 10 / 0;

    return emps;
  }
}
```

<Image :src="ImgAop2" />

> @AfterReturning 标识的通知方法不会执行，@AfterThrowing标识的通知方法执行了
>
> @Around 环绕通知中原始方法调用时有异常，通知中的环绕后的代码逻辑也不会在执行了 （因为原始方法调用已经出异常了）

### 切入点表达式

切入点表达式：描述切入点方法的一种表达式，主要用来决定项目中的哪些方法需要加入通知

常见形式：

- execution(...)：根据方法的签名来匹配
- @annotation(...) ：根据注解匹配

#### execution

execution 主要根据方法的返回值、包名、类名、方法名、方法参数等信息来匹配，语法为：

```java
execution(访问修饰符?  返回值  包名.类名.?方法名(方法参数) throws 异常?)
```

其中带`?`的表示可以省略的部分

- 访问修饰符：可省略（比如: public、protected）
- 包名.类名： 可省略
- throws 异常：可省略（注意是方法上声明抛出的异常，不是实际抛出的异常）

```java
@Before("execution(void com.chulan.springbootdemo.service.imp.EmpServiceImp.getEmpList())")
```

可以使用通配符描述切入点

- `*` ：单个独立的任意符号，可以通配任意返回值、包名、类名、方法名、任意类型的一个参数，也可以通配包、类、方法名的一部分
- `..` ：多个连续的任意符号，可以通配任意层级的包，或任意类型、任意个数的参数

切入点表达式的语法规则：

1. 方法的访问修饰符可以省略
2. 返回值可以使用`*`号代替（任意返回值类型）
3. 包名可以使用`*`号代替，代表任意包（一层包使用一个`*`）
4. 使用`..`配置包名，标识此包以及此包下的所有子包
5. 类名可以使用`*`号代替，标识任意类
6. 方法名可以使用`*`号代替，表示任意方法
7. 可以使用 `*` 配置参数，一个任意类型的参数
8. 可以使用`..` 配置参数，任意个任意类型的参数

**切入点表达式示例**

- 省略方法的修饰符号：execution(void com.chulan.service.impl.DeptServiceImpl.delete(java.lang.Integer))
- 使用`*`代替返回值类型：execution(\* com.chulan.service.impl.DeptServiceImpl.delete(java.lang.Integer))
- 使用`*`代替包名（一层包使用一个`*`）：execution(_ com.chulan._.\*.DeptServiceImpl.delete(java.lang.Integer))
- 使用`..`省略包名：execution(\* com..DeptServiceImpl.delete(java.lang.Integer))
- 使用`*`代替类名：execution(_ com.._.delete(java.lang.Integer))
- 使用`*`代替方法名：execution(_ com.._.\*(java.lang.Integer))
- 使用 `*` 代替参数：execution(_ com.chulan.service.impl.DeptServiceImpl.delete(_))
- 使用`..`省略参数：execution(_ com.._.\*(..))

::: tip
根据业务需要，可以使用 且（&&）、或（||）、非（!） 来组合比较复杂的切入点表达式。

```java
execution(* com.chulan.service.DeptService.list(..)) || execution(* com.chulan.service.DeptService.delete(..))
```

:::

切入点表达式的书写建议：

- 所有业务方法名在命名时尽量规范，方便切入点表达式快速匹配。如：查询类方法都是 find 开头，更新类方法都是update开头

  :::code-group

  ```java [业务类]
  //业务类
  @Service
  public class DeptServiceImpl implements DeptService {
    public List<Dept> findAllDept() {
        //省略代码...
    }

    public Dept findDeptById(Integer id) {
        //省略代码...
    }

    public void updateDeptById(Integer id) {
        //省略代码...
    }

    public void updateDeptByMoreCondition(Dept dept) {
        //省略代码...
    }
    //其他代码...
  }
  ```

  ```java [execution]
  //匹配DeptServiceImpl类中以find开头的方法
  execution(* com.chulan.service.impl.DeptServiceImpl.find*(..))
  ```

  :::

- 描述切入点方法通常基于接口描述，而不是直接描述实现类，增强拓展性

  ```java
  execution(* com.chulan.service.DeptService.*(..))
  ```

- 在满足业务需要的前提下，尽量缩小切入点的匹配范围。如：包名匹配尽量不使用 ..，使用 \* 匹配单个包

  ```java
  execution(* com.chulan.*.*.DeptServiceImpl.find*(..))
  ```

#### @annotation

实现步骤：

1. 编写自定义注解
2. 在业务类要做为连接点的方法上添加自定义注解

### 抽取切入点表达式

上述案例的测试代码，每一个注解都指定了相同的切入点表达式

```java:line-numbers{2,5,8,11,14}
//前置通知
@Before("@annotation(com.chulan.springbootdemo.annotation.Log)")

//环绕通知
@Around("@annotation(com.chulan.springbootdemo.annotation.Log)")

//后置通知
@After("@annotation(com.chulan.springbootdemo.annotation.Log)")

//返回后通知（程序在正常执行的情况下，会执行的后置通知）
@AfterReturning("@annotation(com.chulan.springbootdemo.annotation.Log)")

//异常通知（程序在出现异常的情况下，执行的后置通知）
@AfterThrowing("@annotation(com.chulan.springbootdemo.annotation.Log)")
```

Spring 对于上述情况提供了 **@PointCut** 注解，该注解的作用是将公共的切入点表达式抽取出来，需要用到时引用该切入点表达式即可。

```java:line-numbers{7,8,11,17,31,37,43}
@Slf4j
@Component
@Aspect //切面类
public class LogAspectTest {

  //切入点方法（公共的切入点表达式）
  @Pointcut("@annotation(com.chulan.springbootdemo.annotation.Log)")
  private void pt(){}

  //前置通知
  @Before("pt()")
  public void before(JoinPoint joinPoint){
    log.info("before ...");
  }

  //环绕通知
  @Around("pt()")
  public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    log.info("around before ...");

    //调用目标对象的原始方法执行
    Object result = proceedingJoinPoint.proceed();

    //原始方法如果执行时有异常，环绕通知中的后置代码不会在执行了

    log.info("around after ...");
    return result;
  }

  //后置通知
  @After("pt()")
  public void after(JoinPoint joinPoint){
    log.info("after ...");
  }

  //返回后通知（程序在正常执行的情况下，会执行的后置通知）
  @AfterReturning("pt()")
  public void afterReturning(JoinPoint joinPoint){
    log.info("afterReturning ...");
  }

  //异常通知（程序在出现异常的情况下，执行的后置通知）
  @AfterThrowing("pt()")
  public void afterThrowing(JoinPoint joinPoint){
    log.info("afterThrowing ...");
  }
}
```

::: tip
当切入点方法使用 **private** 修饰时，仅能在当前切面类中引用该表达式，当外部其他切面类中也要引用当前类中的切入点表达式，就需要把 private 改为 **public**，而在引用的时候，具体的语法为：**全类名.方法名()**
:::

```java
@Slf4j
@Component
@Aspect
public class LogAspectTest2 {
  //引用 LogAspectTest 切面类中的切入点表达式
  @Before("com.chulan.springbootdemo.aop.LogAspectTest.pt()")
  public void before(){
      log.info("LogAspectTest2 -> before ...");
  }
}
```

## 通知顺序

当在项目开发当中，我们定义了多个切面类，而多个切面类中多个切入点都匹配到了同一个目标方法。此时当目标方法在运行的时候，这多个切面类当中的这些通知方法都会运行。

:::code-group

```java:line-numbers{15,21,28,35,41,47} [LogAspectTest1]
@Slf4j
@Component
@Aspect //切面类
public class LogAspectTest1 {

  //切入点方法（公共的切入点表达式）
  @Pointcut("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public void pt(){

  }

  //前置通知
  @Before("pt()")
  public void before(JoinPoint joinPoint){
    log.info("LogAspectTest1 -> before ...");
  }

  //环绕通知
  @Around("pt()")
  public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    log.info("LogAspectTest1 -> around before ...");

    //调用目标对象的原始方法执行
    Object result = proceedingJoinPoint.proceed();

    //原始方法如果执行时有异常，环绕通知中的后置代码不会在执行了

    log.info("LogAspectTest1 -> around after ...");
    return result;
  }

  //后置通知
  @After("pt()")
  public void after(JoinPoint joinPoint){
    log.info("LogAspectTest1 -> after ...");
  }

  //返回后通知（程序在正常执行的情况下，会执行的后置通知）
  @AfterReturning("pt()")
  public void afterReturning(JoinPoint joinPoint){
    log.info("LogAspectTest1 -> afterReturning ...");
  }

  //异常通知（程序在出现异常的情况下，执行的后置通知）
  @AfterThrowing("pt()")
  public void afterThrowing(JoinPoint joinPoint){
    log.info("LogAspectTest1 -> afterThrowing ...");
  }
}
```

```java:line-numbers{15,21,28,35,41,47} [LogAspectTest2]
@Slf4j
@Component
@Aspect //切面类
public class LogAspectTest2 {

  //切入点方法（公共的切入点表达式）
  @Pointcut("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public void pt(){

  }

  //前置通知
  @Before("pt()")
  public void before(JoinPoint joinPoint){
    log.info("LogAspectTest2 -> before ...");
  }

  //环绕通知
  @Around("pt()")
  public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    log.info("LogAspectTest2 -> around before ...");

    //调用目标对象的原始方法执行
    Object result = proceedingJoinPoint.proceed();

    //原始方法如果执行时有异常，环绕通知中的后置代码不会在执行了

    log.info("LogAspectTest2 -> around after ...");
    return result;
  }

  //后置通知
  @After("pt()")
  public void after(JoinPoint joinPoint){
    log.info("LogAspectTest2 -> after ...");
  }

  //返回后通知（程序在正常执行的情况下，会执行的后置通知）
  @AfterReturning("pt()")
  public void afterReturning(JoinPoint joinPoint){
    log.info("LogAspectTest2 -> afterReturning ...");
  }

  //异常通知（程序在出现异常的情况下，执行的后置通知）
  @AfterThrowing("pt()")
  public void afterThrowing(JoinPoint joinPoint){
    log.info("LogAspectTest2 -> afterThrowing ...");
  }
}
```

```java:line-numbers{15,21,28,35,41,47} [LogAspectTest3]
@Slf4j
@Component
@Aspect //切面类
public class LogAspectTest3 {

  //切入点方法（公共的切入点表达式）
  @Pointcut("@annotation(com.chulan.springbootdemo.annotation.Log)")
  public void pt(){

  }

  //前置通知
  @Before("pt()")
  public void before(JoinPoint joinPoint){
    log.info("LogAspectTest3 -> before ...");
  }

  //环绕通知
  @Around("pt()")
  public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    log.info("LogAspectTest3 -> around before ...");

    //调用目标对象的原始方法执行
    Object result = proceedingJoinPoint.proceed();

    //原始方法如果执行时有异常，环绕通知中的后置代码不会在执行了

    log.info("LogAspectTest3 -> around after ...");
    return result;
  }

  //后置通知
  @After("pt()")
  public void after(JoinPoint joinPoint){
    log.info("LogAspectTest3 -> after ...");
  }

  //返回后通知（程序在正常执行的情况下，会执行的后置通知）
  @AfterReturning("pt()")
  public void afterReturning(JoinPoint joinPoint){
    log.info("LogAspectTest3 -> afterReturning ...");
  }

  //异常通知（程序在出现异常的情况下，执行的后置通知）
  @AfterThrowing("pt()")
  public void afterThrowing(JoinPoint joinPoint){
    log.info("LogAspectTest3 -> afterThrowing ...");
  }
}
```

:::

<Image :src="ImgAop3" />

通过以上程序运行可以看出在不同切面类中，默认按照切面类的类名字母排序：

- 目标方法前的通知方法：字母排名靠前的先执行
- 目标方法后的通知方法：字母排名靠前的后执行

如果我们想控制通知的执行顺序有两种方式：

1. 修改切面类的类名（这种方式非常繁琐、而且不便管理）
2. 使用 Spring 提供的 **@Order** 注解

:::code-group

```java{4} [LogAspectTest1]
@Slf4j
@Component
@Aspect
@Order(3) //切面类的执行顺序（前置通知：数字越小先执行; 后置通知：数字越小越后执行）
public class LogAspectTest1 {
  // ...
}
```

```java{4} [LogAspectTest2]
@Slf4j
@Component
@Aspect
@Order(2) //切面类的执行顺序（前置通知：数字越小先执行; 后置通知：数字越小越后执行）
public class LogAspectTest2 {
  // ...
}
```

```java{4} [LogAspectTest3]
@Slf4j
@Component
@Aspect
@Order(1) //切面类的执行顺序（前置通知：数字越小先执行; 后置通知：数字越小越后执行）
public class LogAspectTest3 {
  // ...
}
```

:::

<Image :src="ImgAop4" />
