/*
 * @file webpack.config.js
 * @author: cdtanhongzhao
 * @describe: 静态资源初始化配置
 * @date: 2017-10-23 17:42
 */
var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var artTemplateList = glob.sync(path.resolve(__dirname, '../src/**/index.art'));
var moduleEntryIndex = glob.sync(path.resolve(__dirname, '../src/**/index.js'));
let  getEntry = {};
moduleEntryIndex.forEach(function(item) {
    getEntry[item.match(/src\/(\S*).js/)[1]] = item;
});
var configure = {
    entry: getEntry,
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: "[name].js"
    },
    externals: {
        "Zepto": "window.Zepto",
        "template": "window.template",
        "jquery": "window.jQuery"
    },
    resolve: {
        extensions: ['.js', '.json', '.tpl']
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     include: [resolve('src'), resolve('test')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     include: [
            //         resolve('src'), resolve('test')
            //     ]
            // },
            {
                test: /.art$/,
                use: ['art-template-loader']
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),//跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin()
    ]
}
artTemplateList.forEach(function(item,index) {
    var thisKey =  item.match(/src\/(\S*).art/),
        fileName = "./" + thisKey[1] + ".html";
    configure.plugins.push(new HtmlWebpackPlugin({
        template: item,
        filename: fileName,
        chunks: [thisKey[1]],
        inject: true
    }))
});
module.exports = configure;