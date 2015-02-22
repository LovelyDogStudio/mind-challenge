import {Icon} from './icon.js';

export class LevelIcon extends Icon {

	constructor({ game: game, group: group, position: position = 0, callback: callback = () => {}, cols: cols, levelNumber: levelNumber = 0, storedData: storedData = null }) {
		// save properties
		this.game = game;
		this.levelNumber = levelNumber || position + 1;
		// call parent class
		super({game: game, group: group, position: position, sizeW: 1, sizeH: 1, color: "orange", callback: () => { this.unlocked && callback(); }, name: "icon"+position, cols: cols});
		// control lock/unlock
		this.unlocked = (storedData && (storedData.unlocked.indexOf(position) > -1));
		this.__paintLevelNumber();
		(this.unlocked) ? this.__paintUnLocked() : this.__paintLocked();
	}

	__paintLevelNumber() {
		var text = "" + this.levelNumber;
		var style = { font: '32px Roboto-Light', fill: "#fff", align: "center", stroke: "#000", strokeThickness: 6 };
		// calculate position
		var position = this.__getLevelNumberPosition();
		// add text to the game
		this.text = this.game.add.text(position.x, position.y, text, style);
		// center text
		this.text.anchor.set(0.5);		
		// if in group, add the text to it
		this.group && this.group.add(this.text);
	}

	__paintLocked() {
		// add icon if in group
		if (this.group) {
			// calculate position
			var position = this.__getLockPosition();
			// create sprite
			this.lock = this.group.create(position.x, position.y, 'lock').anchor.set(0.5);
		}
	}

	__paintUnLocked() {
		// add icon if in group
		if (this.group) {
			// calculate position
			var position = this.__getLockPosition();
			// create sprite
			this.lock = this.group.create(position.x, position.y, 'unlock').anchor.set(0.5);
		}
	}

	__getLevelNumberPosition() {
		return {
			x: this.image.x + (this.image.width / 2),
			y: this.image.y + (this.image.height / 2) - 5
		};
	}

	__getLockPosition() {
		return {
			x: this.image.x + (this.image.width / 2),
			y: this.image.y + this.image.height - 2
		};
	}

	unlock() {

	}
};