# console的多种用法

console.log
---

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

console.table
---

将数据以表格的形式打印出来，这个方法需要提供 data，并且这个 data 必须是数组或对象

![输出为数组](/img/consoleTableArray.png "输出为数组的截图")
![输出为对象](/img/consoleTableObject.png "输出为对象的截图")