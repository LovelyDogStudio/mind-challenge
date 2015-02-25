import {DataStore} from '../modules/dataStore.js';

export class LevelUI extends Phaser.Group {

	constructor({game: game, group: group, levelNumber: levelNumber}) {
		// call parent class
		super(game, group, "ui");
		// save properties
		this.levelNumber = levelNumber;
		this.moves = 0;
		// init environment
		this.showStats();
		this.showUI();
	}

	showStats() {
		// paint level number
		this.__paintLevelNumber();
		// paint moves
		this.__paintMoves();
		// if exists, paint best play of the user
		this.__paintBest();
		// return this for piping
		return this;
	}

	showUI() {
		// create restart level button
		this.__paintButton(200, 120, 110, 30, 'Restart level', 'light-grey', this.__restartLevel);
		// create go to level selector button
		this.__paintButton(200, 70, 110, 30, 'Go back', 'light-grey', this.__goToLevelSelector);
		// return this for piping
		return this;
	}

	updateMoves(moves) {
		// save updated moves
		this.moves = moves;
		// re-paint
		this.__paintMoves();
	}

	__paintLevelNumber() {
		if (typeof this.levelNumber !== "undefined") {
			var text = "Level " + (this.levelNumber + 1);
			var style = { font: '28px Roboto-Light', fill: "#fff", align: "center", stroke: "#000", strokeThickness: 2 };
			// add text to the game
			var textLevelNumber = this.game.add.text(this.game.width / 2, 25, text, style);
			// center text
			textLevelNumber.anchor.set(0.5);		
		}
	}

	__paintBest() {
		// init data store
		var storedData = new DataStore().getData();
		// get stored best play
		var best = storedData.levels[this.levelNumber].best;
		if (best) {
			var style = { font: '18px Roboto-Light', fill: "#fff", align: "center", stroke: "#000", strokeThickness: 2 };
			// add text to the game
			this.textBest = this.game.add.text(25, 75, "Best: " + best, style);
		}
	}

	__paintMoves() {
		if (!this.moves) {
			var style = { font: '18px Roboto-Light', fill: "#fff", align: "center", stroke: "#000", strokeThickness: 2 };
			// add text to the game
			this.textMoves = this.game.add.text(25, 125, "Moves: 0", style);
		}
		else {
			this.textMoves.text = "Moves: " + this.moves;
		}
	}

	__paintButton(x, y, width, height, text, color, callback) {
		// create button image
		var button = this.game.add.sprite(x, y, color);
		button.scale.set(width, height);
		// create button callback
		button.inputEnabled = true;
		button.events.onInputDown.add(callback, this);
		// define text
		var text = text;
		var style = { font: '18px Roboto-Light', fill: "#fff", align: "center", stroke: "#000", strokeThickness: 2 };
		// calculate position
		var position = { x: x + (width / 2), y: y + (height / 2) };
		// add text to the game
		var buttonText = this.game.add.text(position.x, position.y, text, style);
		// center text
		buttonText.anchor.set(0.5);				
	}

	__restartLevel() {
		// restart the current level
		this.game.state.restart(true, false, this.levelNumber);
	}

	__goToLevelSelector() {
		// go to the level loader
		this.game.state.start('Main');		
	}
};
