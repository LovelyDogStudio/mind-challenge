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
		// save callback
		this.endLevelCallback = endLevelCallback;
		// init environment
		this.__init();
	}

	__init() {
		// draw board
		this.board = this.game.add.sprite(0, 0, 'light-grey', this);
		this.board.scale.set(320, 320);
		// create tiles
		this.tiles = [];
		for (var i = 0; i < this.numTiles * this.numTiles; i++) {
			this.tiles[i] = new Tile({game: this.game, position: i});
		}
	}

	// recieves a level configuration and builds the level accordingly
	loadLevel(level) {
		// save level
		this.level = level;
		// create spaceship
		this.spaceship = new SpaceShip({game: this.game, position: level.spaceship.position, callback: () => { this.move(-1); } });
		// create asteroids
		this.asteroids = level.asteroids.map((el, index) => {
			return new Asteroid({game: this.game, position: el.position, sizeW: el.sizeW, sizeH: el.sizeH, color: el.color, callback: () => { this.move(index); } });
		});
		// create exit
		this.exit = new Exit({game: this.game, position: level.exit.position});
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
		element.moveTo(destination);
		// if it's the spaceship, check if it's on the exit tile
		if (!isAsteroid) {
			if (destination == this.exit.position) {
				this.endLevelCallback && this.endLevelCallback();
			}
		}
	}
};
