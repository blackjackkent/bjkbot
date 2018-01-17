const {
	Command
} = require('discord.js-commando');
const DiceRoller = require('../../modules/logic/diceRoller');
const DnDRepository = require('../../modules/data/dndRepository');
const {
	STRENGTH, DEXTERITY, DEXTERITY_ABBREVIATION, CONSTITUTION, INTELLIGENCE, WISDOM, CHARISMA
} = require('../../modules/constants/dndConstants');
const { getCheckResultMessage, validateAbilityArgument, getCleanAbilityName } = require('../../modules/logic/dndUtility');
const config = require('../../config.json');

module.exports = class RollAbilityCheckCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rollabilitycheck',
			group: 'dnd',
			memberName: 'rollabilitycheck',
			guildOnly: true,
			description: 'Rolls a d20 for the requested ability based on your saved character\'s modifier',
			examples: [`rollabilitycheck ${STRENGTH}`, `rollabilitycheck ${DEXTERITY_ABBREVIATION}`],
			args: [{
				key: 'abilityIdentifier',
				prompt: `What ability do you want to roll a check for? Enter \`${STRENGTH}\`, \`${DEXTERITY}\`, \`${INTELLIGENCE}\`, \`${WISDOM}\`, \`${CONSTITUTION}\`, or \`${CHARISMA}\`.`,
				type: 'string',
				validate(value) {
					if (!validateAbilityArgument(value)) {
						return `Invalid ability. Type \`${STRENGTH}\`, \`${CONSTITUTION}\`, \`${INTELLIGENCE}\`, \`${WISDOM}\`, \`${DEXTERITY}\`, or \`${CHARISMA}\`.`
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
			if (!executionResult) {
				return;
			}
			message.reply(executionResult.reply);
		} catch (error) {
			console.log(error);
		}
	}

	executeRoll(message, args) {
		const { abilityIdentifier } = args;
		const character = this.dndRepository.getCharacter(message.guild, message.author.toString());
		if (!character) {
			message.reply(`You do not have a character saved yet! Type \`${config.prefix}initcharacter\` to create a character to play with.`);
			return null;
		}
		const identifier = getCleanAbilityName(abilityIdentifier);
		const modifier = character.getAbilityModifierByName(identifier);
		const result = this.diceRoller.getD20RollResult(modifier);
		const reply = getCheckResultMessage(result, identifier, modifier);
		return {
			reply,
			result
		};
	}

	runAsModule(message, args) {
		const executionResult = this.executeRoll(message, args);
		if (!executionResult) {
			return null;
		}
		message.reply(executionResult.reply);
		return executionResult.result;
	}
};
