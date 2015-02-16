/**
 * Based on the work of
 * Nestor Hernandez Ojeda (Phasersito)
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var zip = require('gulp-zip');
var localtunnel = require('localtunnel');
var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var karma = require('karma').server;
var plato = require('gulp-plato');
// WebPack configuration
var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['development']);

gulp.task('build', function(callback) {
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	webpack(myConfig, function(err, stats) {
		if (err) throw new gutil.PluginError('webpack:build', err);
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('development', function(callback) {
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;

	new WebpackDevServer(webpack(myConfig), {
		contentBase: path.join(__dirname, './build'),
		stats: {
			colors: true
		}
	}).listen(8080, 'localhost', function(err) {
		if (err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[dev-server]', 'http://localhost:8080/  ->  Root');
		gutil.log('[dev-server]', 'http://localhost:8080/webpack-dev-server/  ->  with LiveReload');
	});
});

gulp.task('serve-ie9', function(callback) {
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;

	new WebpackDevServer(webpack(myConfig), {
		contentBase: path.join(__dirname, './build'),
		stats: {
			colors: true
		}
	}).listen(8080, '0.0.0.0', function(err) {
		if (err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[dev-server]', 'http://localhost:8080/  ->  Root');
		gutil.log('[dev-server]', 'http://localhost:8080/webpack-dev-server/  ->  with LiveReload');
	});
});

gulp.task('localtunnel', function(callback) {
	localtunnel(8080, function(err, tunnel) {
		if (err) throw new gutil.PluginError('localtunnel', err);
		var myConfig = Object.create(webpackConfig);
		myConfig.devtool = 'eval';
		myConfig.debug = true;

		new WebpackDevServer(webpack(myConfig), {
			contentBase: path.join(__dirname, './build'),
			stats: {
				colors: true
			}
		}).listen(8080, 'localhost', function(err) {
			if (err) throw new gutil.PluginError('webpack-dev-server', err);
			gutil.log('[localtunnel]', tunnel.url + '  ->  Root');
			gutil.log('[localtunnel]', tunnel.url + '/webpack-dev-server/  ->  with LiveReload');
		});
	});
});

gulp.task('cocoon', ['build'], function(callback) {
	return gulp.src('./build/**/*')
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest('./build'));
});


gulp.task('test', function(done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);
});

gulp.task('tdd', function(done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: false,
		autoWatch: true
	}, done);
});

gulp.task('travis', function(done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true,
		browsers: ['Firefox']
	}, done);
});

gulp.task('plato', function() {
	return gulp.src('./src/**/*.js')
		.pipe(plato('reports/plato/', {
			jshint: {
				options: {
					strict: true
				}
			},
			complexity: {
				trycatch: true
			}
		}));
});
