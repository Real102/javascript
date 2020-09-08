const createPromise = (time, id) => () =>
    new Promise((solve) =>
        setTimeout(() => {
            console.log("promise", id)
            solve()
        }, time)
    )

runPromiseByQueue([
    createPromise(3000, 1),
    createPromise(2000, 2),
    createPromise(1000, 3),
])

function runPromiseByQueue(myPromises) {
    myPromises.reduce(
        (previousPromise, nextPromise) =>
            previousPromise.then(() => nextPromise()),
        Promise.resolve()
    )
}
