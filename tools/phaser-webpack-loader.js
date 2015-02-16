/** phaser-webpack-loader */
/** Source: https://github.com/photonstorm/phaser/issues/1186#issuecomment-64966738 */
/** Credit goes to John Babak (sompylasar) */
module.exports = function(source) {
	this.cacheable && this.cacheable();

	// Fix for `p2`, it replaces `Phaser` with itself in `module.exports` when in the same file.
	source = source.replace(/"object"==typeof exports/, 'false');

	// Fix for `Phaser` to depend on `PIXI` exported before in the same file.
	source = source.replace(/(var\s+\w+\s*=\s*)Phaser(\s*\|\|\s*\{)/, 'var PIXI = exports.PIXI; $1Phaser$2');

	// Do not replace `module.exports` object, only put a property on `exports`.
	source = source.replace(/typeof module !== 'undefined' && module\.exports/g, "false /* typeof module !== 'undefined' && module.exports */");

	// Fix for Phaser node-webkit detection.
	source = source.replace(/require\('nw\.gui'\)/g, "undefined /* require('nw.gui') */");

	// Fix for missing `require` for `p2`.
	source = source.replace(/(p2\.Body\.prototype)/, 'var Phaser = require("Phaser").Phaser; var p2 = require("p2"); $1');

	// Fix for direct reference to global `document`. Works without this patch, too.
	source = 'var document = global.document;\n\n' + source;

	return source;
};
