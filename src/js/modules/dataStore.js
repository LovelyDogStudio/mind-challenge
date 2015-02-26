export class DataStore {

	constructor() {
		// get the game's stored configuration
		this.storedData = Store.get('mind-challenge-data');
		// if data was not set on local storage
		if (!this.storedData) {
			this.storedData = { levels: { "0": { unlocked: true, best: 0 } } };
			this.save();
		}
	}

	isUnLocked(level) {
		if (this.storedData.levels[level]) {
			return this.storedData.levels[level].unlocked;
		}
		else {
			return false;
		}
	}

	unLockLevel(level) {
		if (!this.storedData.levels[level]
			|| !this.storedData.levels[level].unlocked) {
			this.storedData.levels[level] = { unlocked: true, best: 0 };
			this.save();
		}
	}

	setBestMove(level, bestMove) {
		if (this.storedData.levels[level]
			|| this.storedData.levels[level].unlocked) {
			this.storedData.levels[level].best = bestMove;
			this.save();
		}
	}

	getBestMove(level) {
		if (this.storedData.levels[level]
			|| this.storedData.levels[level].unlocked) {
			return this.storedData.levels[level].best;
		}
		else {
			return null;
		}
	}

	save() {
		Store.set('mind-challenge-data', this.storedData);
	}

	getData() {
		return this.storedData;
	}

	setData(data) {
		this.storedData = data;
	}

};