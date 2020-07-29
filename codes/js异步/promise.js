const myPromise = Promise.resolve(Promise.resolve('Promise!'))

function funcOne() {
    myPromise.then(res => res).then(res => console.log(res));
    setTimeout(() => console.log('TimeOut!'), 0)
    console.log('Last Line!')
}

async function funcTwo() {
    const res = await myPromise //Promise.resolve(Promise) 会原封不动的返回该实例
    console.log(await res)  //Promise.resolve('string') == p.then(s => console.log(s))
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