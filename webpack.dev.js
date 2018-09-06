const config = require('./webpack.base');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(false),
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
        }
    }),
];


module.exports = merge(config, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        publicPath: '/',
        port: 8081,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*', // 5
        },
        disableHostCheck: true,
    },
    module: {
        rules: [{
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader', 'thread-loader', ]
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader', 'thread-loader', ]
            },
        ]
    },
    plugins,
})