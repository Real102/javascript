const myPromise = Promise.resolve(Promise.resolve('Promise!'))

function funcOne() {
    myPromise.then(res => res).then(res => console.log(res));
    setTimeout(() => console.log('TimeOut1!'), 0)
    console.log('Last Line1!')
}

async function funcTwo() {
    const res = await myPromise
    console.log(await res)
    setTimeout(() => console.log('TimeOut2!'), 0)
    console.log('Last Line2!')
}

funcOne()
funcTwo()