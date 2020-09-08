// reduce 遍历器，按顺序执行。后一个运算依赖前一个运算的结果
let arr = [1,2,3,4,5,6,7,8,9,8,7,6,5,4,23,2,3,4,5,6,7,4,3,23,5,6,7]
let res = arr.reduce((prev, cur) => {
    if(prev[cur]) {
        prev[cur] ++
    } else {
        prev[cur] = 1
    }
    return prev
}, {})
// console.log(res)
// console.log(Object.values(res))