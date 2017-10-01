const {
    Command
} = require('discord.js-commando');
const DnDRepository = require('../../modules/data/dndRepository');
const config = require('../../config.json');

module.exports = class InitCharacterCommand extends Command {
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
		let gamingChannelName = config.dnd.gamingChannel;
		if (message.channel.name !== gamingChannelName) {
			return;
		}
		this.displayCharacter(message);
	}

	displayCharacter(message) {
		let character = this.dndRepository.getCharacter(message.guild, message.author.toString());
		message.reply(`here is your character information!
		
		**Strength:** ${character.strength} (${character.getStrengthModifier()})
		**Dexterity:** ${character.dexterity} (${character.getDexModifier()})
		**Intelligence:** ${character.intelligence} (${character.getIntelligenceModifier()})
		**Constitution:** ${character.constitution} (${character.getConModifier()})
		**Wisdom:** ${character.wisdom} (${character.getWisdomModifier()})
		**Charisma:** ${character.charisma} (${character.getCharismaModifier()})
		
		Type "!initcharacter" to reroll.`);
	}
}
