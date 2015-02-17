export class Boot extends Phaser.State {

	preload() {
		// load assets for the logo (will display while the full preload is executed)
		this.game.load.image("yellow", require("../../assets/img/FFFF33-1.png"));
		this.game.load.image("red", require("../../assets/img/FF0000-1.png"));
		this.game.load.image("blue", require("../../assets/img/0000FF-1.png"));
		this.game.load.image("light-blue", require("../../assets/img/99CCFF-1.png"));
		this.game.load.image("light-green", require("../../assets/img/99FFCC-1.png"));
		this.game.load.image("purple", require("../../assets/img/9933CC-1.png"));
		this.game.load.image("green", require("../../assets/img/339966-1.png"));
		this.game.load.image("orange", require("../../assets/img/FF9900-1.png"));
		this.game.load.image("grey", require("../../assets/img/999999-1.png"));
		this.game.load.image("light-grey", require("../../assets/img/CCCCCC-1.png"));
		this.game.load.image("exit", require("../../assets/img/exit.png"));
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
