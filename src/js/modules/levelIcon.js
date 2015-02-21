import {Icon} from './icon.js';

export class LevelIcon extends Icon {

	constructor({ game: game, group: group, position: position = 0, callback: callback = () => {}, cols: cols }) {
		// call parent class
		super({game: game, group: group, position: position, sizeW: 1, sizeH: 1, color: "orange", callback: callback, name: "icon"+position, cols: cols});
	}

	__paintLocked() {

	}

	__paintUnLocked() {
		
	}

	unlock() {

	}
};