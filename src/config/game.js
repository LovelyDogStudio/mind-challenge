module.exports = function (lang) {
	return {
		animations: require("./animations")(lang),
		atlases: require("./atlases/")(lang),
		audiosprites: require("./audiosprites/index.js")(lang),
		sprites: require("./sprites")(lang),
		sounds: require("./sounds.js")(lang)
	};
}
