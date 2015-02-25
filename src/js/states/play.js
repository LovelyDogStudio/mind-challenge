import {Board} from '../modules/board.js';
import {Messages} from '../modules/messages.js';
import {DataStore} from '../modules/dataStore.js';

export class Play extends Phaser.State {
	
	preload() {
	}

	create() {
		// instantiate messages manager
		this.messages = new Messages({game: this.game});
		// promisify manager
		Promise.promisifyAll(this.messages);
	}

	init(level) {
		// save current level
		this.currentLevel = level;
		// save levels
		this.levels = this.game.config.phaserito.levels;
		// Game begins
		var board = new Board({game: this.game, endLevelCallback: () => { this.__loadNextLevel(); }}).
						loadLevel(this.levels[level], level);
	}

	// loads the next level or finishes the game if already on the last level
	__loadNextLevel() {
		// calculate the next level
		var nextLevel = this.currentLevel + 1;
		// unlock the next level and save the config
		this.__unLockLevel(nextLevel);
		// show the message and load the next level
		if (nextLevel < this.levels.length) {
			// show end level modal
			this.messages.
				endLevelModalAsync().
				then(() => {
					// after the message load the new level
					this.game.state.restart(true, false, nextLevel);
			});
		}
		else {
			console.debug("YOU FINISHED THE GAME!!!");
		}
	}

	__unLockLevel(level) {
		// get data stored and unlock level
		new DataStore().unLockLevel(level);
	}
}
