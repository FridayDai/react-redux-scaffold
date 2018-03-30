/**
 * Created by yi.dai on 2017/12/14.
 */
var path = require('path');
var webpack = require('webpack');
var htmlwebpackplugin = require('html-webpack-plugin');
var cleanwebpackplugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT = path.resolve(__dirname);
var SRC = path.resolve(ROOT, 'src');
var ENTRY = path.resolve(ROOT, 'src', 'index.js');
var DIST = path.resolve(ROOT, 'dist');
// var test = path.resolve(ROOT, 'src', 'reducers', 'reducers.js');

module.exports = {
    entry: {
        index: ENTRY,
        vendor: ['react','react-dom','react-redux','react-router']
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
                exclude: ['/node_modules/', DIST],
                loaders: ['style-loader', 'css-loader?minimize',
                    {
                        loader:'postcss-loader',
                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: (loader) => [
                                require('autoprefixer')(), //CSS浏览器兼容
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: ['/node_modules/', DIST],
                include: SRC,
                use: [
                    {
                        loader: "babel-loader" // 使用babel-loader这个loader
                        // options: {
                        //     presets: ['es2015', 'react']
                        // }
                    }
                ]
            },
            {
                exclude: ['/node_modules/', DIST],
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader?limit=10000&name=[name]_[hash:8].[ext]']
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
                chunks: ['vendor', 'index'],
                filename: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: false,
                }
            }
        ),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js'
        })
    ],

    devServer: {
        port: 12345,
        // host: '0.0.0.0',
        // hot: true,
        inline: true,
        contentBase: './dist',
        historyApiFallback: true, // 用react-router记得要置为true,不然就会去请求路径了
        proxy: {
            "/rest/*": {
                target: "http://106.15.93.13:6789/",
                secure: false
            }
        }
    }
};