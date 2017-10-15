const {
    Command
} = require('discord.js-commando');
const DnDRepository = require('../../modules/data/dndRepository');
const config = require('../../config.json');

module.exports = class AddScenarioCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'addscenario',
			group: 'dnd',
			memberName: 'addscenario',
			guildOnly: true,
			description: 'Adds a scenario to the database to be randomly given to the gaming channel later.',
			examples: ['addscenario'],
			args: [{
				key: 'description',
				prompt: `Give a short description of your scenario. (Ex. 'A roving band of orcs attacks your party out of the forest. Roll a dexterity check to dodge their arrows.')`,
				type: 'string'
			}, {
				key: 'difficultyClass',
				prompt: 'What is the DC of the challenge? (i.e. how high must a player roll in order to pass?)',
				type: 'integer',
			}, {
				key: "skill",
				prompt: "Which skill should this challenge be checked against? Type 'strength', 'constitution', 'intelligence', 'wisdom', 'dexterity', or 'charisma'.",
				type: "string",
				validate: function (value, message, arg) {
					const valid = ['strength', 'constitution', 'intelligence', 'wisdom', 'dexterity', 'charisma'];
					if (!valid.includes(value)) {
						return "Invalid skill. Type 'strength', 'constitution', 'intelligence', 'wisdom', 'dexterity', or 'charisma'.";
					}
					return true;
				},
			}, {
				key: 'successMessage',
				prompt: `What should be displayed to users who pass the challenge? (Ex. 'You successfully dodge aside, pulling your weapons to enter the fray.')`,
				type: 'string'
			}, {
				key: 'failureMessage',
				prompt: `What should be displayed to users who fail the challenge? (Ex. 'You attempt to dodge, but are too slow, and immediately become a pincushion for several orc arrows.')`,
				type: 'string'
			}, {
				key: 'critSuccessMessage',
				prompt: `What should be displayed to users who roll a nat 20 (critical success) on the challenge? (Ex. 'You do a dramatic forward roll and dodge out of the way of the arrows, coming back to your feet safe and unharmed.')`,
				type: 'string'
			}, {
				key: 'critFailureMessage',
				prompt: `What should be displayed to users who roll a nat 1 (critical failure) on the challenge? (Ex. 'You take an arrow in the throat and are pinned to a nearby tree in dramatic fashion.')`,
				type: 'string'
			}]
		});
		this.dndRepository = new DnDRepository(client);
	}
	run(message, args) {
		if (message.channel.name !== config.dnd.scenarioChannel) {
			return;
		}
		const { description, difficultyClass, skill, successMessage, failureMessage, critSuccessMessage, critFailureMessage } = args;
		let currentScenarios = this.dndRepository.getAllScenarios(message.guild);
		currentScenarios.push({
			description,
			difficultyClass,
			skill,
			successMessage,
			failureMessage,
			critSuccessMessage,
			critFailureMessage
		});
		this.dndRepository.setAllScenarios(message.guild, currentScenarios);
		message.reply('Your scenario has been saved! It will be displayed randomly to the chat at a future point!');
		this.clearChannel(message);
	}

	clearChannel(message) {
		message.channel.fetchMessages().then(messages => {
			let messagesArr = messages.array();
			let messageCount = messagesArr.length;

			for (let i = 0; i < messageCount; i++) {
				messagesArr[i].delete();
			}
		});
	}
}
