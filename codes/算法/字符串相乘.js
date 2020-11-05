const str1 = '10'
const str2 = '20'
function charMulti(str1, str2) {
    let arr1 = str1.split('')
    let arr2 = str2.split('')
    let len1 = arr1.length
    let len2 = arr2.length
    let arr = new Array(len1 + len2).fill(0)
    for(let i = len1 - 1; i >= 0; i--) {
        for(let j = len2 - 1; j >= 0; j--) {
            let num = parseInt(arr[i + j + 1]) + arr1[i] * arr2[j]
            arr[i + j + 1] = num % 10
            arr[i + j] += Math.floor(num / 10)
        }
    }
    while(arr[0] == 0) {
        arr.shift()
    }
    return arr.join('')
}

console.log(charMulti(str1, str2))
