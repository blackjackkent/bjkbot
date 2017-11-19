const {
    Command
} = require('discord.js-commando');
const DiceRoller = require('../../modules/logic/diceRoller');
const DnDRepository = require('../../modules/data/dndRepository');
const DndCharacter = require('../../modules/models/dndCharacter');
const config = require('../../config.json');
const { STRENGTH, DEXTERITY, CONSTITUTION, INTELLIGENCE, WISDOM, CHARISMA } = require('../../modules/constants/dndConstants');
const { getRandomItemsFromArray } = require('../../modules/logic/utility');
const { getAvailableSkills } = require('../../modules/logic/dndUtility');

module.exports = class ClearCharacterCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clearcharacter',
			group: 'dnd',
			memberName: 'clearcharacter',
			guildOnly: true,
			description: 'Removes your character stats from the system.',
			examples: ['clearcharacter']
		});
		this.dndRepository = new DnDRepository(client);
	}
	run(message) {
		this.clearCharacter(message);
	}

	clearCharacter(message) {
		let characters = this.dndRepository.getCharacters(message.guild);
		delete characters[message.author.toString()];
		this.dndRepository.setCharacters(message.guild, characters);
		message.reply(`Removed character reference for ${message.author.toString()}`);
	}
}
