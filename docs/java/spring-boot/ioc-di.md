# IOC / DI

## 什么是 IOC / DI
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



