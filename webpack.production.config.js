var path = require('path');
var webpack = require('webpack');
var ROOT = path.resolve(__dirname);
var htmlwebpackplugin = require('html-webpack-plugin');
var cleanwebpackplugin = require('clean-webpack-plugin');
var ENTRY = path.resolve(ROOT, 'src', 'index.js');
var DIST = path.resolve(ROOT, 'dist');

var plugins = [
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
        // webpack中-p代表--optimize-minimize也就是压缩的意思,cli中progress代表显示编译进度
        // webpack -p压缩的时候不会去掉一些注释，所以在这里可以设置一下，进一步压缩文件
        new webpack.optimize.UglifyJsPlugin({
          output: {
            comments: false
          },
          compress: {
            warnings: false,
            // 去掉debugger和console
            drop_debugger: true,
            drop_console: true
          }
        }),
        new webpack.optimize.DedupePlugin(),

        // DefinePlugin()方法能创建可以在编译时配置的全局常量，这可能是非常有用的，允许开发版本和编译出的版本具有不同的行为
        // 在这里将环境设置为时'production'时，react会自动去掉没有用到的代码部分，让文件进一步精简
        new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
    ];

module.exports = {
    entry: {
        index: ENTRY
    },
    output: {
        path: DIST,
        // publicPath: '/assets/',
        filename: 'bundle_[name]_[hash:8].js' //结束最终JS文件
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader", // 使用babel-loader这个loader
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'src/styles'),
                loader: 'style!css?modules!postcss!sass'
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/styles'),
                loader: 'style!css'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    plugins: plugins
};
