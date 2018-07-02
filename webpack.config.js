/**
 * Description: webpack配置
 * Author: cdhewu
 * Contact:cdhewu@jd.com
 * Time: 2018/1/22 13:33
 */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entrys = {};
const entryList = glob.sync('src/page/*/index.js');

entryList.forEach(function(file) {
    const name = file.replace(/src\/(page\/.*)\/index.js/ig, '$1');
    entrys[name] = './' + file;
});

console.log(entrys)


const HtmlWebpackPlugins = [
    new HtmlWebpackPlugin({
        filename: '/page/canvas.html',
        template: './src/page/canvas/index.html',
        chunks: ['page/canvas']
    }),
    new HtmlWebpackPlugin({
        filename: '/page/decorate.html',
        template: './src/page/decorate/index.html',
    }),
]

module.exports = {
    entry: entrys,
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].bundle.js',
        publicPath: '/dist',
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8080
    },
    module: {
        rules: [{
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // {
            //     test: /\.html/,
            //     exclude: /node_modules/,
            //     use: 'html-loader'
            // }
            {
                test: /\.scss/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css/,
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, 'src/common/'),
            '@component': path.resolve(__dirname, 'src/component/'),
        },
        extensions: ['.js', '.json', '.jsx'],
    },
    plugins: [].concat(HtmlWebpackPlugins),
};