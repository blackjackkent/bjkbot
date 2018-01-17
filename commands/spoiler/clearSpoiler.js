const {
	Command
} = require('discord.js-commando');

module.exports = class ClearSpoilerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clearspoiler',
			group: 'spoiler',
			memberName: 'clearspoiler',
			guildOnly: true,
			description: 'Clears the topic of the spoiler channel',
			examples: ['clearspoiler']
		});
	}
	run(message) {
		this.client.provider.set(message.guild, 'spoiler-topic', null);
		this.client.provider.set(message.guild, 'spoiler-author', null);
		message.say('The spoiler channel topic has been removed.');
	}
};
