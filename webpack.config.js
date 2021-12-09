const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = __dirname; // nodejs 内置的全局变量,代表当前执行的根目录
const ENTRY = path.resolve(ROOT, 'src'); // 打包的入口 (这里我们打包 src 目录下面的文件)
const OUTPUT = path.resolve(ROOT, 'dist'); // 打包的出口
const PORT = 8080; // 本地开发服务器 (devServer) 的端口

module.exports = {
    mode: 'development',
    // 入口及热跟新相关配置, 更新代码会自动刷新页面或无刷新更新代码
    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${PORT}`,
        'webpack/hot/only-dev-server',
        path.join(ROOT, 'index.js'),
    ],
    output: {
        path: path.join(OUTPUT),
        filename: 'index.js',
    },
    // 本地开发服务器
    devServer: {
        compress: true,
        port: PORT,
        host: '0.0.0.0',
        hot: true,
        inline: true,
        historyApiFallback: true,
        open: true,
        disableHostCheck: true,
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: [
                    { 
                      loader: 'babel-loader', 
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                  'style-loader', // 解析行内样式
                  'css-loader', // 解析 .css 文件
                  'postcss-loader', // css 届的 babel, 对 css 进行兼容处理
                  {
                    loader: 'less-loader',
                    options: {
                      javascriptEnabled: true,
                    },
                  },
                ],
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      javascriptEnabled: true,
                      minimize: true,
                      sourceMap: false,
                    },
                  },
                  {
                    loader: 'postcss-loader',
                    options: { javascriptEnabled: true, sourceMap: false },
                  },
                ],
            },
        ],
    },
    resolve: {
        enforceExtension: false,
        extensions: ['.js', '.jsx', '.js', '.json', '.ts', '.tsx'],
        alias: {
            // react hooks 热更新
            // 当 import ReactDOM from 'react-dom' 时
            // 会替换成 mport ReactDOM from '@hot-loader/react-dom'
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT, 'index.html'),
            title: 'components development based on typescript and react hooks',
            filename: 'index.html',
        }),
    ],
};