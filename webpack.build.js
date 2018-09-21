const config = require('./webpack.base');
const glob = require('glob');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const isAnalyze = process.env.npm_config_argv.includes('analyze');

const HtmlWebpackPlugins = glob.sync('src/page/*/index.html').map((v) => {
    const name = v.replace(/src\/page\/(.*)\/index.html/ig, '$1');
    return new HtmlWebpackPlugin({
        filename: `./page/${name}.html`,
        template: v,
        chunks: [`page/${name}`],
        favicon: path.join(__dirname, '/src/assets/images/bitbug_favicon.ico'),
    })
});


let result = merge(config, {
    mode: "production",
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ]
        }, {
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
            ]
        }, ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false, // set to true if you want JS source maps
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    plugins: HtmlWebpackPlugins.concat([
        new LodashModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(['dist']),
    ]),
})

if (isAnalyze) {
    result = smp.wrap(result);
}

module.exports = result;