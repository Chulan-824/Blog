# 拦截器

## 作用

- 登录验证，判断用户是否登录
- 权限验证，判断用户是否有权限访问资源，如校验token
- 日志记录，记录请求操作日志（用户ip，访问时间等），以便统计请求访问量
- 处理cookie、本地化、国际化、主题等
- 性能监控，监控请求处理时长等

## 实现一个登录 LoggerInterceptor

### 定义拦截器

```java
public class LoginCheckInterceptor implements HandlerInterceptor {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    System.out.println("目标资源方法运行前运行, 返回true: 放行, 放回false, 不放行");
    return true;
  }

  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    System.out.println("目标资源方法运行后运行...");
  }

  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    System.out.println("视图渲染完毕后运行, 最后运行...");
  }
}
```

- preHandle方法：目标资源方法执行前执行。 返回true：放行/返回false：不放行
- ​postHandle方法：目标资源方法执行后执行
- ​afterCompletion方法：视图渲染完毕后执行，最后执行

### 注册配置拦截器

实现 `WebMvcConfigurer` 接口，并重写 `addInterceptors` 方法

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

  //自定义的拦截器对象
  @Autowired
  private LoginCheckInterceptor loginCheckInterceptor;

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    //注册自定义拦截器对象
    registry.addInterceptor(loginCheckInterceptor)
        .addPathPatterns("/**")//设置拦截器拦截的请求路径（ /** 表示拦截所有请求）
        .excludePathPatterns("/login");//设置不拦截的请求路径
  }
}
```

在拦截器中除了可以设置 `/**` 拦截所有资源外，还有一些常见拦截路径设置：

| 拦截路径    | 含义                 | 举例                                                |
| ----------- | -------------------- | --------------------------------------------------- |
| /\*         | 一级路径             | 能匹配/depts，/emps，/login，不能匹配 /depts/1      |
| /\*\*       | 任意级路径           | 能匹配/depts，/depts/1，/depts/1/2                  |
| /depts/\*   | /depts下的一级路径   | 能匹配/depts/1，不能匹配/depts/1/2，/depts          |
| /depts/\*\* | /depts下的任意级路径 | 能匹配/depts，/depts/1，/depts/1/2，不能匹配/emps/1 |

### 完善 preHandle 方法

```java
@Override
public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
  //1.获取请求头中的令牌（token）。
  String token = request.getHeader("token");
  log.info("token: {}", token);
  //2.判断令牌是否存在，如果不存在，返回错误结果（未登录）。
  if (!StringUtils.hasLength(token)) {
    log.info("请求头token为空,返回未登录的信息");
    CommonResult error = CommonResult.unauthorized(null);
    String notLogin = JSON.toJSONString(error);
    response.getWriter().write(notLogin);
    return false;
  }

  //3.解析token，如果解析失败，返回错误结果（未登录）。
  try {
    TokenUtil.parseClaim(token);
  } catch (Exception e) {//jwt解析失败
    e.printStackTrace();
    log.info("解析令牌失败, 返回未登录错误信息");
    CommonResult error = CommonResult.forbidden(null);
    String notLogin = JSON.toJSONString(error);
    response.getWriter().write(notLogin);
    return false;
  }

  //4.放行。
  log.info("令牌合法, 放行");
  return true;
}
```

## 全局异常处理

我们该怎么样定义全局异常处理器？

- 定义全局异常处理器非常简单，就是定义一个类，在类上加上一个注解 @RestControllerAdvice，加上这个注解就代表我们定义了一个全局异常处理器。
- 在全局异常处理器当中，需要定义一个方法来捕获异常，在这个方法上需要加上注解 @ExceptionHandler。通过 @ExceptionHandler 注解当中的 value 属性来指定我们要捕获的是哪一类型的异常。

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(Exception.class)//捕获所有异常
  public CommonResult ex(Exception ex){
      ex.printStackTrace();
      return CommonResult.failed("对不起,操作失败,请联系管理员");
  }
}
```

> @RestControllerAdvice = @ControllerAdvice + @ResponseBody
>
> 处理异常的方法返回值会转换为 json 后再响应给前端
