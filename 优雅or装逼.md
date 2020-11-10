# 让自己的代码更优（nan）雅（dong）一些

```javascript
function sleep(time) {
    return new Promise(res => setTimeout(res, time))
}
let duration = 2000
sleep(duration).then(res => console.log(`延迟了${duration}ms`))
```
