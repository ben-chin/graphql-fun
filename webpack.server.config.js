var path = require('path');
var webpack = require('webpack');

var APP_DIR = path.join(__dirname, 'app', 'js');
var DIST_DIR = path.join(__dirname, 'dist', 'js');

module.exports = function serverConfig () {

    // Setup loaders
    var loaders = [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: ['add-module-exports'],
            }
        }, {
            test: /\.json$/,
            loader: 'json',
        },
    ];

    return {
        entry: {
            'test': path.join(APP_DIR, 'test.js'),
        },
        module: {
            loaders: loaders,
        },
        output: {
            filename: '[name].js',
            path: DIST_DIR,
            sourceMapFilename: path.join('sourcemaps', '[file].map'),
        },
        resolve: {
            extensions: ['', '.json', '.jsx', '.js'],
            root: APP_DIR,
        },
        target: 'node',
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({ 'global.GENTLY': false }),
        ],
    };
};
