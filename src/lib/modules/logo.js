export class Logo extends Phaser.Group {
	constructor(game, parent, config) {
		super(game, parent, "logo");

		this.logo;
		this.logoBright;

		this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo', this);
		this.logo.anchor.x = .5;
		this.logo.anchor.y = .5;
		this.logo.alpha = 0;

		this.logoBright = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logoBright', this);
		this.logoBright.anchor.x = .5;
		this.logoBright.anchor.y = .5;

		this.logoMask = this.game.add.graphics(this.game.world.centerX + 280, this.game.world.centerY, this);
		this.logoMask.beginFill(0xffffff);
		this.logoMask.lineStyle(10, 0xffffff, 1);
		this.logoMask.moveTo(-130, -150);
		this.logoMask.lineTo(-70, -150);
		this.logoMask.lineTo(80, 150);
		this.logoMask.lineTo(20, 150);
		this.logoMask.lineTo(-130, -150);
		this.logoMask.endFill();

		this.logoBright.mask = this.logoMask;
	}

	animate() {
		return new Promise((resolve, reject) => {
			var logoTween;
			logoTween = this.game.add.tween(this.logo).to({alpha: 1}, 1000, Phaser.Easing.Quadratic.Out, true);
			logoTween.onComplete.add(() => {
				this.game.add.tween(this.logoMask).to({ x: this.game.world.centerX - 330}, 1200, Phaser.Easing.Quadratic.InOut, true, 1000, Number.MAX_VALUE).onLoop.add(resolve, this);
			}, this);
		});
	}
}
