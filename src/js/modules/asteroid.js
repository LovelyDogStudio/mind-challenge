export class Asteroid extends Phaser.Group {

	constructor({game: game, group: group, position: position = 0, sizeW: sizeW = 1, sizeH: sizeH = 1, color: color = '#00f'}) {
		// call parent class
		super(game, group, "asteroid");
		// save properties
		this.position = position;
		this.sizeW = sizeW;
		this.sizeH = sizeH;
		this.tileColor = color;
		// init
		this.__init(position, sizeW, sizeH);
	}

	__init(position, sizeW, sizeH) {
		console.debug(this.tileColor)
		var dimensions = 6;
		var gap = 3;
		var tileSize = 50;
		// supposing a 6x6 board
		var x = gap + (tileSize + gap) * (position % dimensions);
		var y = gap + (tileSize + gap) * Math.floor(position / dimensions);
		// draw rectangle
		this.element = new Phaser.Rectangle(x, y, tileSize * sizeW + (sizeW - 1) * gap, tileSize * sizeH +  (sizeH - 1) * gap);
		// fill rectangle
		this.game.debug.geom(this.element, this.tileColor);
	}
};