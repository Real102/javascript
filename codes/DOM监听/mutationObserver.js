var observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        // 返回 mutation 的类型type主要有：childrenList、 attributes、 characterData
        // onload 后 mutation 会输出数据
        // 可以根据 type + target 做判断
        console.log(mutation)
    })
})

observer.observe(document.documentElement, {
    attributes: true, // 属性
    characterData: true, // 节点内容或节点文本
    childList: true, // 直接子节点
    subtree: true, // 所有子孙节点
    attributeOldValue: true, // 记录 attributes 变动前的旧值
    characterDataOldValue: true, // 记录 characterData 变动前的旧值
    // attributeFilter: [], // 需要观察的特定属性（比如['class','src']）
})

// observer.disconnect(); // 停止观察

// 例子...
setTimeout(() => {
    let oDiv = document.getElementById("oDiv")
    let oP = document.createElement("p")
    let oText = document.createTextNode("这是文本")
    oP.appendChild(oText)
    oDiv.appendChild(oP)

    setTimeout(() => {
        oP.style.color = "#ff0000"
    }, 2000)
}, 1000)
