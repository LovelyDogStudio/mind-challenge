import {Sprite} from "../../modules/sprite";
import {Button} from "../../modules/button";
import {Toggle} from "../../modules/toggle";
import {Utils} from "../../modules/utils";

/**
 * This class adds objects to manage both for FX and Music volumes and mute state. It also adds the means to define music tracks and play them on a loop.
 */
export class SoundDirector {
	/**
	 * Constructor of the Class
	 * @param  {Object} options.game: game          The instance of a Phaserito.Game or Phaser.Game
	 * @param  {String} locale:       locale        Optional, locale of the theme (refer to theme documentation for more info). Defaults to "en" locale.
	 * @param  {String} theme:        theme         Optional, theme to apply to the managers (refer to theme documentation for more info). Defaults to "default" theme.
	 * @param  {Phaser.Group} group:  group         Optional, the group where the manager will be added. If not provided the managers will be added to the world.
	 * @return {SoundDirector}         The instance of the class
	 */
	constructor({ game: game = {}, locale: locale = 'en', theme: theme = 'default', group: group = undefined }) {
		// save params to properties
		this.game = game;
		this.group = group;
		this.locale = locale;
		this.theme = theme;
		// get config and merge with general config
		this.config = require('./config/component')(this.theme, this.locale);
		this.game.config.phaserito = Utils.deepExtend(this.game.config.phaserito, this.config);
		// music and laps
		this.music = undefined;
		this.laps = [];
		this.currentLap = undefined;
		// sound efects
		this.sounds = undefined;
		this.effects = [];
		// init environment
		this.__initEnvironment();
	}

	/**
	 * Initializes environment (privately called)
	 * @return {SoundDirector} return itself for piping
	 */
	__initEnvironment() {
		// reference to bar elements
		this.bar = {
			fx: {
				group: undefined,
				volume: 10,
				on: {},
				off: {},
				sprites: {
					back: [],
					fore: []
				}
			},
			music: {
				group: undefined,
				volume: 10,
				loop: false,
				on: {},
				off: {},
				sprites: {
					back: [],
					fore: []
				}		
			},
		};
		// references to mute buttons
		this.muted = {
			fx: {
				toggle: false,
				button: undefined,
				volume: 10
			},
			music: {
				toggle: false,
				button: undefined,
				volume: 10
			}
		}
		// return this for piping
		return this;
	}

	/**
	 * Adds a manager, be it FX or Music
	 * @param {String} options.type:  type  Type can take the values of "fx" or "music" and defines the type os manager to be added
	 * @param {Number} options.x:     x     The x position of the group containing the manager
	 * @param {Number} options.y:     y     The y position of the group containing the manager
	 * @param {Number} options.steps: steps The number of volume steps on the manager (eg: 10 steps is the default option and each step will represent a 10% of the volume)
	 * @return {SoundDirector} Return itself for piping
	 */
	addManager({type: type = 'fx', x: x = 0, y: y = 0, steps: steps = 10}) {
		if (steps > 1) {
			// create group
			var group = this.bar[type].group = new Phaser.Group(this.game, this.group);
			group.position = new Phaser.Point(x, y);
			var callback = (type === 'fx') ? this.setFxVolume : this.setMusicVolume;
			// layout manager
			this.bar[type].off = group.add(new Button(this.game, x, y, 'soundDirector', () => { this.setVolume({type, volume: 0}); }, this, type+'OffHover', type+'OffOut', type+'OffDown'));
			this.bar[type].sprites.back[0] = group.add(new Button(this.game, x, y, 'soundDirector', () => { this.setVolume({type, volume: 1}); }, this, 'barLeftBack', 'barLeftBack', 'barLeftBack'));
			this.bar[type].sprites.fore[0] = group.add(new Sprite(this.game, x, y, 'soundDirector', 'barLeftFore'));
			for (var i = 1; i < steps-1; i++) {
				this.bar[type].sprites.back[i] = group.add(new Button(this.game, x, y, 'soundDirector', ((i) => { return () => { this.setVolume({type, volume: i+1}); } })(i), this, 'barMiddleBack', 'barMiddleBack', 'barMiddleBack'));
				this.bar[type].sprites.fore[i] = group.add(new Sprite(this.game, x, y, 'soundDirector', 'barMiddleFore'));
			}
			this.bar[type].sprites.back[steps-1] = group.add(new Button(this.game, x, y, 'soundDirector', () => { this.setVolume({type, volume: steps}); }, this, 'barRightBack', 'barRightBack', 'barRightBack'));
			this.bar[type].sprites.fore[steps-1] = group.add(new Sprite(this.game, x, y, 'soundDirector', 'barRightFore'));
			this.bar[type].on = group.add(new Button(this.game, x, y, 'soundDirector', () => { this.setVolume({type, volume: steps}); }, this, type+'OnHover', type+'OnOut', type+'OnDown'));
			// hide fore figures not included in actual volume
			this.__displayVolumeBar(type);
			// position elements
			this.__positionElements({type, x, y});
			// return this for piping
			return this;
		}
	}

