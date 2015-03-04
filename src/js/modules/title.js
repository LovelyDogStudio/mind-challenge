export class Title {

	constructor({ game: game }) {
		// save properties
		this.game = game;
	}

	drawTitle({ position: position }) {
		var text = "Choose a level";
		var style = { font: '38px Roboto-Light', fill: "#fff", align: "center" };
		// add text to the game
		this.text = this.game.add.text(position.x, position.y, text, style);
		// center text
		this.text.anchor.set(0.5);

		var styleReflection = { font: '38px Roboto-Light', fill: "#fff", align: "center" };
		// create the reflection
		this.reflection = this.game.add.text(position.x, position.y + 25, text, styleReflection);
		// center text
		this.reflection.anchor.set(0.5);
		// invert
		this.reflection.scale.y = -1;
		// add gradient
	    var grd = this.reflection.context.createLinearGradient(0, 0, 0, this.reflection.canvas.height);
	    //  Add in 2 color stops
	    grd.addColorStop(0, 'rgba(255,255,255,0)');
	    grd.addColorStop(1, 'rgba(255,255,255,0.2)');
	    //  And apply to the Text
	    this.reflection.fill = grd;
	}

};