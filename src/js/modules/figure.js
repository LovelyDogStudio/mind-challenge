var dimensions = 6;
var gap = 3;
var tileSize = 50;

export class Figure extends Phaser.Group {

	constructor({game: game, group: group, position: position = 0, sizeW: sizeW = 1, sizeH: sizeH = 1, color: color = 'blue', callback: callback, name: name = "figure"}) {
		// call parent class
		super(game, group, name);
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
		// supposing a 6x6 board
		var x = gap + (tileSize + gap) * (position % dimensions);
		var y = gap + (tileSize + gap) * Math.floor(position / dimensions);
		var width = tileSize * sizeW + (sizeW - 1) * gap;
		var height = tileSize * sizeH +  (sizeH - 1) * gap;
		// draw rectangle
		this.image = this.game.add.sprite(x, y, this.tileColor, this);
		this.image.scale.set(width, height);
		this.image.inputEnabled = true;
		this.image.events.onInputDown.add(() => {
			this.callback && this.callback();
		}, this);
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
		return (this.position + this.sizeW - 1);
	}

	getTopTile() {
		return this.position;
	}

	getBottomTile() {
		return (this.position + (this.sizeH - 1) * 6);
	}

	__isOccupied(occupiedTiles, index) {
		return (occupiedTiles.indexOf(index) > -1);
	}

	canGoRight(occupiedTiles, index) {
		index = index || this.getRightTile() + 1;
		// the right boundary it's not on the right most tile
		if (((this.getRightTile() % dimensions) != (dimensions - 1)) 
			&& ((index % dimensions) != 0)) {
			// check if the next tile is occupied
			return !this.__isOccupied(occupiedTiles, index);
		}
		return false;
	}

	canGoLeft(occupiedTiles, index) {
		index = index || this.getLeftTile() - 1;
		// the left boundary it's not on the left most tile
		if (((this.getLeftTile() % dimensions) != 0)
			&& ((index % dimensions) != (dimensions - 1))) {
			// check if the previous tile is occupied
			return !this.__isOccupied(occupiedTiles, index);
		}
		return false;
	}

	getRightLimit(occupiedTiles) {
		var i = this.getRightTile();		
		while (this.canGoRight(occupiedTiles, i) && i < (dimensions * dimensions)) {
			i++;
		}
		return i - this.sizeW;
	}

	getLeftLimit(occupiedTiles) {
		var i = this.getLeftTile();	
		if (this.canGoLeft(occupiedTiles, i)) {
			while (this.canGoLeft(occupiedTiles, i) && i >= 0) {
				i--;
			}
			i++;
		}	
		return i;
	}

	moveTo(position) {
		this.position = position;
		this.image.position.x = 0;
		this.image.position.y = 0;
	}

}