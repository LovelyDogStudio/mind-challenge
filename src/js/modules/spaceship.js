import {Figure} from './figure.js';

export class SpaceShip extends Figure {

	constructor({game: game, group: group, position: position = 0, callback: callback}) {
		// call parent class
		super({game: game, group: group, position: position, sizeW: 1, sizeH: 2, color: 'red', callback: callback, name: "spaceship"});
	}
};