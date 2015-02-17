import {Figure} from './figure.js';

export class Tile extends Figure {

	constructor({game: game, group: group, position: position = 0}) {
		// call parent class
		super({game: game, group: group, position: position, sizeW: 1, sizeH: 1, color: "grey", callback: () => {}, name: "tile"+position});
	}
};