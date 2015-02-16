export class Promiser {
	static animation(tween) {
		return new Promise ((resolve, reject) => {
			tween.onComplete.addOnce(()=>resolve());
		});
	}

	static timer(game, time) {
		return new Promise ((resolve, reject) => {
			game.time.events.add(time, () => resolve(), this);
		})
	}
}