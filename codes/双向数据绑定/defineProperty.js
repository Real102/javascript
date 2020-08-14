var obj = {
    name: "宵夜",
    age: 25,
    phone: 18819490370,
}

for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
        Object.defineProperty(obj, i, {
            get: function() {
                console.log(`正在获取数据：${i}`)
            },
            set: v => {
                console.log(`将${i}赋值为：${v}`)
            }
        })
    }
}

obj.name = '宵夜时间到了'
