module.exports = class DiceRollResult {
	constructor(naturalRoll, modifier, proficiencyBonus = null) {
		this.naturalRoll = naturalRoll;
		this.modifier = modifier;
		this.proficiencyBonus = proficiencyBonus;
		this.total = naturalRoll + modifier;
		if (proficiencyBonus != null) {
			this.total += proficiencyBonus;
		}
		this.isCriticalSuccess = naturalRoll == 20;
		this.isCriticalFailure = naturalRoll == 1;
	}
}
