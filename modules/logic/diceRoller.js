const DiceRollResult = require('../models/diceRollResult');
module.exports = class DiceRoller {
	getD20RollResult(modifier, proficiencyBonus = null) {
		let naturalRoll = this.roll('d20');
		return new DiceRollResult(naturalRoll, modifier, proficiencyBonus);
	}

	roll(phrase) {
		const regex = /(^[0-9]*?)([d])([0-9]*)(\s?\+\s?(\-?[0-9]*))?$/;
		let match = regex.exec(phrase);
		if (!match) {
			throw 'Invalid dice phrase! Examples of valid dice phrases include: `d20`, `3d6`, `d4 + 4`.';
		}
		let multiplier = parseInt(match[1]);
		let max = parseInt(match[3]);
		if (!this.isValidDiceType(max)) {
			throw 'Invalid dice type!';
		}
		let addition = parseInt(match[5]);
		let result = this.rollMultiDie(max, multiplier, addition);
		return result;
	}

	rollDie(max) {
		return Math.floor(Math.random() * max) + 1;
	}

	rollMultiDie(max, multiplier, addition) {
		if (isNaN(multiplier)) {
			multiplier = 1;
		}
		let result = 0;
		for (let i = 0; i < multiplier; i++) {
			let roll = this.rollDie(max);
			result += roll;
		}
		if (!isNaN(addition)) {
			result += addition;
		}
		return result;
	}

	isValidDiceType(max) {
		const validDiceTypes = [4, 6, 8, 10, 12, 20];
		return validDiceTypes.indexOf(max) > -1;
	}
}
