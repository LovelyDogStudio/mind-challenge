export class Utils {
	static mergeStates(base, overrider) {
		if (overrider) {
			if (typeof overrider === 'function') {
				base = overrider(base);
			} else {
				for (var property in overrider) {
					if (overrider[property]) {
						base.callbacks[property] = (function(property, originalCallback) {
							return function() {
								var self = this;
								var originalArguments = Array.prototype.slice.call(arguments);
								var extendedArguments = originalArguments.slice();
								var wrappedCallback = function() {
									originalCallback.apply(self, originalArguments);
								};

								extendedArguments.splice(3, 0, wrappedCallback);
								overrider[property].apply(this, extendedArguments);
							};
						})(property, base.callbacks[property]);
					}
				}
			}
		}
		return base;
	}

	static deepExtend(destination = {}, source = {}) {
		for (var property in source) {
			if (source[property] && source[property].constructor &&
				source[property].constructor === Object) {
				destination[property] = destination[property] || {};
				this.deepExtend(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	}

	static getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1].replace(/\+/g, '%20')) || null;
	}

	static floatToCurrency(input, decimals, euro) {
		decimals = (typeof decimals === 'undefined') ? 2 : decimals;
		var numberStr = parseFloat(input).toFixed(2).toString();
		var numFormatDec = numberStr.slice(-decimals);
		numberStr = numberStr.substring(0, numberStr.length - 3);
		var numFormat = [];
		while (numberStr.length > 3) {
			numFormat.unshift(numberStr.slice(-3));
			numberStr = numberStr.substring(0, numberStr.length - 3);
		}
		numFormat.unshift(numberStr);
		numFormatDec = (decimals > 0) ? ',' + numFormatDec : '';
		return numFormat.join('.') + numFormatDec + ((euro) ? '\u20AC' : '');
	}

	/**
	 * implementation of no operation
	 */
	static noop() {}


	static debounce(fn, throttle) {
		// TODO
	}
}
