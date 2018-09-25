const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        vendor: ['react','react-dom','react-redux','react-router', 'redux', 'isomorphic-fetch', 'material-ui', 'highlightjs', 'markdown-it']
    },
    output: {
        path: path.join(__dirname, '/dll'),
        filename: 'dll.[name].js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '/dll/[name]-manifest.json'),
            name: '[name]'
        }),
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
        // })
    ]
};