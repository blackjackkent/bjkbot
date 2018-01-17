const {
	Command
} = require('discord.js-commando');
const DnDRepository = require('../../modules/data/dndRepository');

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
		const characters = this.dndRepository.getCharacters(message.guild);
		delete characters[message.author.toString()];
		this.dndRepository.setCharacters(message.guild, characters);
		message.reply(`Removed character reference for ${message.author.toString()}`);
	}
};
