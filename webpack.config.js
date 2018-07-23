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

const sourcePath = path.join(__dirname, '/src');

const HtmlWebpackPlugins = [
    new HtmlWebpackPlugin({
        filename: '/page/decorate.html',
        template: './src/page/decorate/index.html',
        chunks: ['page/decorate']
    }),
    new HtmlWebpackPlugin({
        filename: '/page/canvas.html',
        template: './src/page/canvas/index.html',
        chunks: ['page/canvas'],
    }),
    new HtmlWebpackPlugin({
        filename: '/page/learn.html',
        template: './src/page/learn/index.html',
        chunks: ['page/learn']
    })
]

let imageLoaderConfig = 'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]';


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
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            }, {
                test: /\.(woff|woff2|ttf|eot)$/,
                use: 'file-loader'
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            '@common': path.resolve(__dirname, 'src/common/'),
            '@component': path.resolve(__dirname, 'src/component/'),
            '@db': path.resolve(__dirname, 'src/db/'),
            '@reducers': path.resolve(__dirname, 'src/reducers'),
            '@actions': path.resolve(__dirname, 'src/actions'),
            '@store': path.resolve(__dirname, './src/store'),
        },
        extensions: ['.js', '.json', '.jsx'],
    },
    plugins: [

    ].concat(HtmlWebpackPlugins),
};