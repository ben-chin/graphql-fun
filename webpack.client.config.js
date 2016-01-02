var path = require('path');

var APP_DIR = path.join(__dirname, 'app', 'js');
var DIST_DIR = path.join(__dirname, 'dist', 'js');

module.exports = function clientConfig () {

    // Setup loaders
    var loaders = [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
            }
        }, {
            test: /\.json$/,
            loader: 'json',
        },
    ];

    return {
        entry: {
            'graphiql': path.join(APP_DIR, 'graphiql.js'),
        },
        module: {
            loaders: loaders,
        },
        output: {
            filename: '[name].js',
            path: DIST_DIR,
        },
        resolve: {
            extensions: ['', '.json', '.jsx', '.js'],
            root: APP_DIR,
        },
        target: 'web',
    };
};
