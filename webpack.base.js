const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const entryList = glob.sync('src/page/*/index.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isAnalyze = process.env.npm_config_argv.includes('analyze');

let cliEntry = process.env.npm_config_argv.match(/--entry=([\w]+)/);

let entrys = {};
entryList.forEach(function(file) {
    const name = file.replace(/src\/page\/(.*)\/index.js/ig, '$1');
    entrys[name] = './' + file;
});
if (cliEntry) {
    const pageName = cliEntry[1];
    const result = {};
    for (let i in entrys) {
        if (i.includes(pageName)) {
            result[i] = entrys[i];
        }
    }
    entrys = result;
}
console.log(entrys);


const sourcePath = path.join(__dirname, '/src');

let plugins = [];


// const HtmlWebpackPlugins = [
//     new HtmlWebpackPlugin({
//         filename: '/page/decorate.html',
//         template: './src/page/decorate/index.html',
//         chunks: ['decorate']
//     }),
//     new HtmlWebpackPlugin({
//         filename: '/page/canvas.html',
//         template: './src/page/canvas/index.html',
//         chunks: ['canvas'],
//     }),
//     new HtmlWebpackPlugin({
//         filename: '/page/learn.html',
//         template: './src/page/learn/index.html',
//         chunks: ['learn']
//     }),
//     new HtmlWebpackPlugin({
//         filename: '/page/preview.html',
//         template: './src/page/preview/index.html',
//         chunks: ['preview']
//     }),
//     new HtmlWebpackPlugin({
//         filename: '/page/manage.html',
//         template: './src/page/manage/index.html',
//         chunks: ['manage']
//     })
// ]

// plugins = plugins.concat(HtmlWebpackPlugins);

if (isAnalyze) {
    plugins.push(new BundleAnalyzerPlugin());
}

let imageLoaderConfig = 'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]';

module.exports = {
    entry: entrys,
    // entry: {
    //     'page/decorate': './src/page/decorate/index.js',
    // },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].bundle.js',
        publicPath: '//staticnaeditor.com/naeditor/',
    },
    stats: 'minimal',
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             // 注意: priority属性
    //             // 其次: 打包业务中公共代码
    //             common: {
    //                 name: "common",
    //                 chunks: "all",
    //                 priority: 1
    //             },
    //             // 首先: 打包node_modules中的文件
    //             vendor: {
    //                 name: "vendor",
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: "all",
    //                 priority: 10,
    //             }
    //         }
    //     }
    // },
    module: {
        rules: [{
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                loader: ['cache-loader', "awesome-typescript-loader", 'thread-loader', ]
            },
            {
                test: /\.jsx?/,
                include: path.resolve(__dirname, "src"),
                use: ['cache-loader', 'babel-loader', 'thread-loader', ]
            },

            // {
            //     test: /\.html/,
            //     exclude: /node_modules/,
            //     use: 'html-loader'
            // }
            {
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
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },
    plugins,
};