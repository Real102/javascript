// 原型链继承
// 父类的引用类型数据会被同步修改
// function SuperType() {
//     this.name = 'name'
//     this.arr = [1, 2, 3, 4]
// }

// function SubType() {
//     this.age = 'age'
// }

// SubType.prototype = new SuperType()
// let sub1 = new SubType()
// let sub2 = new SubType()
// sub1.age = 'Age'
// sub1.arr.push(5)
// console.log(sub1)
// console.log(sub2)

// 借用构造函数继承
// function SuperType(age) {
//     this.age = age
//     this.arr = [1, 2, 3, 4]
// }

// function SubType(name, age) {
//     this.name = name
//     SuperType.call(this, age)
// }

// let sub1 = new SubType('张三', 12)
// let sub2 = new SubType('李四', 13)
// sub1.arr.push(5)

// console.log(sub1)
// console.log(sub2)

// 组合继承
// function SuperType(name) {
//     this.name = name
//     this.arr = [1, 2, 3, 4]
// }

// SuperType.prototype.getName = function() {
//     console.log(this.name)
// }

// function SubType(age, name) {
//     this.age = age
//     SuperType.call(this, name)
// }

// SubType.prototype = new SuperType()
// SubType.prototype.constructor = SubType

// let sub1 = new SubType(12, '张三')
// let sub2 = new SubType(13, '李四')
// sub1.arr.push(5)

// console.log(sub1)
// console.log(sub2)
// sub1.getName()
// sub2.getName()

// 寄生式继承
function SuperType(name) {
    this.name = name
    this.arr = [1, 2, 3, 4]
}

SuperType.prototype.getName = function() {
    console.log(this.name)
}

function SubType(age, name) {
    this.age = age
    SuperType.call(this, name)
}

inherite(SubType, SuperType)
function inherite(SubType, SuperType) {
    let prototype = Object.create(SuperType.prototype)
    prototype.constructor = SubType
    SubType.prototype = prototype
}

let sub1 = new SubType(12, '张三')
let sub2 = new SubType(13, '李四')
sub1.arr.push(5)
console.log(sub1)
console.log(sub2)
sub1.getName()
sub2.getName()
console.log(sub1.__proto__)
console.log(sub1.__proto__.constructor)
