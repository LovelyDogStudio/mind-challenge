var gap = 16;
var tileSize = 60;

export class Icon {

	constructor({game: game, group: group, position: position = 0, sizeW: sizeW = 1, sizeH: sizeH = 1, color: color = 'blue', callback: callback, name: name = "figure", resize: resize = true, cols: cols}) {
		// save properties
		this.position = position;
		this.group = group;
		this.sizeW = sizeW;
		this.sizeH = sizeH;
		this.tileColor = color;
		this.callback = callback;
		this.cols = cols;
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
		this.image = this.group.create(x, y, this.tileColor);
		resize && this.image.scale.set(width, height);
		this.image.inputEnabled = true;
		this.image.events.onInputDown.add(() => {
			this.callback && this.callback();
		}, this);
	}

	// get the X for a determined position
	__calculateX(position) {
		return (gap + (tileSize + gap) * (position % this.cols));
	}

	// get the y for a determined position
	__calculateY(position) {
		return (gap + (tileSize + gap) * Math.floor(position / this.cols));
	}

	// move tile to the designated position
	moveTo(position) {
		this.position = position;
		this.image.position.x = this.__calculateX(position);
		this.image.position.y = this.__calculateY(position);
	}

}