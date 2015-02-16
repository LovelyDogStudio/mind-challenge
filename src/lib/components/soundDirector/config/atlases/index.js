module.exports = function (theme, lang) {
	return {
		"soundDirector": {
			data: require("./ui.json"),
			format: Phaser.Loader.TEXTURE_ATLAS_JSON_HASH,
			url: require("../../../../../assets/themes/"+theme+"/soundDirector/ui.png")
		},
	};
};
