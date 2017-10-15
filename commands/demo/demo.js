const {
    Command
} = require('discord.js-commando');

module.exports = class DemoResponseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'demo',
			group: 'demo',
			memberName: 'demo',
			guildOnly: true,
			description: 'Prints a demo message to the screen',
			examples: ['demo']
		});
	}

	run(message) {
		message.say(`${message.author.toString()} Hello!`);
	}
};
