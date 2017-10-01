const {
    Command
} = require('discord.js-commando');
const DiceRoller = require('../../modules/logic/diceRoller');
const config = require('../../config.json');

module.exports = class RollCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			group: 'dnd',
			memberName: 'roll',
			guildOnly: true,
			description: 'Produces a random dice roll of the desired D&D die.',
			examples: ['roll', 'roll d20'],
			args: [{
				key: 'phrase',
				prompt: '',
				type: 'string',
				default: ''
			}]
		});
	}
	run(message, args) {
		const { phrase } = args;
		if (phrase === '') {
			phrase = 'd20';
		}
		let diceRoller = new DiceRoller();
		try {
			let result = diceRoller.roll(phrase);
			message.reply(`you rolled ${result}!`);
		} catch (errorMessage) {
			message.reply(errorMessage);
			return;
		}
	}
}
