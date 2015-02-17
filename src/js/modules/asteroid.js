import {Figure} from './figure.js';

export class Asteroid extends Figure {

	constructor({game: game, group: group, position: position = 0, sizeW: sizeW = 1, sizeH: sizeH = 1, color: color = '#00f', callback: callback}) {
		// call parent class
		super({game: game, group: group, position: position, sizeW: sizeW, sizeH: sizeH, color: color, callback: callback, name: "asteroid"});
	}
}