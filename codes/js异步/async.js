async function async1() {
    console.log('async1 start');
    await async2(); // await后面的会立即执行
    await async3();
    console.log('async1 end');
}
async function async2() {
    console.log('async2 start')
}
async function async3() {
    console.log('async3 start')
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

/*
script start
async1 start
async2 start
promise1
script end
async1 end
promise2
setTimeout
async2 end
*/