const {
    Command
} = require('discord.js-commando');
const DnDRepository = require('../../modules/data/dndRepository');
const config = require('../../config.json');

module.exports = class MyCharacterCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mycharacter',
			group: 'dnd',
			memberName: 'mycharacter',
			guildOnly: true,
			description: 'Displays the stats for your character.',
			examples: ['initcharacter']
		});
		this.dndRepository = new DnDRepository(client);
	}
	run(message) {
		this.displayCharacter(message);
	}

	displayCharacter(message) {
		let character = this.dndRepository.getCharacter(message.guild, message.author.toString());
		message.reply(character.toString());
	}
}
