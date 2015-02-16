/**
 * So the webpack includes the file for the pre-loading css animation
 */

import {API} from './modules/api';
import {Button} from './modules/button';
//import {DialogService} from './modules/dialogService';
import {Game} from './modules/game';
import {I18n} from './modules/i18n';
import {Logo} from './modules/logo';
import {Sprite} from './modules/sprite';
import {Promiser} from './modules/promiser';
import {Toggle} from './modules/toggle';
import {Utils} from './modules/utils';
// this include the default framework messages
import {MessageBundles} from './config/lang/';

// default language is English
var lang = Utils.getURLParameter("lang") || "en";
// default configuration
var config = require("./config/game")(lang);

exports = module.exports = {
	API,
	Button,
	config,
//	DialogService,	// pending revision
	Game,
	I18n,
	lang,
	Logo,
	Promiser,
	MessageBundles,	
	Toggle,
	Sprite,
	Utils
};
