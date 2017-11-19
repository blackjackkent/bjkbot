const config = require('../../config.json');

module.exports = class DnDCharacter {
	constructor(rawCharacter) {
		this.strength = rawCharacter.strength;
		this.dexterity = rawCharacter.dexterity;
		this.intelligence = rawCharacter.intelligence;
		this.constitution = rawCharacter.constitution;
		this.wisdom = rawCharacter.wisdom;
		this.charisma = rawCharacter.charisma;
		this.proficientSkills = rawCharacter.proficientSkills;
	}

	toString() {
		const message = `here is your character information!
		
		**Strength:** ${this.strength} (${this.getAbilityModifierByName('strength')})
		**Dexterity:** ${this.dexterity} (${this.getAbilityModifierByName('dexterity')})
		**Intelligence:** ${this.intelligence} (${this.getAbilityModifierByName('intelligence')})
		**Constitution:** ${this.constitution} (${this.getAbilityModifierByName('constitution')})
		**Wisdom:** ${this.wisdom} (${this.getAbilityModifierByName('wisdom')})
		**Charisma:** ${this.charisma} (${this.getAbilityModifierByName('charisma')})
		**Proficiencies:** ${this.proficientSkills.map(function (skill) {
				return skill.key;
			}).join(", ")}
		
		Type \`${config.prefix}initcharacter\` to reroll.`;
		return message;
	}

	getAbilityModifierByName(abilityName) {
		return this.getModifier(this[abilityName]);
	}

	getModifier(abilityValue) {
		if (abilityValue === 1) {
			return -5;
		}
		if (abilityValue === 2 || abilityValue === 3) {
			return -4;
		}
		if (abilityValue === 4 || abilityValue === 5) {
			return -3;
		}
		if (abilityValue === 6 || abilityValue === 7) {
			return -2;
		}
		if (abilityValue === 8 || abilityValue === 9) {
			return -1;
		}
		if (abilityValue === 10 || abilityValue === 11) {
			return 0;
		}
		if (abilityValue === 12 || abilityValue === 13) {
			return 1;
		}
		if (abilityValue === 14 || abilityValue === 15) {
			return 2;
		}
		if (abilityValue === 16 || abilityValue === 17) {
			return 3;
		}
		if (abilityValue === 18 || abilityValue === 19) {
			return 4;
		}
		if (abilityValue === 20 || abilityValue === 21) {
			return 5;
		}
		if (abilityValue === 22 || abilityValue === 23) {
			return 6;
		}
		if (abilityValue === 24 || abilityValue === 25) {
			return 7;
		}
		if (abilityValue === 26 || abilityValue === 27) {
			return 8;
		}
		if (abilityValue === 28 || abilityValue === 29) {
			return 9;
		}
		if (abilityValue === 30) {
			return 10;
		}
	}
}
