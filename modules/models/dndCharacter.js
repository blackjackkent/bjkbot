module.exports = class DnDCharacter {
	constructor(rawCharacter) {
		this.strength = rawCharacter.strength;
		this.dexterity = rawCharacter.dexterity;
		this.intelligence = rawCharacter.intelligence;
		this.constitution = rawCharacter.constitution;
		this.wisdom = rawCharacter.wisdom;
		this.charisma = rawCharacter.charisma;
	}

	getStrengthModifier() {
		return this.getModifier(this.strength);
	}

	getDexModifier() {
		return this.getModifier(this.dexterity);
	}

	getIntelligenceModifier() {
		return this.getModifier(this.intelligence);
	}

	getWisdomModifier() {
		return this.getModifier(this.wisdom);
	}

	getConModifier() {
		return this.getModifier(this.constitution);
	}

	getCharismaModifier() {
		return this.getModifier(this.charisma);
	}

	getModifier(skillValue) {
		if (skillValue === 1) {
			return -5;
		}
		if (skillValue === 2 || skillValue === 3) {
			return -4;
		}
		if (skillValue === 4 || skillValue === 5) {
			return -3;
		}
		if (skillValue === 6 || skillValue === 7) {
			return -2;
		}
		if (skillValue === 8 || skillValue === 9) {
			return -1;
		}
		if (skillValue === 10 || skillValue === 11) {
			return 0;
		}
		if (skillValue === 12 || skillValue === 13) {
			return 1;
		}
		if (skillValue === 14 || skillValue === 15) {
			return 2;
		}
		if (skillValue === 16 || skillValue === 17) {
			return 3;
		}
		if (skillValue === 18 || skillValue === 19) {
			return 4;
		}
		if (skillValue === 20 || skillValue === 21) {
			return 5;
		}
		if (skillValue === 22 || skillValue === 23) {
			return 6;
		}
		if (skillValue === 24 || skillValue === 25) {
			return 7;
		}
		if (skillValue === 26 || skillValue === 27) {
			return 8;
		}
		if (skillValue === 28 || skillValue === 29) {
			return 9;
		}
		if (skillValue === 30) {
			return 10;
		}
	}
}
