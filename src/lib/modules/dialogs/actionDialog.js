import {Button}﻿ from './button.js';

export class ActionDialog extends Phaser.Group {
	constructor(game, { dialogService: dialogService, titleStyle: titleStyle, textStyle: textStyle } = {}) {
		super(game, dialogService, "actionDialog");
		var height = 274, width = 418;

		this.x = game.world.centerX - (width / 2);
		this.y = (game.camera.height / 2) - (height / 2);

		// Add background
		this.background = this.add(new Phaser.Sprite(game, 0, 0, 'actiondialog-background', 0));

		// Add labels
		this.dialogContent = new Phaser.Group(this.game, this, "dialogContent");
		this.titleLabel = game.add.text(width / 2, 60, "", titleStyle || { font: "24px Oswald-Bold", fill: "#DA0190", align: "center" }, this.dialogContent);
		this.textLabel = game.add.text(width / 2, 100, "", textStyle || { font: "21px Roboto-Light", fill: "#FFFFFF", align: "center" }, this.dialogContent);
		this.titleLabel.anchor.x = .5;
		this.textLabel.anchor.x = .5;

		// Add button
		this.actionButton = this.dialogContent.add(new Button(game, width / 2, height - 86, "dialog-button", () => this.onAction(), this, 'hover', 'out', 'out', 'out'));
		this.actionButton.anchor.x = .5;
		this.actionButton.anchor.y = .5;
		this.buttonLabel = game.add.text(width / 2, height - 86, "", textStyle || { font: "24px Oswald-Bold", fill: "#FFFFFF", align: "center" }, this.dialogContent);
		this.buttonLabel.anchor.x = .5;
		this.buttonLabel.anchor.y = .5;

		this.canClose = false;
		this.closing = false;
		this.alpha = 0;
	}

	prompt({ title: title = "", message: message = "", buttonLabel: buttonLabel = "",  buttonAction: buttonAction }) {
		return new Promise((resolve, reject) => {
			this.titleLabel.setText(title.toUpperCase());
			this.textLabel.setText(message);
			this.buttonLabel.setText(buttonLabel.toUpperCase());
			this.onClose = resolve;
			this.onAction = buttonAction;

			this.game.add.tween(this)
				.to({ alpha: 1 }, .3 * Phaser.Timer.SECOND, Phaser.Easing.Quadratic.In, true);

			this.game.time.events.add(1 * Phaser.Timer.SECOND, () => this.canClose = true);
		});
	}

	close() {
		if (!this.canClose) return;
		this.canClose = false;
		this.game.add.tween(this)
			.to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.In, true)
			.onComplete.add(() => {
				this.closing = false;
				if (this.onClose) {
					this.onClose();
					this.onClose = undefined;
				}
			}, this);
	}
}
