function Foo() {
    getName = function () {
        console.log(1)
    }
    return this
}
Foo.getName = function () {
    console.log(2)
}
Foo.prototype.getName = function () {
    console.log(3)
}
var getName = function () {
    console.log(4)
}
function getName() {
    console.log(5)
}
Foo.getName() // 2
getName() // 4
Foo().getName() // 1
new Foo.getName() // 2
new Foo().getName() // 3


// 变量提升后的代码执行顺序是：
function Foo() {
    getName = function () {
        console.log(1)
    }
    return this
}
function getName() {    // 函数声明 变量提升优先级最高
    console.log(5)
}
var getName = undefined     // 函数表达式 会先声明变量，然后再赋值

Foo.getName = function () {
    console.log(2)
}
Foo.prototype.getName = function () {
    console.log(3)
}
getName = function () {
    console.log(4)
}

Foo.getName()   // 访问的是构造函数Foo的静态方法，因此得出是2
getName()   // getName这个函数被提升至最前面（33行），当执行到这一句时，getName已经被重新赋值（44行）
Foo().getName()     // 按执行顺序下来，此时的getName应该是4（44行），但构造函数执行将getName又重新覆盖（29行），并且返回this，为window对象，因此getName的值为1
new Foo.getName()   // 运算符优先级问题=> new (Foo.getName)()
new Foo().getName() // => (new Foo()).getName()，实例化后再访问 getName 方法，会从原型链上访问