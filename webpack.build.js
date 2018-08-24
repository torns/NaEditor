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
                'postcss-loader',
                'thread-loader',
            ]
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
                'postcss-loader',
                'thread-loader',
            ]
        }, ]
    },
    plugins: [
        new LodashModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        // new CleanWebpackPlugin(['dist/**.js', 'dist/**.json', 'dist/**.map', 'dist/**.css']),
    ],
})

if (isAnalyze) {
    result = smp.wrap(result);
}

module.exports = result;