import {Tile} from './tile.js';
import {Exit} from './exit.js';
import {SpaceShip} from './spaceship.js';
import {Asteroid} from './asteroid.js';

export class Board extends Phaser.Group {

	constructor({game: game, group: group}) {
		// call parent class
		super(game, group, "board");
		// init board
		this.__init();
	}

	__init() {
		// draw rectangle
		this.element = new Phaser.Rectangle(0, 0, 320, 320);
		// fill rectangle
		this.game.debug.geom(this.element, '#cccccc');
		// create tiles
		this.tiles = [];
		for (var i = 0; i < 36; i++) {
			this.tiles[i] = new Tile({game: this.game, position: i});
		}
		// create exit
		this.exit = new Exit({game: this.game});
		// create spaceship
		this.spaceship = new SpaceShip({game: this.game, position: 20});
		// create asteroids
		this.asteroids = [
			new Asteroid({game: this.game, position: 3, sizeW: 3, sizeH: 1, color: '#ff3'}),
			new Asteroid({game: this.game, position: 11, sizeW: 1, sizeH: 3, color: '#396'}),
			new Asteroid({game: this.game, position: 12, sizeW: 3, sizeH: 1, color: '#00f'}),
			new Asteroid({game: this.game, position: 18, sizeW: 1, sizeH: 2, color: '#9fc'}),
			new Asteroid({game: this.game, position: 22, sizeW: 1, sizeH: 2, color: '#9cf'}),
			new Asteroid({game: this.game, position: 30, sizeW: 3, sizeH: 1, color: '#93c'}),
			new Asteroid({game: this.game, position: 33, sizeW: 2, sizeH: 1, color: '#f90'}),
		];
	}
};
