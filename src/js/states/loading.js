import {
	Logo
}
from '../../lib/modules/logo.js';

/**
 * Loading state
 * @Class Loading
 */
export class Loading extends Phaser.State {

	preload() {
		var logo, logoIsDone = false;
		var loadingText, loadingTextGroup, loadingProgress;
		var loadingTween;
		var loadingCss = document.getElementById('loading');

		var loadCheck = () => {
			// disable CSS animation for the loading
			if (loadingCss) {
				loadingCss.style.visibility = 'hidden';
			}
			// when everything's load, start the game
			if (this.game.load.hasLoaded && logoIsDone) {
				this.game.load.onLoadComplete.remove(loadCheck, this);
				this.game.state.start('Play');
			}
		};

		// Place logo and hide it
		logo = new Logo(this.game);

		// Set animation for the logo
/*		
		logo.animate().then(() => {
			logoIsDone = true;
			loadCheck();
		});
*/
logoIsDone = true;

		// Set loading text
		loadingText = this.game.add.text(this.game.width / 2, (this.game.height / 2) + 150,
			this.game.i18n `Loading...`, {
				font: "24px Roboto-Light",
				fill: "#ffffff"
			});
		loadingText.anchor.setTo(0.5, 0.5);
		loadingTween = this.game.add.tween(loadingText)
			.to({
				alpha: 0
			}, 800, Phaser.Easing.Linear.None)
			.to({
				alpha: 1
			}, 800, Phaser.Easing.Linear.None)
			.loop()
			.start();
		loadingProgress = this.game.add.text(this.game.width / 2, (this.game.height / 2) + 200,
			"0%", {
				font: "18px Roboto-Light",
				fill: "#ffffff"
			});
		loadingProgress.anchor.setTo(0.5, 0.5);

		// load sprites
		for (let spriteName in this.game.config.phaserito.sprites) {
			let sprite = this.game.config.phaserito.sprites[spriteName];
			this.game.load.image(spriteName, sprite.url, sprite.overwrite);
		}

		// load sounds
		this.game.load.pack('sounds', null, this.game.config.phaserito, this);

		// load atlases
		for (let atlasName in this.game.config.phaserito.atlases) {
			let atlas = this.game.config.phaserito.atlases[atlasName];
			this.game.load.atlas(atlasName, atlas.url, null, atlas.data, atlas.format);
		}

		// load audiosprites
		for (let audiospriteName in this.game.config.phaserito.audiosprites) {
			let audiosprite = this.game.config.phaserito.audiosprites[audiospriteName];
			this.game.load.audiosprite(audiospriteName, audiosprite.urls, audiosprite.data);
		}

		// call loadCheck when the queue has been fully processed
		this.game.load.onLoadComplete.add(loadCheck, this);
		this.game.load.onFileComplete.add((progress) => {
			progress = (progress == 100) ? '' : progress + '%';
			loadingProgress.setText(progress);
		}, this);
	}
};
