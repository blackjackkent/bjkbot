module.exports = class DiceRollResult {
	constructor(naturalRoll, modifier) {
		this.naturalRoll = naturalRoll;
		this.modifier = modifier;
		this.total = naturalRoll + modifier;
		this.isCriticalSuccess = naturalRoll == 20;
		this.isCriticalFailure = naturalRoll == 1;
	}
}
