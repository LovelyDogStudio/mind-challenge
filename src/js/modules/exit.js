export class Exit extends Phaser.Group {

	constructor({game: game, group: group}) {
		// call parent class
		super(game, group, "exit");
		// init
		this.__init();
	}

	__init() {
		// draw rectangle
		this.element = new Phaser.Rectangle(109, 0, 50, 6);
		// fill rectangle
		this.game.debug.geom(this.element, '#f00');
	}
};