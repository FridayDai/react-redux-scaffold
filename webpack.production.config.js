const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname);
const htmlwebpackplugin = require('html-webpack-plugin');
const cleanwebpackplugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENTRY = path.resolve(ROOT, 'src', 'index.js');
const SRC = path.resolve(ROOT, 'src');
const DIST = path.resolve(ROOT, 'dist');
const DLL = '/dll/dll.vendor.js';
const manifest = require('./dll/vendor-manifest.json');

const plugins = [
        new htmlwebpackplugin(
            {
                'title': 'APP',
                'template': 'template.html',
                'chunks': ['index'],
                'filename': 'index.html',
                'vendor': DLL,
                'minify': {
                    'removeComments': true,
                    'collapseWhitespace': false
                }
            }
        ),
        new CopyWebpackPlugin([
            { 'from': './dll', 'to': './dll' }
        ]),
        new MiniCssExtractPlugin({
            'filename': 'css/[name]_[hash:8].css',
            'allChunks': true
        }),
        // webpack中-p代表--optimize-minimize也就是压缩的意思,cli中progress代表显示编译进度
        // webpack -p压缩的时候不会去掉一些注释，所以在这里可以设置一下，进一步压缩文件
        // 注意：webpack4 不需要
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     output: false,
        //     compress: {
        //         unused: true,
        //         dead_code: true,
        //         pure_getters: true,
        //         warnings: false,
        //         screw_ie8: true,
        //         conditionals: true,
        //         comparisons: true,
        //         sequences: true,
        //         evaluate: true,
        //         join_vars: true,
        //         if_return: true
        //     },
        //     comments: false,
        //     minimize: true
        // }),

        // DefinePlugin()方法能创建可以在编译时配置的全局常量，这可能是非常有用的，允许开发版本和编译出的版本具有不同的行为
        // 在这里将环境设置为时'production'时，react会自动去掉没有用到的代码部分，让文件进一步精简
        // new webpack.DefinePlugin({
        //  'process.env': {
        //     'NODE_ENV': JSON.stringify('production')
        //   }
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.bundle.js'
        // }),
        new webpack.DllReferencePlugin({
            'context': ROOT,
            manifest
        }),
        new cleanwebpackplugin([DIST])
    ];

module.exports = {
    'mode': 'production',
    'entry': {
        'index': ENTRY
    },
    'output': {
        'path': DIST,
        'publicPath': '/',
        'filename': 'bundle_[name]_[hash:8].js' // 结束最终JS文件
    },

    'resolve': {
        'alias': {
            'action': path.resolve(__dirname, 'src/actions/index.js'),
            'containers': path.resolve(__dirname, 'src/containers/'),
            'components': path.resolve(__dirname, 'src/components/'),
            'common': path.resolve(__dirname, 'src/util/common.js'),
            'miment': path.resolve(__dirname, 'src/util/time.js')
        }
    },

    'module': {
        'rules': [
            {
                'test': /\.jsx?$/,
                'exclude': /node_modules/,
                'use': [
                    {
                        'loader': 'babel-loader', // 使用babel-loader这个loader
                        'options': {
                            'presets': ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                'test': /\.(less|scss|css)$/,
                'include': SRC,
                'use': [
                    MiniCssExtractPlugin.loader,
                    'css-loader?minimize',
                    {
                        'loader': 'postcss-loader',
                        'options': { // 如果没有options这个选项将会报错 No PostCSS Config found
                            'plugins': loader => [
                                require('autoprefixer')() // CSS浏览器兼容
                            ]
                        }
                    }
                ]
            },
            {
                'test': /\.(png|jpg|gif)$/,
                'use': ['url-loader?limit=10000&name=assets/[name]_[hash:8].[ext]']
            }
        ]
    },
    'plugins': plugins
};
