import {Logo} from '../../lib/modules/logo.js';
import {Title} from '../modules/title.js';
import {LevelSelector} from '../modules/levelSelector.js';

/**
 * Main screen
 * @Class Main
 */
export class Main extends Phaser.State {

	create() {
		// paint title
		this.title = new Title({game: this.game}).drawTitle({ position: { x: this.game.world.centerX, y: 100 } });
		// build the level selector
		this.levelSelector = new LevelSelector({game: this.game});
	}
};
