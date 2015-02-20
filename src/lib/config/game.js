var _HOST = window.location.hostname;

module.exports = function (lang) {
	return {
		game: {
			defaultAnimationSpeed: 1.5,
			// the Canvas dimensions represent your game base size
			// this is an extremely important value, there is a lot of debate around the web about the best size or aspect ratio
			// in the end each game has it's own needs, but for a reference we will indicate a few of the recomended sizes:
			// True Valhalla recommended resolution (SD) at the end of 2014: 
			//		320x480
			// Phaser recommended resolution (HD) at the begginning of 2015: 
			// 		1024x672 (iPad with Safari UI)
			//		1024x768 (iPad full screen)
			// iOS resolutions at the bigginning of 2015:
			// 		http://www.iosres.com/
			// 		iPhone 5&6 aspect ratio 16:9
			// 		iPad Mini & Air aspect ratio 4:3
			canvas:{				
				height: 480,
				width: 320,
				renderMode: Phaser.AUTO,
				parent: '',
				state: null,
				transparent: true,
				antialias: true,
				physicsConfig: null
			}
		}
	};
};

