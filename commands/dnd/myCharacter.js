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
		message.reply(`here is your character information!
		
		**Strength:** ${character.strength} (${character.getSkillModifierByName('strength')})
		**Dexterity:** ${character.dexterity} (${character.getSkillModifierByName('dexterity')})
		**Intelligence:** ${character.intelligence} (${character.getSkillModifierByName('intelligence')})
		**Constitution:** ${character.constitution} (${character.getSkillModifierByName('constitution')})
		**Wisdom:** ${character.wisdom} (${character.getSkillModifierByName('wisdom')})
		**Charisma:** ${character.charisma} (${character.getSkillModifierByName('charisma')})
		
		Type "!initcharacter" to reroll.`);
	}
}
