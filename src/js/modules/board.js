import {Tile} from './tile.js';
import {Exit} from './exit.js';
import {SpaceShip} from './spaceship.js';
import {Asteroid} from './asteroid.js';

export class Board extends Phaser.Group {

	constructor({game: game, group: group, endLevelCallback: endLevelCallback}) {
		// call parent class
		super(game, group, "board");
		// init board
		this.numTiles = 6;
		this.moves = 0;
		// save callback
		this.endLevelCallback = endLevelCallback;
		// init environment
		this.__init();
	}

	__init() {
		// draw board
		this.board = this.create(0, 0, 'light-grey');
		this.board.scale.set(320, 320);
		// create tiles
		this.tiles = [];
		for (var i = 0; i < this.numTiles * this.numTiles; i++) {
			this.tiles[i] = new Tile({game: this.game, group: this, position: i});
		}
		// position group
		this.y = 160;
	}

	// recieves a level configuration and builds the level accordingly
	loadLevel(level) {
		// save level
		this.level = level;
		// create spaceship
		this.spaceship = new SpaceShip({game: this.game, group: this, position: level.spaceship.position, callback: () => { this.move(-1); } });
		// create asteroids
		this.asteroids = level.asteroids.map((el, index) => {
			return new Asteroid({game: this.game, group: this, position: el.position, sizeW: el.sizeW, sizeH: el.sizeH, color: el.color, callback: () => { this.move(index); } });
		});
		// create exit
		this.exit = new Exit({game: this.game, group: this, position: level.exit.position});
		// return this for piping
		return this;
	}

	// move the clicked element
	move(index) {
		// determine if we are moving the spaceship or an asteroid
		var isAsteroid = (index >= 0);
		var element = (isAsteroid) ? this.asteroids[index] : this.spaceship;
		// will hold the destination
		var destination = null;
		// get the tiles of the other elements
		var occupiedTiles = (isAsteroid) ? this.spaceship.getTiles() : [];
		for (var i = 0; i < this.asteroids.length; i++) {
			if (i != index) occupiedTiles = occupiedTiles.concat(this.asteroids[i].getTiles());
		}
		// if horizontal
		if (element.orientation === "horizontal") {
			// by default tries to move right
			if (element.canGoRight(occupiedTiles)) {
				destination = element.getRightLimit(occupiedTiles);
			}
			// left
			else {
				destination = element.getLeftLimit(occupiedTiles);
			}
		}
		// vertical
		else {
			// by default tries to move up
			if (element.canGoUp(occupiedTiles)) {
				destination = element.getUpperLimit(occupiedTiles);
			}
			// left
			else {
				destination = element.getDownLimit(occupiedTiles);
			}
		}
		// move element
		element.moveTo(destination);
		// increment moves
		this.moves++;
		this.__paintMoves();
		// if it's the spaceship, check if it's on the exit tile
		if (!isAsteroid) {
			if (destination == this.exit.position) {
				this.endLevelCallback && this.endLevelCallback();
			}
		}
	}

	showStats(levelNumber) {
		// paint level number
		this.__paintLevelNumber(levelNumber);
		// paint moves
		this.__paintMoves();
		// return this for piping
		return this;
	}

	__paintLevelNumber(levelNumber) {
		if (typeof levelNumber !== "undefined") {
			var text = "Level " + (levelNumber + 1);
			var style = { font: '28px Roboto-Light', fill: "#fff", align: "center", stroke: "#000", strokeThickness: 2 };
			// add text to the game
			this.text = this.game.add.text(this.game.width / 2, 25, text, style);
			// center text
			this.text.anchor.set(0.5);		
		}
	}

	__paintMoves() {
		if (!this.moves) {
			var style = { font: '18px Roboto-Light', fill: "#fff", align: "center", stroke: "#000", strokeThickness: 2 };
			// add text to the game
			this.text = this.game.add.text(25, 125, "Moves: 0", style);
		}
		else {
			this.text.text = "Moves: " + this.moves;
		}
	}

};
