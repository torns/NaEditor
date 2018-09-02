const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/server/index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'distServer'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                loader: ["awesome-typescript-loader", ]
            },
            {
                test: /\.jsx?/,
                include: path.resolve(__dirname, "src"),
                use: ['babel-loader', ]
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
            }, {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'sass-loader', 'thread-loader', ]
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader', 'thread-loader', ]
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },
    // externals: 
}