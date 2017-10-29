const {
    Command
} = require('discord.js-commando');
const DiceRoller = require('../../modules/logic/diceRoller');
const DnDRepository = require('../../modules/data/dndRepository');
const { getCheckResultMessage, validateSkillArgument, getAbilityForSkill } = require('../../modules/logic/dndUtility');
const config = require('../../config.json');

module.exports = class RollSkillCheckCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rollskillcheck',
			group: 'dnd',
			memberName: 'rollskillcheck',
			guildOnly: true,
			description: `Rolls a d20 for the requested skill based on your saved character's modifier and proficiencies`,
			examples: ['rollskillcheck sleightofhand', 'rollabilitycheck perception'],
			args: [{
				key: 'skillIdentifier',
				prompt: `What skill do you want to roll a check for? Enter 'acrobatics', 'animalhandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleightofhand', 'stealth', or 'survival'.`,
				type: 'string',
				validate: function (value, message, arg) {
					let isValid = validateSkillArgument(value);
					if (!isValid) {
						return "Invalid skill. Type 'acrobatics', 'animalhandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleightofhand', 'stealth', or 'survival'."
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
		const { skillIdentifier } = args;
		let character = this.dndRepository.getCharacter(message.guild, message.author.toString());
		if (!character) {
			message.reply(`You do not have a character saved yet! Type \`${config.prefix}initcharacter\` to create a character to play with.`);
			return;
		}
		let abilityIdentifier = getAbilityForSkill(skillIdentifier);
		let modifier = character.getAbilityModifierByName(abilityIdentifier);
		let isProficient = character.proficientSkills.find(s => s.key === skillIdentifier) != undefined;
		let proficiencyBonus = isProficient ? 2 : null;
		let result = this.diceRoller.getD20RollResult(modifier, proficiencyBonus);
		let reply = getCheckResultMessage(result, abilityIdentifier, modifier, proficiencyBonus);
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
