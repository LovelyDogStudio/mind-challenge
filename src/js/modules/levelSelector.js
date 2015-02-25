import {LevelIcon} from './levelIcon.js';
import {DataStore} from './dataStore.js';

export class LevelSelector extends Phaser.Group {

	constructor({game: game, group: group}) {
		// call parent class
		super(game, group, "levelSelector");
		// set selector size
		this.numCols = 4;
		// get the number of levels from the config
		this.numLevels = this.game.config.phaserito.levels.length;
		// init environment
		this.__init();
	}

	__init() {
		// get the game's stored configuration
		var storedData = new DataStore();
		// create level icons
		this.levels = [];
		for (var i = 0; (i < this.numCols * this.numCols) && i < this.numLevels; i++) {
			this.levels[i] = new LevelIcon({ game: this.game, group: this, position: i, cols: this.numCols, callback: ((index) => { return () => { this.loadLevel(index); } })(i), storedData: storedData });
		}
		// position group
		this.y = 160;
	}

	loadLevel(level) {
		// start the defined level
		this.game.state.start('Play', true, false, level);
	}
};