	/**
	 * Shows the fore figures that should be visible for this volume level (privately called)
	 * @param  {String} options.type:   type          Type can take the values of "fx" or "music" and defines the type os manager to be added
	 * @return {SoundDirector} Return itself for piping
	 */
	__displayVolumeBar(type) {
		// show fore figures included in actual volume
		for (var j = 0; j < this.bar[type].volume; j++) {
			this.bar[type].sprites.fore[j].visible = true;
		}
		// hide fore figures not included in actual volume
		for (var j = this.bar[type].volume; j < this.bar[type].sprites.fore.length; j++) {
			this.bar[type].sprites.fore[j].visible = false;
		}
		// return this for piping
		return this;
	}

	/**
	 * Positions the elements of the manager (privately called)
	 * @param {String} options.type:  type  Type can take the values of "fx" or "music" and defines the type os manager to be added
	 * @return {SoundDirector} return itself for piping
	 */
	__positionElements({type: type = 'fx'}) {
			// get dimensions
			var x = 0, y = 0;
			var sound = this.bar[type].off;
			var left = this.bar[type].sprites.back[0];
			var middle = this.bar[type].sprites.back[1];
			var offsetX = sound.getBounds().width + 5;
			var offsetY = (sound.getBounds().height - left.getBounds().height) / 2;
			var middleWidth = middle.getBounds().width;
			var steps = this.bar[type].sprites.back.length;
			// position elements
			this.bar[type].off.position = new Phaser.Point(x, y);
			this.bar[type].sprites.back[0].position = new Phaser.Point(offsetX+x, y+offsetY);
			this.bar[type].sprites.fore[0].position = new Phaser.Point(offsetX+x, y+offsetY);
			for (var i = 1; i < steps-1; i++) {
				this.bar[type].sprites.back[i].position = new Phaser.Point(offsetX+x+middleWidth*i, y+offsetY);
				this.bar[type].sprites.fore[i].position = new Phaser.Point(offsetX+x+middleWidth*i, y+offsetY);
			}
			this.bar[type].sprites.back[steps-1].position = new Phaser.Point(offsetX+x+middleWidth*(steps-1), y+offsetY);
			this.bar[type].sprites.fore[steps-1].position = new Phaser.Point(offsetX+x+middleWidth*(steps-1), y+offsetY);
			this.bar[type].on.position = new Phaser.Point(offsetX+x+middleWidth*steps+10, y);
			// return this for piping
			return this;
	}

	/**
	 * Set the volume for either the global game or just the music
	 * @param {String} options.type:   type   	The volume to change, possible values are "fx", which is the general volume and the default value, or "music"
	 * @param {Number} options.volume: volume 	The volume based on the steps defined (a 10 on a 10-steps volume would be the normal 100% volume), default value is 10
	 * @return {SoundDirector}					Returns this for piping
	 */
	setVolume({type: type = 'fx', volume: volume = 10}) {
		return (type === 'fx') ? this.__setFxVolume(volume) : this.__setMusicVolume(volume);
	}

	/**
	 * Sets the global volume (privately called)
	 * @param  {Number} volumeStep The volume based on the steps defined (a 10 on a 10-steps volume would be the normal 100% volume)
	 * @return {SoundDirector}      Return this for piping
	 */
	__setFxVolume(volumeStep) {
		this.bar.fx.volume = volumeStep;
		this.__displayVolumeBar('fx');
		// this volume affects the whole application, including the music
		this.game.sound.volume = this.__getFxVolume();
		// return this for piping
		return this;
	}

	/**
	 * Sets the music volume (privately called)
	 * @param  {Number} volumeStep The volume based on the steps defined (a 10 on a 10-steps volume would be the normal 100% volume)
	 * @return {SoundDirector}      Return this for piping
	 */
	__setMusicVolume(volumeStep) {
		this.bar.music.volume = volumeStep;
		this.__displayVolumeBar('music');
		// this volume affects only the music
		this.currentLap && (this.currentLap.volume = this.__getMusicVolume());
		// return this for piping
		return this;
	}

	/**
	 * Get the actual volume that Phaser needs (0 .. 1), uses the actual step and the numbers of steps to calculate it
	 * @return {Number} Return the volume in a Phaser-like fashion, value between 0 .. 1
	 */
	__getFxVolume() {
		return (this.bar.fx.volume / this.bar.fx.sprites.fore.length).toFixed(2);
	}

