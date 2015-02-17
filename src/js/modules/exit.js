import {Figure} from './figure.js';

export class Exit extends Figure {

	constructor({game: game, group: group, position: position = 2}) {
		// call parent class
		super({game: game, group: group, position: position, color: "exit", name: "exit", resize: false});
		// save position
		this.position = position;
	}
};