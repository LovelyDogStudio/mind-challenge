var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var config = require('./package.json');

module.exports = {
	cache: false,
	context: path.join(__dirname, 'src'),
	entry: './js/main',
	output: {
		path: path.join(__dirname, './build'),
		publicPath: '/',
		filename: 'js/app.min.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/i, exclude: /node_modules/i, loader: 'traceur?experimental&arrayComprehension&runtime' },
			{ test: /\.json$/i, exclude: /\.audiosprite\.json$/i, loader: 'json' },
			{ test: /\.css$/i, loader: 'style!css' },
			{ test: /\.less$/i, loader: 'style!css!less' },
			{ test: /\.(jpe?g|png|gif)$/i, loader: 'image?bypassOnDebug&name=[path][name].[ext]?[hash]' },
			{ test: /\.(mp3|ac3|ogg|m4a)$/i, loader: 'file?name=[path][name].[ext]?[hash]' },
			{ test: /\.(ttf|woff|eot)$/i, loader: 'file?name=[path][name].[ext]?[hash]' },
			{ test: /\.audiosprite\.json$/i, loader: 'file?name=[path][name].[ext]?[hash]' }
		]
	},
	resolve: {
		alias: {
			'phaserito': path.join(__dirname, 'src/lib/main'),
			'phaser': path.join(__dirname, 'node_modules/phaser/dist/phaser-arcade-physics'),
			'phaser-debug': path.join(__dirname, 'node_modules/phaser-debug/dist/phaser-debug')
		},
		extensions: ['', '.js']
	},
  resolveLoader: {
      alias: {
          "phaser-webpack-loader": path.join(__dirname, "tools/phaser-webpack-loader"),
          "phaser-debug-webpack-loader": path.join(__dirname, "tools/phaser-debug-webpack-loader")
      }
  },
	plugins: [
		new webpack.ProvidePlugin({
			console: 'imports?this=>window!exports?window.console!console-polyfill',
			Phaser: 'phaser-webpack-loader!exports?exports.Phaser!phaser',
			PhaserDebug: 'phaser-debug-webpack-loader!imports?require=>false!phaser-debug',
			PIXI: 'phaser-webpack-loader!exports?exports.PIXI!phaser',
			Promise: 'bluebird',
			Phaserito: 'phaserito'
		}),
		new StatsPlugin(path.join(__dirname, 'stats.json')),
		new HtmlWebpackPlugin({
			config: {
				googleAnalytics: config.google.analytics
			},
			template: 'src/index.html',
      filename: 'index.html'
		})
	]
};
