export class Button extends Phaser.Button {
	constructor(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, disabledFrame) {
		super(game, x, y, key, this.callbackHandler, this, overFrame, outFrame, downFrame);
		this.setStateFrame('Disabled', disabledFrame);
		this.input.useHandCursor = true;
		this.disabled = false;
		this.mouseIsOver = false;
		this.buttonCallback = callback;
		this.buttonCallbackContext = callbackContext;
		this.hotkeys = [];

		this.events.onInputOver.add(() => { 
			this.mouseIsOver = true 
		}, this);
		this.events.onInputOut.add(() => {
			//Passed to a function that doesn't return false because if false is returned, all the events are stopped.
            this.mouseIsOver = false;
        }, this);
	}

	addHotkey(key, repeat = false){
		var hotkey = this.game.input.keyboard.addKey(key);
		if (repeat){
			hotkey.onDown.add(this.startRepeat, this);
			hotkey.onUp.add(this.stopRepeat, this);
		} else {
			hotkey.onDown.add(this.callbackHandler, this);
		}
	}

	disable() {
		if (this.disabled) return;
		this.disabled = true;
		this.changeStateFrame('Disabled');
		this.input.useHandCursor = false;
		this.freezeFrames = true;
	}

	enable() {
		if (!this.disabled) return;
		this.disabled = false;
		this.freezeFrames = false;
		this.input.useHandCursor = true;
		this.changeStateFrame(this.mouseIsOver ? 'Over' : 'Out');
	}

	callbackHandler() {
		if (this.disabled || !this.buttonCallback) return;
		this.buttonCallback.apply(this.buttonCallbackContext, arguments);
	}

	setFrames(overFrame, outFrame, downFrame, disabledFrame) {
		super(overFrame, outFrame, downFrame);
		this.setStateFrame('Disabled', disabledFrame);
	}

	startRepeat() {
		if (!this.loop) {
			this.callbackHandler(arguments);
			this.loop = this.game.time.events.loop(200, () => this.callbackHandler(arguments), this);
		}
	}

	stopRepeat() {
		if (this.loop) {
			this.game.time.events.remove(this.loop);
			this.loop = undefined;
		}
	}
}
