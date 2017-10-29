const BaseRepository = require('./baseRepository');
const DnDCharacter = require('../models/dndCharacter');
const DndScenario = require('../models/dndScenario');
const { getRandomValue } = require('../logic/utility');

module.exports = class DnDRepository extends BaseRepository {
	constructor(client) {
		super(client);
	}
	getCharacters(guild) {
		return this.get(guild, 'dndcharacter-data');
	}

	setCharacters(guild, characterData) {
		this.set(guild, 'dndcharacter-data', characterData);
	}

	getCharacter(guild, userId) {
		let data = this.getCharacters(guild);
		if (data == null) {
			return null;
		}
		let rawCharacter = data[userId];
		if (!rawCharacter) {
			return null;
		}
		let character = new DnDCharacter(rawCharacter);
		return character;
	}

	getRandomScenario(guild) {
		let data = this.getAllScenarios(guild);
		if (!data) {
			return null;
		}
		var max = data.length - 1;
		var random = getRandomValue(max, 0);
		let rawScenario = data[random];
		return new DndScenario(rawScenario);
	}

	getAllScenarios(guild) {
		return this.get(guild, 'dndscenario-data');
	}

	setAllScenarios(guild, value) {
		this.set(guild, 'dndscenario-data', value);
	}
}
