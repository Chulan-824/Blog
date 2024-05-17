# 继承

## 原型链继承

主要思想就是`通过原型继承多个引用类型的属性和方法`

### 实现

```js
function Parent() {
  this.property = true;
}

Parent.prototype.getParentValue = function() {
  return this.property;
}

function Child() {
 this.childProperty = false;
};

Child.prototype = new Parent();

Child.prototype.getChildValue = function() {
  return this.childProperty;
}

let instance1 = new Child();
console.log(instance1.getParentValue()); // true

let instance2 = new Child();
instance2.property = false
console.log(instance2.getParentValue()); // false
```

### 默认原型

实际上，原型链中还有一环。默认情况下，所有引用类型都继承自 Object，这也是通过原型链实
现的。任何函数的默认原型都是一个 Object 的实例，这意味着这个实例有一个内部指针指向
Object.prototype。

以上面例子可知，Child 继承 Parent，而 Parent 继承 Object。在调用 instance.toString()时，实
际上调用的是保存在 Object.prototype 上的方法。

### 原型与继承关系

确定原型与实例的关系可以通过两种方式来确定。

> 第一种方式是使用 instanceof 操作符，如果一个实例的原型链中出现过相应的构造函数，则 instanceof 返回 true。如下例所示：

```js
console.log(instance instanceof Object); // true 
console.log(instance instanceof Parent); // true 
console.log(instance instanceof Child); // true
```

> 第二种方式是使用 isPrototypeOf() 方法。原型链中的每个原型都可以调用这个方法，如下例所示：

```js
console.log(Object.prototype.isPrototypeOf(instance)); // true 
console.log(SuperType.prototype.isPrototypeOf(instance)); // true 
console.log(SubType.prototype.isPrototypeOf(instance)); // true
```

### 关于方法

子类有时候需要覆盖父类的方法，或者增加父类没有的方法。为此，这些方法必须在原型赋值之后再添加到原型上。来看下面的例子：

```js
function Parent() { 
 this.property = true; 
} 
Parent.prototype.getParentValue = function() { 
 return this.property; 
}; 
function Child() { 
 this.childproperty = false; 
} 
// 继承 Parent 
Child.prototype = new Parent(); 
// 新方法
Child.prototype.getChildValue = function () { 
 return this.childproperty; 
}; 
// 覆盖已有的方法
Child.prototype.getParentValue = function () { 
 return false; 
}; 
let instance = new Child(); 
console.log(instance.getParentValue()); // false
```

需要注意，以对象字面量方式创建原型方法会破坏之前的原型链，因为这相当于重写了原型链。下面是一个例子：

```js
function Parent() { 
  this.property = true; 
} 
Parent.prototype.get = function() { 
  return this.property; 
}; 
function Child() { 
  this.childproperty = false; 
}
 // 继承 Parent 
Child.prototype = new Parent(); 
// 通过对象字面量添加新方法，这会导致上一行无效
Child.prototype = { 
 getSubValue() { 
  return this.childproperty; 
 }, 
 someOtherMethod() { 
  return false; 
 } 
}; 
let instance = new Child(); 
console.log(instance.get()); // 出错！
```

### 原型链的问题
> 引用值共享
原型链虽然是实现继承的强大工具，但它也有问题。主要问题出现在原型中包含`引用值`的时候，原型中包含的`引用值`会在所有实例间`共享`，这也是为什么属性通常会在构造函数中定义而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个类型的实例。这意味着原先的实例属性摇身一变成为了原型属性。下面的例子揭示了这个问题：

```js
function Parent() { 
  this.colors = ["red", "blue", "green"]; 
 } 
 function Child() {} 
 // 继承 Parent 
 Child.prototype = new Parent(); 
 let instance1 = new Child(); 
 instance1.colors.push("black"); 
 console.log(instance1.colors); // "red,blue,green,black" 
 let instance2 = new Child(); 
 console.log(instance2.colors); // "red,blue,green,black"
```

> 子类型在实例化时不能给父类型的构造函数传参



## 盗用构造函数继承

为了解决原型包含引用值导致的继承问题，一种叫作`盗用构造函数`（constructor stealing）的技术在开发社区流行起来（这种技术有时也称作`对象伪装`或`经典继承`）。基本思路很简单：在子类构造函数中调用父类构造函数。

```js
function Parent() { 
  this.colors = ["red", "blue", "green"]; 
} 
function Child() { 
  // 继承 Parent 
  Parent.call(this); 
} 
let instance1 = new Child(); 
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
let instance2 = new Child(); 
console.log(instance2.colors); // "red,blue,green"
```

### 传递参数

相比于使用原型链，盗用构造函数的一个优点就是可以在子类构造函数中向父类构造函数传参。

```js
function Parent(name){ 
  this.name = name; 
} 
function Child() { 
// 继承 Parent 并传参
Parent.call(this, "Nicholas"); 
// 实例属性
this.age = 29; 
} 
let instance = new Child(); 
console.log(instance.name); // "Nicholas"; 
console.log(instance.age); // 29 
```

### 盗用构造函数的问题

盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。由于存在这些问题，盗用构造函数基本上也不能单独使用。

优点：

> 1. 可以在子类构造函数中向父类传参数
> 2. 父类的引用属性不会被共享

缺点：

