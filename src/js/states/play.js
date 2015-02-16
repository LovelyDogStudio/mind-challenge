import {Board} from '../modules/board.js';

export class Play extends Phaser.State {
	preload() {
	}
	create() {
		// Game begins
		var board = new Board({game: this.game});
	}
}
