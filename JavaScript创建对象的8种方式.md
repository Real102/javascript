# 创建对象的8种方式

new Object()
---
直接通过构造函数创建一个新对象

```javascript
    var obj = new Object();
    //等同于 var obj = {}
```
使用字面量的方式更加简单，优点是 __足够简单__ ，缺点是 __每个对象都是独立的__


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

工厂模式虽然解决了 __多个相似对象__ 的问题，但却没有解决 __对象识别__ 的问题，即如何知道一个对象的类型


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


使用构造函数的主要问题，就是每个方法都要在每个实例上重新创建一遍，就比如 person1 和 person2 都有一个名为 sayName() 的方法，但两个方法不是同一个 function 实例：
```javascript
this.sayName() = new Function(alert(this.name));    //先声明函数在逻辑上是等价的
```
以这种方式创建函数，会导致不同的作用域链和标识符解析，但创建 Function 新实例的机制仍是相同的。因此，不同实例上的同名函数是不相等的：
```javascript
alert(person1.sayName == person2.sayName);  // false
```


原型模式
---
我们创建的每一个函数都有一个 prototype （原型）属性，这个属性是一个指针，指向一个对象，而这个对象包含可以由特定类型的所有实例共享的属性和方法

```javascript
function Person() {
}
//第一种写法
Person.prototype.name = 'John';
Person.prototype.age = 25;
Person.prototype.job = 'Front-end Development Engineer';
Person.prototype.sayName = function() {
    alert(this.name);
}
var person1 = new Person();
person1.sayName();                              // 'John'
var person2 = new Person();
person2.sayName();                              // 'John'
alert(person1.sayName == person2.sayName);      // true

//第二种写法：
Person.prototype = {
    constructor: Person,//以对象字面量形式创建对象时，需要加上 constructor，否则 constructor 不指向 Person
    name: 'John',
    age: 25,
    job: 'Front-end Development Engineer',
    sayName: function() {
        alert(this.name);
    }
}
```

在此，我们将 sayName() 方法和所有属性直接添加到 Person 的 prototype 属性中，创建的新对象会具有相同的属性和方法。但与构造函数模式不同的是，新对象的这些属性和方法是由所有实例共享的。

原型模式省略了为构造函数传递初始化参数这一环节，结果所有实例在默认情况下都取得相同的属性值，同时因为原型模式共享的特性，导致在其包含引用类型值（数组或对象）的时候，其中一个实例修改了引用类型值的属性时，其他实例对应的属性值也会相应改变，而这个问题正是导致很少有人单独使用原型模式的原因所在


组合使用构造函数模式和原型模式
---
创建自定义类型的最常见方式。构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每一个实例都会有自己的一份实例属性的副本，同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传参数

```javascript
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends: ['chery', 'kit']
}

Person.prototype = {
    constructor: Person,
    sayName: function() {
        alert(this.name);
    }
}

var person1 = new Person('John', 25, 'Front-end Development Engineer');
var person2 = new Person('core', 27, 'Back-end Development Engineer');

person1.friends.push('Karsa');
alert(person1.friends);                         // 'chery', 'kit', 'karsa'
alert(person2.friends);                         // 'chery', 'kit'
alert(person1.friends === person2.friends);     // false
alert(person1.sayName === person2.sayName);     // true
```

这种构造函数与原型混成的模式，是目前在 ECMAScript 中使用最广泛、认同度最高的一种创建自定义类型的方法。可以说，这是用来定义引用类型的一种默认模式。


动态原型模式
---
动态原型模式将所有信息都封装在了构造函数中，而通过在构造函数中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的有点。换句话说，可以通过检查某个应该存在的方法是否有效，来决定是否需要初始化原型。

```javascript
function Person(name, age, job) {
    //属性
    this,name = name;
    this.age = age;
    this.job = job;
    // 方法
    if(typeof this.sayName != 'function') {
        Person.prototype.sayName = function() {
            alert(this.name)
        }
    }
}

var friend = new Person('John', 25, 'Front-end Development Engineer');
friend.sayName();
```

这里只在 sayName() 方法不存在的情况下，才会将它添加到原型中。这段代码只会在初次调用构造函数时开会执行。
使用动态原型模式时，不能使用对象字面量重写原型，如果在已经创建了实例的情况下重写实例，那么就会切断现有实例与新原型之间的联系。


寄生构造函数模式
---
寄生构造函数的基本思想是创建一个函数，改函数的作用仅仅是封装创建对象的代码，然后再返回新创建的对象；但从表面上看，这个函数又很像是典型的构造函数：

```javascript
function Person(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        alert(this.name);
    }
    return o;
}

var friend = new Person('John', 25, 'Front-end Development Engineer');
friend.sayName();                       // John
```

除了使用 new 操作符并把使用的包装函数叫做构造函数之外，这个模式跟工厂模式其实是一模一样的。构造函数在不返回值的情况下，默认会返回新对象实例。而通过在构造函数的末尾添加一个 return 语句时，可以重写调用构造函数时返回的值。


稳妥构造函数模式
---
道格拉斯·克罗克福德发明了 JavaScript 中的稳妥对象这个概念。所谓稳妥对象指的是没有公共属性，而且其方法也不引用 this 的对象。稳妥对象最适合在一些安全环境中（这些环境中会禁止使用 this 和 new ）或者在防止数据被其他应用程序改动时使用。
稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的实例方法不引用 this；二是不适用 new 操作符调用构造函数

```javascript
function Person(name, age, job) {
    //创建要返回的对象
    var o = new Object();
    o.sayName = function() {
        alert(name);
    }
    return o;
}
```

注意在这种模式创建的对象中，除了使用 sayName() 方法之外，没有其他办法访问 name 的值。可以像下面这样使用稳妥的 Person 构造函数：

```javascript
var friend = Person('John', 25, 'Front-end Development Engineer');
friend.sayName();           // 'John'
```

这样在 friend 中保存的是一个稳妥对象，而除了调用 sayName() 方法外，没有别的方式可以访问其数据成员。
与寄生构造函数模式类似，使用稳妥构造函数模式创建的对象与构造函数之间也没有什么关系，因此 instanceof 操作符对这种对象也没有什么意义





------

Object.create()
---
```javascript
const person = {
    isHuman: false,
    printIntroduction: function() {
        alert(`My name is ${this.name}, Am I human ? ${this.isHuman}`);
    }
}
const me = Object.create(person);
me.name = 'core';               // 'name' is a property set on 'me', but not on 'person'
me.isHuman = true;              // inherited properties can be overwritten
me.printIntroduction();         // "My name is core. Am I human? true"
```

Object.create() 方法创建一个新对象，并使用现有的对象来提供新创建的对象的 \_\_proto\_\_