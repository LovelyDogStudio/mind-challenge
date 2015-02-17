export class Messages {

	constructor({game: game}) {
		this.game = game;
	}

	endLevelModal(resolve, reject) {
		var text = "Level cleared!";
		var style = { font: "", fill: "#fff", align: "center" };
		// add text to the game
		var message = this.game.add.text(this.game.world.centerX, this.game.world.centerY, text, style);
		// remove text after a time and resolve promise
		setTimeout(() => {
			message.destroy();
			resolve();
		}, 1200);
	}
}