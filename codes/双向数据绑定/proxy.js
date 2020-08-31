var obj = {
    name: "宵夜",
    age: 25,
    phone: 18819490370,
}

// var obj = [1,2,3,4,5]

let vm = new Proxy(obj,{
    get: function (target, propKey, receiver) {
        console.log(target)
        console.log(propKey)
        console.log(receiver)
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
})

vm.name = '宵夜时间到了'
vm.age

// vm.push(123)