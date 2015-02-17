var dimensions = 6;
var gap = 3;
var tileSize = 50;

export class Figure extends Phaser.Group {

	constructor({game: game, group: group, position: position = 0, sizeW: sizeW = 1, sizeH: sizeH = 1, color: color = 'blue', callback: callback, name: name = "figure", resize: resize = true}) {
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
		this.__init(position, sizeW, sizeH, resize);
	}

	__init(position, sizeW, sizeH, resize) {
		// supposing a 6x6 board
		var x = this.__calculateX(position);
		var y = this.__calculateY(position);
		var width = tileSize * sizeW + (sizeW - 1) * gap;
		var height = tileSize * sizeH +  (sizeH - 1) * gap;
		// draw rectangle
		this.image = this.game.add.sprite(x, y, this.tileColor, this);
		resize && this.image.scale.set(width, height);
		this.image.inputEnabled = true;
		this.image.events.onInputDown.add(() => {
			this.callback && this.callback();
		}, this);
	}

	// get the tiles occupied by this figure
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

	// get the top left tile
	getLeftTile() {
		return this.position;
	}

	// get the top right tile
	getRightTile() {
		return (this.position + this.sizeW - 1);
	}

	// get the top left tile
	getTopTile() {
		return this.position;
	}

	// get the bottom left tile
	getBottomTile() {
		return (this.position + (this.sizeH - 1) * 6);
	}

	// check if a position is occupied for another tile
	__isOccupied(occupiedTiles, index) {
		return (occupiedTiles.indexOf(index) > -1);
	}

	// check if the figure can go right to the defined index or the next position
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

	// check if the figure can go left to the defined index or the previous position
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

	// get the right-most position that the figure can move to
	getRightLimit(occupiedTiles) {
		var i = this.getRightTile();		
		while (this.canGoRight(occupiedTiles, i) && i < (dimensions * dimensions)) {
			i++;
		}
		return i - this.sizeW;
	}

	// get the left-most position that the figure can move to
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

	// check if the figure can go up to the defined index or the upper position
	canGoUp(occupiedTiles, index) {
		index = index || this.getTopTile() - dimensions;
		// the tile to check is not out of bounds
		if (index >= 0) {
			// check if the index tile is occupied
			return !this.__isOccupied(occupiedTiles, index);
		}
		return false;
	}

	// check if the figure can go down to the defined index or the position right below
	canGoDown(occupiedTiles, index) {
		index = index || this.getBottomTile() + dimensions;
		// the tile to check is not out of bounds
		if (index < (dimensions * dimensions)) {
			// check if the index tile is occupied
			return !this.__isOccupied(occupiedTiles, index);
		}
		return false;
	}

	// get the upper-most position that the figure can move to
	getUpperLimit(occupiedTiles) {
		var i = this.getTopTile();		
		if (this.canGoUp(occupiedTiles)) {
			while (this.canGoUp(occupiedTiles, i) && i >= 0) {
				i -= dimensions;
			}
			i += dimensions;
		}
		return i;
	}

	// get the down-most position that the figure can move to
	getDownLimit(occupiedTiles) {
		var i = this.getBottomTile() + dimensions;		
		if (this.canGoDown(occupiedTiles, i)) {
			while (this.canGoDown(occupiedTiles, i) && (i < dimensions * dimensions)) {
				i += dimensions;
			}
		}
		return (i - dimensions * this.sizeH);
	}

	// get the X for a determined position
	__calculateX(position) {
		return (gap + (tileSize + gap) * (position % dimensions));
	}

	// get the y for a determined position
	__calculateY(position) {
		return (gap + (tileSize + gap) * Math.floor(position / dimensions));
	}

	// move tile to the designated position
	moveTo(position) {
		this.position = position;
		this.image.position.x = this.__calculateX(position);
		this.image.position.y = this.__calculateY(position);
	}

}