# 创建对象的8种方式及其优缺点

new Object()
---
直接通过构造函数创建一个新对象

```javascript
    var obj = new Object();
    //等同于 var obj = {}
```
使用字面量的方式更加简单，优点是 ___足够简单___ ，缺点是 ___每个对象都是独立的___


工厂模式
---

```javascript
function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        alert(this.name);
    }
    return o;
}

var person1 = createPerson('John', 25, 'Front-end Development Engineer');
var person2 = createPerson('core', 27, 'Back-end Development Engineer');
```

函数 createPerson() 能够根据接收的参数来创建一个包含所有必要信息的 Person 对象  
可以无数次调用这个函数，每次都会返回一个包含三个属性一个方法的对象。

工厂模式虽然解决了 ___多个相似对象___ 的问题，但却没有解决 ___对象识别___ 的问题，即如何知道一个对象的类型


构造函数模式
---
ECMAScript中的构造函数可以用来创建特定类型的对象。像 object 和 Array 这样的原生构造函数，在运行时会自动出现在执行环境中。从而定义自定义对象类型的属性和方法。例如，可以使用构造函数模式将前面的例子重写如下：

```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        alert(this.name);
    }
}

var person1 = new Person('John', 25, 'Front-end Development Engineer');
var person2 = new Person('core', 27, 'Back-end Development Engineer');
// alert(person1 instanceof Person)   // true
// alert(person2 instanceof Person)   // true
```
与 createPerson() 对比，除了部分相同外，还有以下不同之处：
1. 没有显示地创建对象
2. 直接将属性和方法赋给了 ___this___ 对象
3. 没有 ___return___ 语句


要创建 Person 的新实例，必须使用 new 操作符。用 new 调用构造函数实际上会经历以下四个步骤：
1. 创建一个新对象
2. 将构造函数的作用于赋给新对象（因此 ___this___ 就指向了这个新对象）
3. 执行构造函数中的代码（为这个新属性添加属性）
4. 返回新对象


使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍，就比如 person1 和 person2 都有一个名为 sayName() 的方法，但两个方法不是同一个 function 实例 
    this.sayName() = new Function(alert(this.name));    //先声明函数在逻辑上是等价的
以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建 Function 新实例的机制仍是相同的。因此，不同实例上的同名函数是不相等的。
    alert(person1.sayName == person2.sayName);  // false




