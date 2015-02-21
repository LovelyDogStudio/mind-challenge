import {Figure} from './figure.js';

export class Tile extends Figure {

	constructor({ game: game, group: group, position: position = 0, callback: callback = () => {} }) {
		// call parent class
		super({game: game, group: group, position: position, sizeW: 1, sizeH: 1, color: "grey", callback: callback, name: "tile"+position});
	}
};