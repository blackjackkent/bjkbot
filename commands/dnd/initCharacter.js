const {
    Command
} = require('discord.js-commando');
const DiceRoller = require('../../modules/logic/diceRoller');
const DnDRepository = require('../../modules/data/dndRepository');
const DndCharacter = require('../../modules/models/dndCharacter');
const config = require('../../config.json');
const { getRandomItemsFromArray } = require('../../modules/logic/utility');
const { getAvailableSkills } = require('../../modules/logic/dndUtility');

module.exports = class InitCharacterCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'initcharacter',
			group: 'dnd',
			memberName: 'initcharacter',
			guildOnly: true,
			description: 'Adds your character to the game with a set of randomized stats.',
			examples: ['initcharacter']
		});
		this.diceRoller = new DiceRoller();
		this.dndRepository = new DnDRepository(client);
	}
	run(message) {
		this.initCharacter(message);
	}

	initCharacter(message) {
		let characterData = {
			strength: this.generateScore(),
			dexterity: this.generateScore(),
			intelligence: this.generateScore(),
			constitution: this.generateScore(),
			wisdom: this.generateScore(),
			charisma: this.generateScore(),
			proficientSkills: this.getRandomProficiencies()
		}
		let character = new DndCharacter(characterData);
		this.storeCharacterData(message, character);
		message.reply(character.toString());
	}

	generateScore() {
		let values = [];
		for (let i = 0; i < 4; i++) {
			values.push(this.diceRoller.roll('d6'));
		}
		values.sort((a, b) => a - b);
		values.shift();
		let sum = values.reduce((a, b) => a + b, 0);
		return sum;
	}

	getRandomProficiencies() {
		let availableSkills = getAvailableSkills();
		let proficientSkills = getRandomItemsFromArray(availableSkills, 3);
		return proficientSkills;
	}

	storeCharacterData(message, character) {
		let characterData = this.dndRepository.getCharacters(message.guild);
		if (characterData == null) {
			characterData = {};
		}
		let senderKey = message.author.toString();
		characterData[senderKey] = character;
		this.dndRepository.setCharacters(message.guild, characterData);
	}
}
