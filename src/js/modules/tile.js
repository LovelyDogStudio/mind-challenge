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
		this.tile = this.game.add.sprite(x, y, 'grey', this);
		this.tile.scale.set(tileSize, tileSize);
	}
};