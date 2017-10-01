const BaseRepository = require('./baseRepository');

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
		return data[userId];
	}
}
