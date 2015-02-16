export class Boot extends Phaser.State {

	preload() {
		// load assets for the logo (will display while the full preload is executed)
		this.game.load.image("logo", require("../../assets/img/logo.png"));
		this.game.load.image("logoBright", require("../../assets/img/logo_bright.png"));
	}

	create() {
		// se game configuration
		this.game.stage.disableVisibilityChange = true;
		this.game.input.maxPointers = 1;
		// load game plugins
		if (PhaserDebug){
			this.game.add.plugin(PhaserDebug);
		}
		this.game.component.load("soundDirector");
		// start loading state
		this.game.state.start('Loading');
	}

	init() {
		if (this.game.device.desktop) {
			this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		}
		else {
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		}
//		this.scale.setMinMax(320, 480, 640, 960);
		this.scale.pageAlignVertically = true;
		this.scale.pageAlignHorizontally = true;
	}

};
