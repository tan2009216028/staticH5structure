/*
 * @file dev-server.js
 * @author: cdtanhongzhao
 * @describe: 开发环境静态dev配置
 * @date: 2017-10-23 17:25
 */
var express = require("express");
var port = process.env.PORT || 3000;
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require("./webpack.dev.config");
var app = express();

// var devClient = 'webpack-hot-middleware/client?noInfo=true&reload=true';
Object.keys(webpackConfig.entry).forEach(function (name, i) {
    // var extras = ['./build/dev-client'];
    var extras = ['webpack-hot-middleware/client?noInfo=true&reload=true'];
    webpackConfig.entry[name] = extras.concat(webpackConfig.entry[name])
})
//调用配置
var compiler = webpack(webpackConfig);
//这里是重点，使用 webpack-dev-middleware 插件
var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: '/',
    quiet: true,
    noInfo:false,
    stats: {
        colors: true,
        chunks: false
    }
});

var hotMiddleware = webpackHotMiddleware(compiler,{
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    });
// 监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    // 发布事件 reload,这个事件会在dev-client.js中接受到，然后刷新
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
});
// 注册中间件
app.use(devMiddleware);
app.use(hotMiddleware);

// 使用静态资源
app.use('/src', express.static('src'));
app.listen(port, function (err){
    if (err) {
        throw err;
    }
    console.log('Listening at http://localhost:' + port + '\n')
})