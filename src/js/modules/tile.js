export class Tile extends Phaser.Group {

	constructor({game: game, group: group, position: position = 0}) {
		// call parent class
		super(game, group, "tile"+position);
		// init
		this.__init(position);
	}

	__init(position) {
		var dimensions = 6;
		var gap = 3;
		var tileSize = 50;
		// supposing a 6x6 board
		var x = gap + (tileSize + gap) * (position % dimensions);
		var y = gap + (tileSize + gap) * Math.floor(position / dimensions);
		// draw rectangle
		this.element = new Phaser.Rectangle(x, y, tileSize, tileSize);
		// fill rectangle
		this.game.debug.geom(this.element, '#999');
	}
};