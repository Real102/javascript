# js监听键盘事件

```javascript
window.onkeydown = funtion(event) {
    var e = event || window.event;

    // 关键是利用 keyCode 判断用户按了什么按键

    if(e.keyCode === 13) {                      // 单纯监听按键不绑定任何事件
        console.log("按下 enter 键");
    }
    if(e.keyCode === 116) {                     // 监听按钮并绑定事件
        e.preventDefault();                     // 阻止系统默认事件；或者用 return false;
        todoSomething();
        console.log("按下 F5 键");
    }
    if(e.keyCode === 67 && e.ctrlKey) {
        console.log("按下了 Ctrl + C 键");
    }
}
```

---

附 keyCode 参照表

![keyCode-1](/assets/img/keyCode-1.png "keyCode参照表-1")
![keyCode-2](/assets/img/keyCode-2.png "keyCode参照表-2")