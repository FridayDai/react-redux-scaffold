/**
 * Created by yi.dai on 2017/12/14.
 */
var path = require('path');
var webpack = require('webpack');
var htmlwebpackplugin = require('html-webpack-plugin');
var cleanwebpackplugin = require('clean-webpack-plugin');

var ROOT = path.resolve(__dirname);
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
                loader: "babel-loader"
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
        ),
        // new htmlwebpackplugin(
        //     {
        //         title: '2222',
        //         template: 'template.html',
        //         chunks: ['test'],
        //         filename: 'test.html',
        //         minify: {
        //             removeComments: true,
        //             collapseWhitespace: false,
        //         }
        //     }
        // )
    ],

    devServer: {
        port: 12345,
        // host: '0.0.0.0',
        // hot: true,
        inline: true,
        contentBase: './dist',
        historyApiFallback: false,
        proxy: {
            "/**": {
                // target: 'http://localhost:8080',
                target: "https://cnodejs.org/",
                secure: false
            }
        }
    }
};