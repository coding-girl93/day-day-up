const path = require('path')
const glob = require('glob') // 寻找文件
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 生成HTML文件
const { CleanWebpackPlugin }= require('clean-webpack-plugin') // 清空文件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 提取css文件 webpack4.x以下的版本
var MiniCssExtractPlugin = require("mini-css-extract-plugin") 

const BUILDNAME ='build'

/**
 * 多文件入口路径解析 pages/xxx/index.js规范
 */
function getEntry(){
    let entrys ={}
    glob.sync('./src/pages/*/index.js').forEach((filepath)=>{
        let name = filepath.match(/\/pages\/(.+)\/index.js/);
        let key = name[1]
        entrys[key] = filepath
    })
    return entrys
}
/**
 * 多文件页面输出
 */
function getOuter(){
    let htmlWebpackPlugins = []
    glob.sync('./src/pages/*/index.html').forEach((filePath) => {
        let name = filePath.match(/\/pages\/(.+)\/index.html/)
        let key = name &&  name[1]

        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            filename: './' + key + "/index.html",
            template: './src/pages/' + key + '/index.html',
            chunks:[key]  // 多文件打包
        }))
       
    })
    return htmlWebpackPlugins
}

const config ={
    entry: getEntry(),

    output:{
        path: path.resolve(__dirname, BUILDNAME),
        filename: '[name]/index.js',
    },
    devtool: 'source-map',
    module:{
        rules:[
            {
                test:/\.(css|less)$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader','less-loader'
                ],
                exclude:/node-modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, BUILDNAME),
        }),
        new MiniCssExtractPlugin({
            filename:"[name]/index.css",
            chunkFilename: "[id].css"
        })
    ].concat(getOuter()),

    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    devServer:{
        // contentBase: path.join(__dirname,BUILDNAME),
        hot:true,
        port:3000,
        open: true
    }
}

module.exports = config