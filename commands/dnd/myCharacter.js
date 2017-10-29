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
		
		**Strength:** ${character.strength} (${character.getAbilityModifierByName('strength')})
		**Dexterity:** ${character.dexterity} (${character.getAbilityModifierByName('dexterity')})
		**Intelligence:** ${character.intelligence} (${character.getAbilityModifierByName('intelligence')})
		**Constitution:** ${character.constitution} (${character.getAbilityModifierByName('constitution')})
		**Wisdom:** ${character.wisdom} (${character.getAbilityModifierByName('wisdom')})
		**Charisma:** ${character.charisma} (${character.getAbilityModifierByName('charisma')})
		**Proficiencies:** ${character.proficientSkills.map(function (skill) {
				return skill.key;
			}).join(",")}
		
		Type "${config.prefix}initcharacter" to reroll.`);
	}
}
