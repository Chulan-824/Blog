(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{437:function(t,s,a){t.exports=a.p+"assets/img/1.09b650cc.png"},572:function(t,s,a){"use strict";a.r(s);var n=a(64),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"手写-数组map"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#手写-数组map"}},[t._v("#")]),t._v(" 手写-数组map")]),t._v(" "),n("h2",{attrs:{id:"草案分析"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#草案分析"}},[t._v("#")]),t._v(" 草案分析")]),t._v(" "),n("p",[t._v("依照 "),n("a",{attrs:{href:"https://tc39.es/ecma262/#sec-array.prototype.map",target:"_blank",rel:"noopener noreferrer"}},[t._v("ecma262 草案"),n("OutboundLink")],1),t._v("，实现的map的规范如下:")]),t._v(" "),n("p",[n("img",{attrs:{src:a(437),alt:""}})]),t._v(" "),n("h2",{attrs:{id:"代码实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#代码实现"}},[t._v("#")]),t._v(" 代码实现")]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("map")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("callbackFn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" thisArg "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理数组类型异常")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("||")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("TypeError")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("\"Cannot read property 'map' of null or undefined\"")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 处理回调类型异常")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callbackFn"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'[object Function]'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("TypeError")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callbackFn "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("' is not a function'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 防止 Array.protptype.map.call('String', fn) 这样调用 并且配合下面 O.length >>> 0")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("O")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("Object")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" thisArg\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// >>> 保证为数字并且取整")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" len "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("O")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">>>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("A")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("len"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" k "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" k "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" len"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" k"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("k "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("O")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" kValue "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("O")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" mappedValue "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("callbackFn")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("T")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" kValue"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("O")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("A")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("k"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" mappedValue\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token constant"}},[t._v("A")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:"细节注意"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#细节注意"}},[t._v("#")]),t._v(" 细节注意")]),t._v(" "),n("h3",{attrs:{id:"类型判断"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#类型判断"}},[t._v("#")]),t._v(" 类型判断")]),t._v(" "),n("p",[t._v("数组类型异常判断，防止通过 Array.prototype.map.call(null, fn) 形式调用")]),t._v(" "),n("h3",{attrs:{id:"长度取整"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#长度取整"}},[t._v("#")]),t._v(" 长度取整")]),t._v(" "),n("p",[n("code",[t._v(">>>")]),t._v(" 无符号右移 数字取整")]),t._v(" "),n("h3",{attrs:{id:"属性判断"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#属性判断"}},[t._v("#")]),t._v(" 属性判断")]),t._v(" "),n("ul",[n("li",[t._v("遍历时判断用 "),n("code",[t._v("in")]),t._v(" 而不是 "),n("code",[t._v("hasOwnProperty")]),t._v(", "),n("code",[t._v("in")]),t._v(" 可以查找到原型链上的属性，而 "),n("code",[t._v("hasOwnProperty")]),t._v(" 只能查找私有属性")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("MyArray")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyArray")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Array")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" myArray "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyArray")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" newMyArray "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" myArray"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" e "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nconsole"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v("'newMyArray'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" newMyArray"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [2, 4, 6]")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//如果用 hasOwnProperty 判断，结果则是 [empty × 3]")]),t._v("\n")])])]),n("ul",[n("li",[t._v("也可以提高对 "),n("code",[t._v("[1, , , , , , 2, , , , , 3, , , , , 4]")]),t._v(" 稀疏数组处理的性能")])]),t._v(" "),n("h2",{attrs:{id:"参考文章"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://juejin.cn/post/6844903986479251464#heading-25",target:"_blank",rel:"noopener noreferrer"}},[t._v("(建议精读)原生JS灵魂之问(中)，检验自己是否真的熟悉JavaScript？"),n("OutboundLink")],1)]),t._v(" "),n("SideTitle",{attrs:{page:t.$page}})],1)}),[],!1,null,null,null);s.default=r.exports}}]);