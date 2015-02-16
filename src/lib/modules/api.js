import {Utils} from './utils.js';

var httpplease = require('httpplease');
var jsonplugin = require('httpplease/plugins/json');
var oldiexdomain = require('httpplease/plugins/oldiexdomain');

export class API {
	constructor(game){
		this.buffer = [];
		this.inProgress = false;
		this.lastResult = null;
		this.call = httpplease
			.use(jsonplugin)
			.use(oldiexdomain)
			.defaults({
				timeout: 5000
			});
	}

	get(url, params) {
		this.request(url, 'GET', params);
	}

	post(url, params) {
		this.request(url, 'POST', params);
	}

	request(url, method, request) {
		return new Promise((resolve, reject) => {
			if (this.buffer.length) {
			  this.lastResult = this.buffer.shift();
				resolve(this.lastResult);
			} else {
				this.call({
					url: `${url}`,
					method: request.method || 'GET',
					body: request
				}, this._onResponse(this._beforeResolve(resolve), reject));
			}
		});
	}

	_onResponse(resolve, reject) {
		return (error, response) => {
			if (error !== undefined) {
				reject(error);
			} else {
				resolve(response.body);
			}
		}
	}

	_beforeResolve(resolve) {
		return (data) => {
			this.lastResult = data;
			if (data.buffer.length) {
				this.buffer = this.buffer.concat(data.buffer);
			}
			resolve(data);
		}
	}
}
