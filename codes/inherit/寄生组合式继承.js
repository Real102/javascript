function inheritSuperType(sub, sup) {
    let prototype = Object.create(sup.prototype)
    prototype.constructor = sub
    sub.prototype = prototype
}

function SuperType(name) {
    this.name = name
    this.color = ['black', 'yellow', 'red']
}

SuperType.prototype.sayName = function() {
    console.log(this.name)
}

function SubType(name, age) {
    SuperType.call(this, name)
    this.age = age
}

inheritSuperType(SubType, SuperType)

SubType.prototype.sayAge = function() {
    console.log(this.age)
}


let sub1 = new SubType('张三', 21)
console.log(sub1)
// console.log(sub1.__proto__)

let res = Object.create(SuperType.prototype)
console.log(SuperType.prototype)
console.log(res.__proto__)