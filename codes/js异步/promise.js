const myPromise = Promise.resolve(Promise.resolve('Promise!'))

function funcOne() {
    myPromise.then(res => res).then(res => console.log(res))
    setTimeout(() => console.log('TimeOut!'), 0)
    console.log('Last Line!')
}

async function funcTwo() {
    const res = await myPromise //Promise.resolve(Promise) 会原封不动的返回该实例
    console.log(await res) //Promise.resolve('string') == p.then(s => console.log(s))
    setTimeout(() => console.log('TimeOut!'), 0)
    console.log('Last Line!')
}

funcOne()
funcTwo()

// 这里考察的应该是宏任务和微任务的执行顺序
// 首先第一步执行script代码，script代码宏任务1，记第一次事件循环
// 第一次遇到promise.then 这是微任务，记微任务1
// 第二次遇到setTimeout,这是宏任务，记宏任务2
// 第三次遇到console,这是同步任务，直接输出------------------------------------------------------------------------Last line--1
// 第四次遇到await，等待promise执行完成后再进入下一个，这里记微任务2
// 第五次开始执行微任务，先执行微任务1，输出promise-----------------------------------------------------------------Promise--2
// 第六次开始执行微任务2，输出promise，执行完后，遇到setTimeout，记宏任务3-------------------------------------------Promise--3
// 第七次执行完微任务2后，遇到console，直接输出---------------------------------------------------------------------Last line--4
// 第八次开始第二次事件循环，执行宏任务2，输出timeout，此时没有微任务，进入下一次事件循环-------------------------------TimeOut--5
// 第九次开始第三次事件循环，执行宏任务3，输出timeout----------------------------------------------------------------TimeOut--6
// 第十次所有代码执行完毕

// 可参考地址：https://es6.ruanyifeng.com/#docs/promise#Promise-resolve

// 测试测试
async function f() {
    throw new Error('出错了')
}

f().then(
    v => console.log('resolve', v),
    e => console.log('reject', e)
)

// 测试测试
Promise.resolve('666').then(res => console.log(res))
Promise.reject('nice')
    .then(res => {
        console.log(res)
    })
    .catch(error => {
        console.log('error:' + error)
    })

// 测试测试
const promise = Promise.resolve('Promise!')
async function testAsync() {
    let p1 = await async1() // 若异步则跳过，同步则执行；若async1是promise，则会等resolve后才进入下一个await
    let p2 = await async2()
    return 'async end'
}
function async1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('async1')
            resolve()
        }, 0)
    })
}
function async2() {
    console.log(promise)
}

testAsync().then(res => {
    console.log(res)
})

// 测试---可以用作sleep函数，延迟**秒后执行
function sleep(time) {
    return new Promise(res => setTimeout(res, time))
}

sleep(2000).then(() => console.log('2000ms'))

// 测试代码
// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MPromise {
    constructor(executor) {
        // 默认状态为 PENDING
        this.status = PENDING
        // 存放成功状态的值，默认为 undefined
        this.value = undefined
        // 存放失败状态的值，默认为 undefined
        this.reason = undefined

        // 调用此方法就是成功
        let resolve = value => {
            // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
            }
        }

        // 调用此方法就是失败
        let reject = reason => {
            // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
            }
        }

        try {
            // 立即执行，将 resolve 和 reject 函数传给使用者
            executor(resolve, reject)
        } catch (error) {
            // 发生异常时执行失败逻辑
            reject(error)
        }
    }

    // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }

        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
    }
}
const promise = new MPromise((resolve, reject) => {
    resolve('成功')
}).then(
    data => {
        console.log('success', data)
    },
    err => {
        console.log('faild', err)
    }
)
