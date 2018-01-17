const {
	Command
} = require('discord.js-commando');
const request = require('request');

module.exports = class WikiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'inspiro',
			group: 'inspiro',
			memberName: 'inspiro',
			guildOnly: true,
			description: 'Retrieves a random inspirational image from http://inspirobot.me/',
			examples: ['inspiro']
		});
	}
	run(message) {
		return this.queryInspirobot(message);
	}

	queryInspirobot(message) {
		const self = this;
		request('http://inspirobot.me/api?generate=true', (err, response) => {
			if (err) {
				self.sendNotFoundMessage(message);
				return;
			}
			self.sendFoundMessage(message, response.body);
		});
	}

	sendNotFoundMessage(message) {
		message.say('Error contacting Inspirobot. :(');
	}

	sendFoundMessage(message, data) {
		message.say(data);
	}
};
