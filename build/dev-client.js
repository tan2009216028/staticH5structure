/*
 * @file dev-client.js
 * @author: cdtanhongzhao
 * @describe: 订阅事件，当 event.action === 'reload' 时执行页面刷新
 * @date: 2017-10-23 17:25
 */
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');
// 订阅事件，当 event.action === 'reload' 时执行页面刷新
hotClient.subscribe(function (event) {
    if (event.action === 'reload') {
        window.location.reload()
    }
})