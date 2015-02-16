export class Asteroid extends Phaser.Group {

	constructor({game: game, group: group, position: position = 0, sizeW: sizeW = 1, sizeH: sizeH = 1, color: color = '#00f', callback: callback}) {
		// call parent class
		super(game, group, "asteroid");
		// save properties
		this.position = position;
		this.sizeW = sizeW;
		this.sizeH = sizeH;
		this.tileColor = color;
		this.orientation = (this.sizeH > this.sizeW) ? "vertical" : "horizontal";
		this.callback = callback;
		// init
		this.__init(position, sizeW, sizeH);
	}

	__init(position, sizeW, sizeH) {
		var dimensions = 6;
		var gap = 3;
		var tileSize = 50;
		// supposing a 6x6 board
		var x = gap + (tileSize + gap) * (position % dimensions);
		var y = gap + (tileSize + gap) * Math.floor(position / dimensions);
		var width = tileSize * sizeW + (sizeW - 1) * gap;
		var height = tileSize * sizeH +  (sizeH - 1) * gap;
		// draw rectangle
		this.element = new Phaser.Rectangle(x, y, width, height);
		this.image = this.game.add.sprite(x, y, '1x1', this);
		this.image.scale.set(width, height);
		this.image.inputEnabled = true;
		this.image.events.onInputDown.add(() => {
			this.callback && this.callback();
		}, this);
		// fill rectangle
		this.game.debug.geom(this.element, this.tileColor);		
	}

	getTiles() {
		var tiles = [this.position];
		// add horizontal tiles
		for (var i = 1; i < this.sizeW; i++) {
			tiles.push(this.position + i);
		}
		// add vertical tiles
		for (var i = 1; i < this.sizeH; i++) {
			tiles.push(this.position + (i * 6));
		}
		// return tiles
		return tiles;
	}

	getLeftTile() {
		return this.position;
	}

	getRightTile() {
		return this.position + this.sizeW - 1;
	}

	getTopTile() {
		return this.position;
	}

	getBottomTile() {
		return this.position + (this.sizeH - 1) * 6;
	}
};