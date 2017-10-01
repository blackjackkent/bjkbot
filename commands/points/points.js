const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class PointsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'points',
			group: 'points',
			memberName: 'points',
			guildOnly: true,
			description: 'Displays the current number of points accumulated by the calling user',
			examples: ['points']
		});
	}
	run(message) {
		let userData = this.client.provider.get(message.guild, 'autoregular-data');
		if (userData == null) {
			message.say("Error retrieving user data.");
			return;
		}
		var senderKey = message.author.toString();
		var count = userData[senderKey];
		message.reply(`you have accumulated ${count} points!`);
	}
}
