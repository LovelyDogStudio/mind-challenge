import {
	States
}
from './states/';
import {
	MessageBundles
}
from '../config/lang/';

/**
 * Entry point
 * @Class LovelyDogGame
 */
class LovelyDogGame extends Phaserito.Game {
	/**
	 * @construct LovelyDogGame
	 */
	constructor() {
		/**
		 * the default language tags of the game
		 * @member {String} LovelyDogGame#lang
		 */
		this.lang = MessageBundles;

		/**
		 * the config of the game
		 * @member {Object} LovelyDogGame#config
		 */
		this.config = require("../config/game.js")(Phaserito.lang);

		/**
		 * the states of the game
		 * @member {Object} LovelyDogGame#states
		 */
		this.states = States;

		/**
		 * call the constructor of the parent class
		 */
		super({
			config: this.config, 
			lang: this.lang, 
			states: this.states
		});
	}
}


/**
 *	This will set the layout for the game and initiate it
 */


// we are saving a reference for future use
Phaserito.LovelyDogGame = LovelyDogGame;

// the default CSS with the default fonts, change if you don't want to use any of Phaserito CSS
require('../lib/styles.less');

// when everything is loaded, start the game process
window.onload = () => new LovelyDogGame();
