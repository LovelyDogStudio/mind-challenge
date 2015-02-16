export class Sprite extends Phaser.Sprite {
	constructor(game, x, y, key, frame) {
		// call parent
		super(game, x, y, key, frame);
		// get config for animations
		var config = this.game.config.phaserito.animations;
		// if there are animations defined, add them
		if (config[key] !== undefined) {
			var spriteAnimations = config[key];
			for (let i = 0, l = spriteAnimations.length; i < l; i++){
				let { name, frames, frameRate, speed = this.game.config.phaserito.game.defaultAnimationSpeed, loop, useNumericIndex } = spriteAnimations[i];
				this.animations.add(name, frames, frameRate || (frames.length * speed), loop, useNumericIndex);
			}
		}
	}

	playAnimation(name) {
		return new Promise((resolve, reject) => {
			var animation = this.animations.play(name);
			if (animation) {
				animation.onComplete.addOnce(() => {
					resolve();
				}, this);
			} else {
				resolve();
			}
		});
	}

	stopAnimation() {
		if (this.animations.currentAnim && this.animations.currentAnim.isPlaying)
			this.animations.currentAnim.stop(true, true);
	}
}
