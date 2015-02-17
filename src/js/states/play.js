import {Board} from '../modules/board.js';

export class Play extends Phaser.State {
	
	preload() {
	}

	create() {
	}

	init(level) {
		// save current level
		this.currentLevel = level;
		// save levels
		this.levels = this.game.config.phaserito.levels;
		// Game begins
		var board = new Board({game: this.game, endLevelCallback: () => { this.__loadNextLevel(); }}).
						loadLevel(this.levels[level]);
	}

	__loadNextLevel() {
		var nextLevel = this.currentLevel + 1;
		if (nextLevel < this.levels.length) {
			this.game.state.restart(true, false, nextLevel);
		}
		else {
			console.debug("YOU FINISHED THE GAME!!!");
		}
	}
}
