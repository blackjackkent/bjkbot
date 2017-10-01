const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class DemoResponseCommand extends Command {
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
		const {
			phrase
		} = args;
		const regex = /(^[0-9]*?)([d])([0-9]*)(\s?\+\s?([0-9]*))?$/;
		let match = regex.exec(phrase);
		const multiplier = parseInt(match[1]);
		const max = parseInt(match[3]);
		if (!this.isValidDiceType(max)) {
			message.reply('invalid dice type!');
			return;
		}
		const addition = parseInt(match[5]);
		let result = this.rollMultiDie(max, multiplier, addition);
		message.reply(`you rolled ${result}!`);

	}

	rollDie(max) {
		return Math.floor(Math.random() * max) + 1;
	}

	rollMultiDie(max, multiplier, addition) {
		if (isNaN(multiplier)) {
			multiplier = 1;
		}
		let result = 0;
		for (let i = 0; i < multiplier; i++) {
			let roll = this.rollDie(max);
			result += roll;
		}
		if (!isNaN(addition)) {
			result += addition;
		}
		return result;
	}

	isValidDiceType(max) {
		const validDiceTypes = [4, 6, 8, 10, 12, 20];
		return validDiceTypes.indexOf(max) > -1;
	}
}
