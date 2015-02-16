import {ActionDialog} from './actionDialog.js';
import {AlertDialog} from './alertDialog.js';
import {WinDialog} from './winDialog.js';

export class DialogService extends Phaser.Group {
	constructor(game, config) {
		super(game, undefined, "dialogs");
		this.fixedToCamera = true;
		this.dialogQueue = [];

		// Add the backdrop
		var backdropGraphic = new Phaser.Graphics(game, 0, 0);
		backdropGraphic.beginFill(0x000000);
		backdropGraphic.drawRect(0, 0, 920, 600);
		this.backdropSprite = new Phaser.Sprite(game, 0, 0, backdropGraphic.generateTexture(), undefined, this);
		this.backdropSprite.alpha = .5;
		this.backdropSprite.inputEnabled = true;
		this.backdropSprite.events.onInputDown.add(this.dismissCurrent, this);
		this.add(this.backdropSprite);

		// Instantiate modals of all kinds
		this.actionDialog = new ActionDialog(game, { dialogService: this });
		this.alertDialog = new AlertDialog(game, { dialogService: this });
		this.bigWinDialog = new WinDialog(game, { dialogService: this }, "big-win");

		this.visible = false;
	}

	action(definition = { title: title = "", message: message = "", buttonLabel: buttonLabel = "", buttonAction: undefined }) {
		return new Promise((resolve, reject) => {
			this.dialogQueue.push({ dialogInstance: this.actionDialog, definition, resolve, reject });
			if (!this.visible) {
				this.processQueue();
			}
		});
	}

	alert(definition = { title: title = "", message: message = ""}) {
		return new Promise((resolve, reject) => {
			this.dialogQueue.push({ dialogInstance: this.alertDialog, definition, resolve, reject });
			if (!this.visible) {
				this.processQueue();
			}
		});
	}

	bigWin(definition = { amount: 0 }){
		return new Promise((resolve, reject) => {
			this.dialogQueue.push({ dialogInstance: this.bigWinDialog, definition, resolve, reject });
			if (!this.visible) {
				this.processQueue();
			}
		});
	}

	processQueue() {
		var dialogConfig = this.dialogQueue.shift();
		this.visible = true;
		this.currentDialog = dialogConfig.dialogInstance;
		this.currentDialog.prompt(dialogConfig.definition)
		.then(() => {
			if (this.dialogQueue.length === 0){
				this.visible = false;
			} else {
				this.processQueue();
			}
		}).then(dialogConfig.resolve);
	}

	dismissCurrent() {
		if (this.currentDialog !== undefined) {
			this.currentDialog.close();
		}
	}
}
