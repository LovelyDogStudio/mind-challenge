import {Tile} from './tile.js';
import {Exit} from './exit.js';
import {SpaceShip} from './spaceship.js';
import {Asteroid} from './asteroid.js';

export class Board extends Phaser.Group {

	constructor({game: game, group: group}) {
		// call parent class
		super(game, group, "board");
		// init board
		this.numTiles = 6;
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
		// create exit
		this.exit = new Exit({game: this.game});
		// create spaceship
		this.spaceship = new SpaceShip({game: this.game, position: 20});
		// create asteroids
		this.asteroids = [
			new Asteroid({game: this.game, position: 3, sizeW: 3, sizeH: 1, color: 'yellow', callback: () => { this.move(0); } }),
			new Asteroid({game: this.game, position: 11, sizeW: 1, sizeH: 3, color: 'green', callback: () => { this.move(1); } }),
			new Asteroid({game: this.game, position: 12, sizeW: 3, sizeH: 1, color: 'blue', callback: () => { this.move(2); } }),
			new Asteroid({game: this.game, position: 18, sizeW: 1, sizeH: 2, color: 'light-green', callback: () => { this.move(3); } }),
			new Asteroid({game: this.game, position: 22, sizeW: 1, sizeH: 2, color: 'light-blue', callback: () => { this.move(4); } }),
			new Asteroid({game: this.game, position: 30, sizeW: 3, sizeH: 1, color: 'purple', callback: () => { this.move(5); } }),
			new Asteroid({game: this.game, position: 34, sizeW: 2, sizeH: 1, color: 'orange', callback: () => { this.move(6); } }),
		];
	}

	move(index) {
		var asteroid = this.asteroids[index];
		// will hold the destination
		var destination = null;
		// get the tiles of the other asteroids
		var occupiedTiles = this.spaceship.getTiles();
		for (var i = 0; i < this.asteroids.length; i++) {
			if (i != index) occupiedTiles = occupiedTiles.concat(this.asteroids[i].getTiles());
		}
		// if horizontal
		if (asteroid.orientation === "horizontal") {
			// by default tries to move right
			if (asteroid.canGoRight(occupiedTiles)) {
				console.debug("right")
				destination = asteroid.getRightLimit(occupiedTiles);
			}
			else {
				console.debug("left")
				destination = asteroid.getLeftLimit(occupiedTiles);
			}
		}
		console.debug(destination)
		asteroid.moveTo(destination);
	}
};