	/**
	 * Get the actual music volume that Phaser needs (0 .. 1), uses the actual step and the numbers of steps to calculate it
	 * @return {Number} Return the volume in a Phaser-like fashion, value between 0 .. 1
	 */
	__getMusicVolume() {
		return (this.bar.music.volume / this.bar.music.sprites.fore.length).toFixed(2);
	}

	/**
	 * Used to define the music audiosprite, tracks and if it should loop
	 * @param {Array}   options.laps: laps Define the tracks to be used in the music, it must be an array with the name of the markers in the audiosprite, eg: ["nameTrack1", "nameTrack2"]
	 * @param {String}  options.key:  key  The key of the audiosprite, default value is "music"
	 * @param {Boolean} options.loop: loop Whether music should loop or not, default value is FALSE
	 * @return {SoundDirector} Return this for piping
	 */
	setMusic({laps: laps = [], key: key = 'music', loop: loop = false}) {
		// load audiosprite
		this.music = this.game.add.audioSprite(key);
		// save laps
		this.laps = laps;
		// save if it should loop or not
		this.bar.music.loop = loop;
		// return this for piping
		return this;
	}

	/**
	 * Start playing the music defined in the setMusic method
	 * @return {SoundDirector} Return this for piping
	 */
	playMusic() {
		if (this.laps.length > 0) {
			// get first lap in the collection
			var lapName = this.laps.shift();
			// play lap
			this.currentLap = this.music.play(lapName);			
			this.currentLap.volume = this.__getMusicVolume();
			// push the lap at the end of the collection if it should loop
			this.bar.music.loop && this.laps.push(lapName);
			// when the lap finishes, play the next one
			if (!this.currentLap.onStop.has(this.playMusic, this)) {
				this.currentLap.onStop.add(this.playMusic, this);
			}
		}
		// return this for piping
		return this;
	}

	/**
	 * Pauses the music
	 * @return {SoundDirector} Return this for piping
	 */
	pauseMusic() {
		this.currentLap && this.currentLap.pause();
		// return this for piping
		return this;
	}

	/**
	 * Resumes the music
	 * @return {SoundDirector} Return this for piping
	 */
	resumeMusic() {
		this.currentLap && this.currentLap.resume();
		// return this for piping
		return this;
	}

	/**
	 * Adds a mute button for the general sound or the music
	 * @param {String} options.type:  type  Defines whether the button will mute the general sound or the music, possible values are "fx" and "music", defaults to "fx"
	 * @param {Number} options.x:     x     X position of the button
	 * @param {Number} options.y:     y     Y position of the button
	 * @param {Phaser.Group} options.group: group If a Phaser group is provided, the button will be added to it. Otherwise a new group will be created and added to the game.
	 * @return {SoundDirector} Return this for piping
	 */
	addMuteButton({type: type = 'fx', x: x = 0, y: y = 0, group: group = undefined}) {
		// define or create group
		group = group || new Phaser.Group(this.game);
		// add button
		this.muted[type].button = group.add(new Toggle(this.game, x, y, 'soundDirector', () => { this.toggleMute({type}); }, this, type+'NoMute', type+'NoMute', type+'NoMute', type+'NoMute', type+'Mute', type+'Mute', type+'Mute', type+'Mute'));
		// return this for piping
		return this;
	}

	/**
	 * Toggles between mute and unmute either the general sound or the music
	 * @param  {String} options.type: type          Defines what will be muted: the general sound or the music, possible values are "fx" and "music", defaults to "fx"
	 * @return {SoundDirector} Return this for piping
	 */
	toggleMute({type: type = 'fx'}) {
		// mute or unmute depending on toggle
		if (this.muted[type].toggle) {
			this.unMute({type: type});
		}
		else {
			this.mute({type: type});
		}
		// toggle mute flag
		this.muted[type].toggle = !this.muted[type].toggle;
		// return this for piping
		return this;
	}

	/**
	 * Mute either the general sound or the music
	 * @param {String} options.type:  type  Defines what will be muted: the general sound or the music, possible values are "fx" and "music", defaults to "fx"
	 * @return {SoundDirector} Return this for piping
	 */
	mute({type: type = 'fx'}) {
		// save current volume for unmute
		this.muted[type].volume = this.bar[type].volume;
		// mute sound
		this.setVolume({type: type, volume: 0});
		// return this for piping
		return this;
	}

	/**
	 * Unmute either the general sound or the music
	 * @param {String} options.type:  type  Defines what will be unmuted: the general sound or the music, possible values are "fx" and "music", defaults to "fx"
	 * @return {SoundDirector} Return this for piping
	 */
	unMute({type: type = 'fx'}) {
		// set volume to the previous value
		this.setVolume({type: type, volume: this.muted[type].volume});
		// return this for piping
		return this;
	}
}
