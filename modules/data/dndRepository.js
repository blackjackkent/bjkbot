const BaseRepository = require('./baseRepository');
const DnDCharacter = require('../models/dndCharacter');
const DndScenario = require('../models/dndScenario');
const { getRandomValue } = require('../logic/utility');

module.exports = class DnDRepository extends BaseRepository {
	getCharacters(guild) {
		return this.get(guild, 'dndcharacter-data');
	}

	setCharacters(guild, characterData) {
		this.set(guild, 'dndcharacter-data', characterData);
	}

	getCharacter(guild, userId) {
		const data = this.getCharacters(guild);
		if (data == null) {
			return null;
		}
		const rawCharacter = data[userId];
		if (!rawCharacter) {
			return null;
		}
		const character = new DnDCharacter(rawCharacter);
		return character;
	}

	getRandomScenario(guild) {
		const data = this.getAllScenarios(guild);
		if (!data) {
			return null;
		}
		const max = data.length - 1;
		const random = getRandomValue(max, 0);
		const rawScenario = data[random];
		return new DndScenario(rawScenario);
	}

	getAllScenarios(guild) {
		return this.get(guild, 'dndscenario-data');
	}

	setAllScenarios(guild, value) {
		this.set(guild, 'dndscenario-data', value);
	}
};
