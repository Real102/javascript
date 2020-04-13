# console的多种用法

## console.log

console.log 一般都是直接输出到控制台，但这里做了一下修改，输出到 html 页面：

```javascript
(function () {
    var logger = document.createElement('div');         // 创建console信息的容器
    logger.style.cssText = 'width:300px;height:100px;position:absolute;right:0;bottom:0;border:1px solid #ccc;';
    document.body.append(logger);
    console.log = function (message) {      // 监听并修改默认事件
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
})();
console.log('666')
```

## console.table

将数据以表格的形式打印出来，这个方法需要提供 data，并且这个 data 必须是数组或对象

![输出为数组](/assets/img/consoleTableArray.png "输出为数组的截图")
![输出为对象](/assets/img/consoleTableObject.png "输出为对象的截图")

## console.time & console.timeEnd

调用 console.time 启动一个计时器（timer）来跟踪某一个操作的占用时长，每一个计时器的名字都必须是唯一的，调用 console.timeEnd 时，浏览器将以毫秒为单位，输出对应计时器所经过的时间

```javascript
console.time("answer time");
alert("Click to continue");
console.timeLog("answer time");
alert("Do a bunch of other stuff...");
console.timeEnd("answer time");
// answer time: timer started
// answer time: 1242ms
// answer time: 8858ms
// 谷歌(opera)和firefox显示稍有不同，IE不支持 timeLog
```
