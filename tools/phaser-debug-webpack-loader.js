/** phaser-webpack-loader */

module.exports = function(source) {
	this.cacheable && this.cacheable();

	// export undefined on debug builds
	if (this.debug !== true) return 'module.exports = undefined';

	return source;
};
