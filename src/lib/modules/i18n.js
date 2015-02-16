// Internationalization mechanism

export var I18n = function ({locale, messageBundles}) {
	if (locale.lastIndexOf('en') === 0 || messageBundles[locale] === undefined){
		console.debug("skipping translation");
		return passThrough;
	}
	else {
		console.debug("using translator, locale: "+locale);
		return translate(messageBundles[locale])
	}
}

function translate (messageBundle) {
	return function(literals, ...values) {
		let translationKey = buildKey(literals);
		let translationString = messageBundle[translationKey];

		if (translationString) {
			return buildMessage(translationString, ...values);
		}

		// Fallback
		console.debug('Undefined translation', translationKey)
		return 'TBD' + passThrough(arguments);
	}
}

function passThrough(literals, ...values) {
	var args = [], N = values.length;
	for (var i = 0; i < N; i++)
		args.push(literals[i], values[i]);
	args.push(literals[N]);
	return args.join('');
}

function buildKey(literals) {
	let lastPartialKey = literals[literals.length - 1];
	let prependPartialKey = (memo, curr, i) => `${curr}{${i}}${memo}`;

	return literals.slice(0, -1).reduceRight(prependPartialKey, lastPartialKey);
}

function buildMessage(str, ...values) {
	return str.replace(/{(\d)}/g, (_, index) => values[Number(index)]);
}
