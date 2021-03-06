class EventEmitter {
    constructor() {
        this.list = {}
    }
    on(key, fn) {
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)
        return this
    }
    once(key, fn) {
        if (!this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)
        this.list[key].flag = this.list[key].length
        return this
    }
    emit(key, args) {
        let that = this
        let fns = this.list[key]
        if (!fns || fns.length === 0) return false
        for (let i = 0; i < fns.length; i++) {
            fns[i].apply(this, args)
            if (fns.flag === i) {
                that.off(key, fns[i - 1])
            }
        }
    }
    off(key, fn) {
        let fns = this.list[key]
        let len = fns.length,
            k = -1
        for (let i = 0; i < len; i++) {
            if (fns[i].name === fn.name) {
                // 删除
                k = i
                break
            }
        }
        if (k !== -1) {
            this.list[key].splice(k, 1)
        }
    }

    allOff(key) {
        if (key === undefined) {
            this.list = {}
        } else {
            this.list[key] = []
        }
    }
}

var emitter = new EventEmitter()

function handleOne(a, b, c) {
    console.log("第一个监听函数", a, b, c)
}

function handleSecond(a, b, c) {
    console.log("第二个监听函数", a, b, c)
}

function handleThird(a, b, c) {
    console.log("第三个监听函数", a, b, c)
}

emitter.on("demo", handleOne).once("demo", handleSecond).on("demo", handleThird)

emitter.emit("demo", [1, 2, 3])
// => 第一个监听函数 1 2 3
// => 第二个监听函数 1 2 3
// => 第三个监听函数 1 2 3

emitter.off("demo", handleThird)
emitter.emit("demo", [2, 3, 4])
// => 第一个监听函数 1 2 3

emitter.allOff()
emitter.emit("demo", [3, 4, 5])
// nothing
