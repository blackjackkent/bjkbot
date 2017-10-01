const BaseRepository = require('./baseRepository');
const DnDCharacter = require('../models/dndCharacter');

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
		let rawCharacter = data[userId];
		let character = new DnDCharacter(rawCharacter);
		return character;
	}
}
