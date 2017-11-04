/*
 * @file main.js
 * @author: cdtanhongzhao
 * @describe: 京豆换券模板
 * @date: 2017-10-24 17:34
 */
require("./index.css");
var testTpl = require("./contentTpl.art");

const text = 'Hello Worsssld!'

document.getElementById('J_baseLayout').innerHTML = testTpl({ text: text })

$(function () {
    console.log("测试")
    $(".test").bind("click",function () {
        alert("测试成功！");
    })
})
if(module.hot) {
    module.hot.accept();
}