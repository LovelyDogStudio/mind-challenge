import {I18n} from './i18n';
import {MessageBundles} from '../config/lang/';
import {Utils} from './utils';
import {ComponentManager} from './componentManager';

export class Game extends Phaser.Game {
	constructor({ config: gameConfig = {}, lang: gameLang = {}, states: gameStates = {}, theme: theme = 'default' }) {
		// Get the locale from the URL    /?lang=LOCALE
		var locale = Utils.getURLParameter("lang") || "en";

		// Merge base and game strings
		var lang = Utils.deepExtend(MessageBundles, gameLang);

		// Merge base and game config
		var config = Utils.deepExtend(require("../config/game")(locale), gameConfig);
		console.debug("using config:", config);

		// Instantiate game and add config
		super(config.game.canvas.width, 
			config.game.canvas.height, 
			config.game.canvas.renderMode, 
			config.game.canvas.parent,
			config.game.canvas.state,
			config.game.canvas.transparent,
			config.game.canvas.antialias,
			config.game.canvas.physicsConfig);
		this.config.phaserito = config

		// Instantiate translator
		this.i18n = I18n({ locale, messageBundles: lang});

		// Register states
		this.States = gameStates;
		console.debug("loaded states:", this.States);
		for (let state in gameStates) {
			this.state.add(state, gameStates[state]);
		}

		// start the plugin manager
		this.component = new ComponentManager({game: this, locale: locale, theme: theme});

		// Start the game with the Boot state
		this.state.start('Boot');
	}
}
