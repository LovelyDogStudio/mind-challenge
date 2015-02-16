// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
	config.set({

		plugins: [
			'karma-webpack',
			'karma-jasmine',

			'karma-coverage',
			'istanbul-instrumenter-loader',
			'karma-htmlfile-reporter',

			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-firefox-launcher',

			'karma-coveralls'
		],
		// base path, that will be used to resolve files and exclude
		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		preprocessors: {
			'src/**/*.js': ['webpack']
		},

		reporters: ['progress', 'coverage', 'html', 'coveralls'],

		// list of files / patterns to load in the browser
		files: [
			'node_modules/phaser/dist/phaser-arcade-physics.js',
			'node_modules/phaser-debug/dist/phaser-debug.js',
			//'../cirsa_builds/libs/phasersito.vendor.js',
			'src/**/*.spec.js'
		],

		webpack: {
			// karma watches the test entry points
			// (you don't need to specify the entry option)
			// webpack watches dependencies

			// webpack configuration
			cache: false,
			//entry: entries,
			context: path.join(__dirname, 'src'),
			module: {
				loaders: [{
					test: /\.js$/i,
					exclude: /node_modules/i,
					loader: 'traceur?experimental&arrayComprehension&runtime'
				}, {
					test: /(phaser-arcade-physics|phaser-debug)\.js$/i,
					loader: 'script'
				}, {
					test: /\.json$/i,
					exclude: /\.audiosprite\.json$/i,
					loader: 'json'
				}, {
					test: /\.css$/i,
					loader: 'style!css'
				}, {
					test: /\.less$/i,
					loader: 'style!css!less'
				}, {
					test: /\.(jpe?g|png|gif)$/i,
					loader: 'image?bypassOnDebug&name=[path][name].[ext]?[hash]'
				}, {
					test: /\.(mp3|ac3|ogg|m4a)$/i,
					loader: 'file?name=[path][name].[ext]?[hash]'
				}, {
					test: /\.(ttf|woff|eot)$/i,
					loader: 'file?name=[path][name].[ext]?[hash]'
				}, {
					test: /\.audiosprite\.json$/i,
					loader: 'file?name=[path][name].[ext]?[hash]'
				}],
				postLoaders: [{ // << add subject as webpack's postloader
					test: /\.js$/,
					loader: 'istanbul-instrumenter'
				}]
			},
			node: {
				console: true
			},
			resolve: {
				alias: {
					// Console polyfill for IE9
					'consolePolyfill': path.join(__dirname, 'vendor/consolePolyfill.js'),
					'phaserito': path.join(__dirname, 'src/lib/main.js'),
					'phaser': path.join(__dirname, 'node_modules/phaser/dist/phaser-arcade-physics.js'),
					'phaser-debug': path.join(__dirname, 'node_modules/phaser-debug/dist/phaser-debug.js')
				},
				extensions: ['', '.js', '.mustache']
			},
			plugins: [
				new webpack.ProvidePlugin({
					Promise: 'bluebird',
					phaserito: 'phaserito',
					Phaserito: 'phaserito'
				})
			]
		},

		webpackServer: {
			// webpack-dev-server configuration
			// webpack-dev-middleware configuration
			// debug mode off.
			noInfo: true,
			stats: {
				colors: true
			}
		},

		// list of files / patterns to exclude
		exclude: [],

		// web server port
		port: 8080,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,


		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['Chrome'],


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false,

		// optionally, configure the reporter
		coverageReporter: {
			type: 'html',
			dir: 'reports/coverage'
		},

		htmlReporter: {
			outputFile: 'reports/tests/units.html'
		}
	});
};
