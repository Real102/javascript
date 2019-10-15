# 创建对象的8种方式及其优缺点

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