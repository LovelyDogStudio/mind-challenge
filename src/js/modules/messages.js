export class Messages {

	constructor({game: game}) {
		this.game = game;
	}

	endLevelModal(resolve, reject) {
		var text = "Level cleared!";
		var style = { font: '28px Roboto-Light', fill: "#fff", align: "center" };
		// add text to the game
		var message = this.game.add.text(this.game.world.centerX, this.game.world.centerY, text, style);
		// center text
		message.anchor.set(0.5);
		// remove text after a time and resolve promise
		setTimeout(() => {
			message.destroy();
			resolve();
		}, 1200);
	}
}