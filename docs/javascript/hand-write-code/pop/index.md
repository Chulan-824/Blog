# 手写-数组pop

## 草案分析

依照 [ecma262 草案](https://tc39.es/ecma262/#sec-array.prototype.pop)，实现的pop的规范如下:

![](./images/1.png)

## 代码实现

```js
Array.prototype.pop = function() {
  let O = Object(this);
  let len = this.length >>> 0;
  if (len === 0) {
    O.length = 0;
    return undefined;
  }
  len --;
  let value = O[len];
  delete O[len];
  O.length = len;
  return value;
}
```

## 参考文章

[(建议精读)原生JS灵魂之问(中)，检验自己是否真的熟悉JavaScript？](https://juejin.cn/post/6844903986479251464#heading-25)



<SideTitle :page="$page" />