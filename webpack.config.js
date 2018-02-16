
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractCSS = new ExtractTextPlugin('style.css');
module.exports = {
    devtool: 'source-map',
    entry: {
        filename: './client/src/app.jsx'
    },
    output: {
        path : path.resolve(__dirname, 'build'),
        filename : 'bundle.js'
    },
    module: {

        rules : [
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader'])
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/, /server/],
                use: 'babel-loader'

            },
            {
                test: /\.jsx$/,
                exclude: [/node_modules/, /server/],
                use: 'babel-loader'
            }
        ]
    },
    plugins: [


        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: true
        }),
        extractCSS
    ],

};