> 1. 子类不能访问父类原型上定义的方法（即不能访问Parent.prototype上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化

## 组合继承

组合继承（有时候也叫伪经典继承）综合了`原型链`和`盗用构造函数`，将两者的优点集中了起来。基
本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。

```js
function Parent(name){ 
  this.name = name; 
  this.colors = ["red", "blue", "green"]; 
} 
Parent.prototype.sayName = function() { 
  console.log(this.name); 
}; 
function Child(name, age){ 
  // 继承属性
  Parent.call(this, name); // 第二次调用 Parent()
  this.age = age; 
} 
// 继承方法
Child.prototype = new Parent(); // 第一次调用 Parent()
Child.prototype.sayAge = function() { 
  console.log(this.age); 
}; 
let instance1 = new Child("Nicholas", 29);  
instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
instance1.sayName(); // "Nicholas"; 
instance1.sayAge(); // 29 
let instance2 = new Child("Greg", 27); 
console.log(instance2.colors); // "red,blue,green" 
instance2.sayName(); // "Greg";
```

优点：

> 1. 父类的方法可以复用
> 2. 可以在Child构造函数中向Parent构造函数中传参
> 3. 父类构造函数中的引用属性不会被共享

缺点：

> 1. 父构造函数之中会被调用两次（一次在是创建子类原型时调用，另一次是在子类构造函数中调用）

## 原型式继承

即使不自定义类型也可以通过原型实现对象之间的信息共享

```js
function object(o) { 
 function F() {} 
 F.prototype = o; 
 return new F(); 
}
```

这个 object()函数会创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个临时类型的一个实例。本质上，object()是对传入的对象执行了一次`浅复制`

```js
let person = { 
  name: "Nicholas", 
  friends: ["Shelby", "Court", "Van"] 
}; 
let person1 = object(person); 
person1.name = "Greg"; 
person1.friends.push("Rob"); 
let person2 = object(person); 
person2.name = "Linda"; 
person2.friends.push("Barbie"); 
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
```

优点：

> 1. 父类方法可复用

缺点:

> 1. 父类的引用会被所有子类所共享
> 2. 子类实例不能向父类传参

> ES5的Object.create()方法在只有第一个参数时，与这里的object()方法效果相同

## 寄生式继承

与原型式继承比较接近的一种继承方式是寄生式继承（parasitic inheritance），的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

```js
function createAnother(original){ 
    let clone = object(original); // 通过调用函数创建一个新对象
    clone.sayHi = function() { // 以某种方式增强这个对象
    console.log("hi"); 
 }; 
 return clone; // 返回这个对象
}

let person = { 
 name: "Nicholas", 
 friends: ["Shelby", "Court", "Van"] 
}; 
let anotherPerson = createAnother(person); 
anotherPerson.sayHi(); // "hi" 
```

注意: 通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。

## 寄生式组合继承

通过盗用构造函数继承属性，但使用混合式原型链继承方法。基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本。说到底就是使用寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。寄生式组合继承的基本模式如下所示：

```js
function inheritPrototype(Child, Parent) { 
  let prototype = object(Parent.prototype); // 创建对象
  prototype.constructor = Child; // 增强对象 
  Child.prototype = prototype; // 赋值对象
}

function Parent(name) { 
  this.name = name; 
  this.colors = ["red", "blue", "green"]; 
 } 

Parent.prototype.sayName = function() { 
  console.log(this.name); 
}; 

function Child(name, age) { 
  Parent.call(this, name);
  this.age = age; 
} 

inheritPrototype(Child, Parent); 

Child.prototype.sayAge = function() { 
 console.log(this.age); 
};
```

优点：

> 1. 只调用一次父类构造函数
> 2. Child可以向Parent传参
> 3. 父类方法可以复用
> 4. 父类的引用属性不会被共享

> 寄生式组合继承可以算是引用类型继承的最佳模式

## 总结

| 模式             | 优点                                                         | 缺点                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 原型链继承       | 1. 父类方法可以复用                                          | 1. 父类的所有引用属性会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响 <br> 2. 子类型实例不能给父类型构造函数传参 |
| 盗用构造函数继承 | 1. 可以在子类构造函数中向父类传参数 <br> 2. 父类的引用属性不会被共享 | 1. 子类不能访问父类原型上定义的方法（即不能访问Parent.prototype上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化 |
| 组合继承         | 1. 父类的方法可以复用 <br>2. 可以在Child构造函数中向Parent构造函数中传参 <br > 3. 父类构造函数中的引用属性不会被共享 | 1. 父构造函数之中会被调用两次（一次在是创建子类原型时调用，另一次是在子类构造函数中调用） |
| 原型式继承       | 1. 父类方法可复用                                            | 1. 父类的引用会被所有子类所共享 <br>2. 子类实例不能向父类传参 |
| 寄生式继承       |                                                              |                                                              |
| 寄生式组合继承   | 1. 只调用一次父类构造函数<br/>2. Child可以向Parent传参 <br > 3. 父类方法可以复用 <br> 4. 父类的引用属性不会被共享 |                                                              |

## 参考文章

《JavaScript高级程序设计第4版》

[JS继承 原型链继承、构造函数继承、组合继承、原型继承、寄生式继承、寄生组合继承](https://juejin.cn/post/6914216540468576263#heading-4)



