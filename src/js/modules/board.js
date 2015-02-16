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
		// draw rectangle
		this.element = new Phaser.Rectangle(0, 0, 320, 320);
		// fill rectangle
		this.game.debug.geom(this.element, '#cccccc');
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
			new Asteroid({game: this.game, position: 3, sizeW: 3, sizeH: 1, color: '#ff3', callback: () => { this.move(0); } }),
			new Asteroid({game: this.game, position: 11, sizeW: 1, sizeH: 3, color: '#396', callback: () => { this.move(1); } }),
			new Asteroid({game: this.game, position: 12, sizeW: 3, sizeH: 1, color: '#00f', callback: () => { this.move(2); } }),
			new Asteroid({game: this.game, position: 18, sizeW: 1, sizeH: 2, color: '#9fc', callback: () => { this.move(3); } }),
			new Asteroid({game: this.game, position: 22, sizeW: 1, sizeH: 2, color: '#9cf', callback: () => { this.move(4); } }),
			new Asteroid({game: this.game, position: 30, sizeW: 3, sizeH: 1, color: '#93c', callback: () => { this.move(5); } }),
			new Asteroid({game: this.game, position: 33, sizeW: 2, sizeH: 1, color: '#f90', callback: () => { this.move(6); } }),
		];
	}

	move(index) {
		var asteroid = this.asteroids[index];
		// will hold the destination
		var destination = null;
		// get the tiles of the other asteroids
		var occupiedTiles = [];
		for (var i = 0; i < this.asteroids.lenght; i++) {
			if (i != index) occupiedTiles = occupiedTiles.concat(this.asteroids[i].getTiles());
		}
		console.log(occupiedTiles)
		// if horizontal
		if (asteroid.orientation === "horizontal") {
			// by default tries to move right
			console.log(asteroid.getRightTile())
			for (var j = (asteroid.getRightTile() % this.numTiles); j < this.numTiles; j++) {
				if (occupiedTiles.indexOf(asteroid.getRightTile() + j) > -1) destination = asteroid.getRightTile() + j;
			}
		}
		console.debug(destination)
	}
};
