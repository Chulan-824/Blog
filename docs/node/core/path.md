<!--
 * @Descripttion: 
 * @Author: voanit
 * @Date: 2022-05-16 15:40:16
 * @LastEditors: voanit
 * @LastEditTime: 2022-05-16 16:10:34
-->
# path模块

path属于nodejs内置模块，通过require导入之后使用。

主要作用: 处理文件/目录的路径

常用API
- basename() 获取路径中基础名称
- dirname() 获取路径中目录名称
- extname() 获取路径中扩展名称
- isAbsolute() 获取路径是否为绝对路径
- join() 拼接多个路径片段
- resolve() 返回绝对路径
- parse() 解析路径
- format() 序列化路径
- normalize() 规范化路径

## basename