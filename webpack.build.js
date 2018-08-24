const config = require('./webpack.base');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const isAnalyze = process.env.npm_config_argv.includes('analyze');

let result = merge(config, {
    mode: "production",
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                // 'postcss-loader',
                // 'thread-loader',
            ]
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                // 'postcss-loader',
                // 'thread-loader',
            ]
        }, ]
    },
    optimization: {
        splitChunks: {
            maxInitialRequests: 5,
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    priority: 1
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10,
                }
            }
        }
    },
    plugins: [
        // new LodashModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CleanWebpackPlugin(['dist/**.js', 'dist/**.json', 'dist/**.map', ]),
    ],
})

if (isAnalyze) {
    result = smp.wrap(result);
}

module.exports = result;