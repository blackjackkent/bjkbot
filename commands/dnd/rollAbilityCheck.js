const {
    Command
} = require('discord.js-commando');
const DiceRoller = require('../../modules/logic/diceRoller');
const DnDRepository = require('../../modules/data/dndRepository');
const { getCheckResultMessage, validateAbilityArgument } = require('../../modules/logic/dndUtility');
const config = require('../../config.json');

module.exports = class RollAbilityCheckCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rollabilitycheck',
			group: 'dnd',
			memberName: 'rollabilitycheck',
			guildOnly: true,
			description: `Rolls a d20 for the requested ability based on your saved character's modifier`,
			examples: ['  strength', 'rollabilitycheck dexterity'],
			args: [{
				key: 'abilityIdentifier',
				prompt: `What ability do you want to roll a check for? Enter 'strength', 'dexterity', 'intelligence', 'wisdom', 'constitution', or 'charisma'.`,
				type: 'string',
				validate: function (value, message, arg) {
					let isValid = validateAbilityArgument(value);
					if (!isValid) {
						return "Invalid ability. Type 'strength', 'constitution', 'intelligence', 'wisdom', 'dexterity', or 'charisma'."
					}
					return true;
				}
			}]
		});
		this.dndRepository = new DnDRepository(client);
		this.diceRoller = new DiceRoller();
	}
	run(message, args) {
		try {
			const executionResult = this.executeRoll(message, args);
			message.reply(executionResult.reply);
		} catch (error) {
			console.log(error);
		}
	}

	executeRoll(message, args) {
		const { abilityIdentifier } = args;
		let character = this.dndRepository.getCharacter(message.guild, message.author.toString());
		if (!character) {
			message.reply(`You do not have a character saved yet! Type \`!initcharacter\` to create a character to play with.`);
			return;
		}
		let modifier = character.getAbilityModifierByName(abilityIdentifier);
		let result = this.diceRoller.getD20RollResult(modifier);
		let reply = getCheckResultMessage(result, abilityIdentifier, modifier);
		return {
			reply,
			result
		};
	}

	runAsModule(message, args) {
		let executionResult = this.executeRoll(message, args);
		message.reply(executionResult.reply);
		return executionResult.result;
	}
}
