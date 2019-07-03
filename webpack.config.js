const webpack = require('webpack');
const path = require('path');

const paths = {
    index: path.join(__dirname, 'src', 'index.ts'),
    out: path.join(__dirname, 'build'),
};

/** @type {webpack.Configuration} */
module.exports = {
    entry: {
        index: paths.index,
    },
    output: {
        path: paths.out,
        filename: 'index.js',
        library: '',
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    module: {
        rules: [{ test: /\.(js|ts)/, use: ['babel-loader'] }],
    },
    devtool: 'source-map',
    plugins: [new webpack.ProgressPlugin()],
};
