const config = require('./webpack.base');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const plugins = [new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        }

    ),
];
module.exports = merge(config, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        publicPath: '/',
        port: 8081,
        hot: true,
        allowedHosts: [
            'h5editor.cn'
        ],
        headers: {
            'Access-Control-Allow-Origin': 'h5editor.cn', // 5
            'Access-Control-Allow-Credentials': false
        },
        disableHostCheck: true,
    },
    module: {
        rules: [{
            test: /\.less/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.css/,
            use: ['style-loader', 'css-loader']
        }, ]
    },
    plugins,
})