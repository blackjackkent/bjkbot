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

	getAvailableSkills() {
		return [
			{
				key: "acrobatics",
				abilityKey: "dexterity"
			},
			{
				key: "animalhandling",
				abilityKey: "wisdom"
			},
			{
				key: "arcana",
				abilityKey: "intelligence"
			},
			{
				key: "athletics",
				abilityKey: "strength"
			},
			{
				key: "deception",
				abilityKey: "charisma"
			},
			{
				key: "history",
				abilityKey: "intelligence"
			},
			{
				key: "insight",
				abilityKey: "wisdom"
			},
			{
				key: "intimidation",
				abilityKey: "charisma"
			},
			{
				key: "investigation",
				abilityKey: "intelligence"
			},
			{
				key: "medicine",
				abilityKey: "wisdom"
			},
			{
				key: "nature",
				abilityKey: "intelligence"
			},
			{
				key: "perception",
				abilityKey: "wisdom"
			},
			{
				key: "performance",
				abilityKey: "charisma"
			},
			{
				key: "persuasion",
				abilityKey: "charisma"
			},
			{
				key: "religion",
				abilityKey: "intelligence"
			},
			{
				key: "sleightofhand",
				abilityKey: "dexterity"
			},
			{
				key: "stealth",
				abilityKey: "dexterity"
			},
			{
				key: "survival",
				abilityKey: "wisdom"
			}
		]
	}
}
