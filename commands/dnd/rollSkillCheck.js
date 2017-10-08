const {
    Command
} = require('discord.js-commando');
const DiceRoller = require('../../modules/logic/diceRoller');
const DnDRepository = require('../../modules/data/dndRepository');
const config = require('../../config.json');

module.exports = class RollSkillCheckCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rollskillcheck',
			group: 'dnd',
			memberName: 'rollskillcheck',
			guildOnly: true,
			description: `Rolls a d20 for the requested skill based on your saved character's modifier`,
			examples: ['rollskillcheck strength', 'rollskillcheck dexterity'],
			args: [{
				key: 'skillIdentifier',
				prompt: `What skill do you want to roll a check for? Enter 'strength', 'dexterity', 'intelligence', 'wisdom', 'constitution', or 'charisma'.`,
				type: 'string'
			}]
		});
		this.dndRepository = new DnDRepository(client);
		this.diceRoller = new DiceRoller();
	}
	run(message, args) {
		try {
			const { skillIdentifier } = args;
			let character = this.dndRepository.getCharacter(message.guild, message.author.toString());
			if (!character) {
				message.reply(`You do not have a character saved yet! Type \`!initcharacter\` to create a character to play with.`);
				return;
			}
			let modifier = character.getSkillModifierByName(skillIdentifier);
			let result = this.diceRoller.getD20RollResult(modifier);
			let reply = '';
			if (result.isCriticalSuccess) {
				reply += 'Critical Success! ';
			}
			if (result.isCriticalFailure) {
				reply += 'Critica Failure! :( ';
			}
			reply += `You rolled a natural ${result.naturalRoll}. `;
			reply += `With your ${skillIdentifier} modifier of ${modifier}, your total is ${result.total}!`
			message.reply(reply);
			return result;
		} catch (error) {
			console.log(error);
		}
	}
}
