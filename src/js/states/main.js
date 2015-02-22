import {Logo} from '../../lib/modules/logo.js';
import {LevelSelector} from '../modules/levelSelector.js';

/**
 * Main screen
 * @Class Main
 */
export class Main extends Phaser.State {

	create() {
		// build the level selector
		this.levelSelector = new LevelSelector({game: this.game});
	}
};
