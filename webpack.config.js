/**
 * Created by yi.dai on 2017/12/14.
 */
var path = require('path');
var webpack = require('webpack');
var htmlwebpackplugin = require('html-webpack-plugin');
var cleanwebpackplugin = require('clean-webpack-plugin');

var ROOT = path.resolve(__dirname);
var SRC = path.resolve(ROOT, 'src');
var ENTRY = path.resolve(ROOT, 'src', 'index.js');
var DIST = path.resolve(ROOT, 'dist');
// var test = path.resolve(ROOT, 'src', 'reducers', 'reducers.js');

module.exports = {
    entry: {
        index: ENTRY,
        // test: test
    },

    output: {
        filename: 'bundle_[name]_[hash:8].js',
        path: DIST
    },

    module: {
        rules: [
            {
                test: /\.(less|scss|css)$/,
                loaders: ['style-loader', 'css-loader?minimize', 'postcss-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: SRC,
                use: [
                    {
                        loader: "babel-loader" // 使用babel-loader这个loader
                        // options: {
                        //     presets: ['es2015', 'react']
                        // }
                    }
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [
        new cleanwebpackplugin([DIST]),
        new htmlwebpackplugin(
            {
                title: 'APP',
                template: 'template.html',
                chunks: ['index'],
                filename: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: false,
                }
            }
        )
    ],

    devServer: {
        port: 12345,
        // host: '0.0.0.0',
        // hot: true,
        inline: true,
        contentBase: './dist',
        historyApiFallback: false,
        proxy: {
            "/getName": {
                target: "http://106.15.93.13:6789/",
                secure: false
            },
            "/**": {
                // target: 'http://localhost:8080',
                target: "https://cnodejs.org/",
                secure: false
            }
        }
    }
};