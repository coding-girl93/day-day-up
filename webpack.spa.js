const path = require('path')
const glob = require('glob') // 寻找文件
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 生成HTML文件
const { CleanWebpackPlugin }= require('clean-webpack-plugin') // 清空文件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 提取css文件 webpack4.x以下的版本
var MiniCssExtractPlugin = require("mini-css-extract-plugin") 

const BUILDNAME ='build'


const config ={
    entry: {
        index:'./src/spa/index.js'
    },
    output:{
        path: path.resolve(__dirname, BUILDNAME,'spa'),
        filename: '[name].js',
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ],
                exclude:/node-modules/
            },
            {
                test: /\.less$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader, // 和style-loader冲突
                    },{
                        loader: 'css-loader' // translates CSS into CommonJS
                    }, {
                        loader: 'less-loader' // compiles Lness to CSS
                    },{
                        loader:'postcss-loader' // css处理
                    }],
                exclude: /node-modules/
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, BUILDNAME),
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            template:'./src/spa/index.html'
        })
    ],
    devServer:{
        contentBase: path.join(__dirname, BUILDNAME,'spa/index.html'),
        hot:true,
        port:3000,
    }
}

module.exports = config