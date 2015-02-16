import {Button} from "./button.js";

export class Toggle extends Button {
	constructor(game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, disabledFrame, toggledOverFrame, toggledOutFrame, toggledDownFrame, toggledDisabledFrame, toggled) {
		super(game, x, y, key, this.toggleHandler, this, overFrame, outFrame, downFrame, disabledFrame);
		this.toggleCallback = callback;
		this.toggleCallbackContext = callbackContext;
		this.overFrame = overFrame;
		this.outFrame = outFrame;
		this.downFrame = downFrame;
		this.disabledFrame = disabledFrame;
		this.toggledOverFrame = toggledOverFrame;
		this.toggledOutFrame = toggledOutFrame;
		this.toggledDownFrame = toggledDownFrame;
		this.toggledDisabledFrame = toggledDisabledFrame;
		this.isToggled = toggled;

		if (this.isToggled) {
			this.setFrames(this.toggledOverFrame, this.toggledOutFrame, this.toggledDownFrame, this.toggledDisabledFrame);
		}
	}

	toggleHandler() {
		this.isToggled = !this.isToggled;
		if (this.isToggled) {
			this.setFrames(this.toggledOverFrame, this.toggledOutFrame, this.toggledDownFrame, this.toggledDisabledFrame);
		} else {
			this.setFrames(this.overFrame, this.outFrame, this.downFrame, this.disabledFrame);
		}
		if (this.toggleCallback)
			this.toggleCallback.apply(this.toggleCallbackContext, arguments);
	}
}
