const {
    Command
} = require('discord.js-commando');
const DiceRoller = require('../../modules/logic/diceRoller');
const DnDRepository = require('../../modules/data/dndRepository');
const config = require('../../config.json');
const { getRandomItemsFromArray } = require('../../modules/logic/utility');

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
		let character = {
			strength: this.generateScore(),
			dexterity: this.generateScore(),
			intelligence: this.generateScore(),
			constitution: this.generateScore(),
			wisdom: this.generateScore(),
			charisma: this.generateScore(),
			proficientSkills: this.getRandomProficiencies()
		}
		this.storeCharacterData(message, character);
		message.reply(`your character has been created!
		
		**Strength:** ${character.strength}
		**Dexterity:** ${character.dexterity}
		**Intelligence:** ${character.intelligence}
		**Constitution:** ${character.constitution}
		**Wisdom:** ${character.wisdom}
		**Charisma:** ${character.charisma}
		**Proficiencies:** ${character.proficientSkills.map(function (skill) {
				return skill.key;
			}).join(",")}
		
		Type "!initcharacter" to reroll.`);
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
		let availableSkills = this.dndRepository.getAvailableSkills();
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
