const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json');
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
	run(message, args) {
		const {
            keyphrase
        } = args;
		return this.queryInspirobot(message);
	}

	queryInspirobot(message) {
		let self = this;
		request('http://inspirobot.me/api?generate=true', function (err, response) {
			if (err) {
				self.sendNotFoundMessage(message);
				return;
			}
			self.sendFoundMessage(message, response.body);
		})
	}

	sendNotFoundMessage(message) {
		message.say(`Error contacting Inspirobot. :(`);
	}

	sendFoundMessage(message, data) {
		message.say(data);
	}
}
