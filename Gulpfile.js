var gulp = require('gulp');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var clientConfig = require('./webpack.client.config')();
var serverConfig = require('./webpack.server.config')();

var serverProcess = null;

// Default task
gulp.task('default', ['dev']);

gulp.task('dev', ['watch:backend', 'webpack-dev-server']);

// Watch backend
gulp.task('watch:backend', function () {
    webpack(serverConfig).watch(100, onBuildBackend());
});

// Start webpack-dev-server for frontend
gulp.task('webpack-dev-server', ['build:frontend'], function (cb) {
    var frontendCompiler = webpack(clientConfig);
    new WebpackDevServer(frontendCompiler, {
        stats: 'minimal',
        colors: true,
    }).listen(8080, 'localhost', function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});


/* Build tasks
 * --------------------- */

gulp.task('build:frontend', function (cb) {
    webpack(clientConfig).run(function (error, stats) {
        if (error) {
            gutil.log('[' + error.name + ']', error.message);
        }
        cb();
    });
});

gulp.task('build:backend', function (cb) {
    webpack(serverConfig).run(cb);
});


/* Helpers */

function runServer () {
    var server = spawn('node', ['dist/js/test.js']);
    server.stdout.on('data', function (data) {
        gutil.log('[server process]', data.toString());
    });
    server.on('error', function (err) {
        gutil.log('[server process]', 'errored with', err);
    });
    return server;
}

function onBuildBackend (cb) {
    return function (err, stats) {
        if (err || stats.hasErrors()) {
            gutil.log(stats.toString({ errorDetails: true, colors: true }));
        } else {
            gutil.log('Observed changes to server');
            if (serverProcess) {
                gutil.log('Restarting server...');
                serverProcess.kill();
            }
            serverProcess = runServer();
        }

        if (cb) cb();
    };
}
