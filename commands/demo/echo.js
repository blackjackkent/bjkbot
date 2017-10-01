const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class EchoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'echo',
			group: 'demo',
			memberName: 'echo',
			guildOnly: true,
			description: 'Prints a message passed by the user',
			examples: ['echo Repeat this message'],
			args: [{
				key: 'phrase',
				prompt: 'What would you like the bot to say?',
				type: 'string'
			}]
		});
	}
	run(message, args) {
		const {
			phrase
        } = args;
		console.log(message);
		message.say(`${message.author.toString()} ${phrase}!`);
	}
}
