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
		let userData = this.client.provider.get(message.guild, 'autorole-data');
		if (userData == null) {
			message.say("Error retrieving user data.");
			return;
		}
		var senderKey = message.author.toString();
		var count = userData[senderKey];
		let unacquiredRoles = config.autoRoles.levels.filter(l => l.requiredMessageCount > count);
		var lowestUnacquiredRoleMessageCount = Math.min.apply(Math, unacquiredRoles.map(function (level) { return level.requiredMessageCount; }));
		var lowestUnacquiredRole = unacquiredRoles.find(function (level) { return level.requiredMessageCount === lowestUnacquiredRoleMessageCount; })
		message.reply(`you have accumulated ${count} points! The next role you can acquire is ${lowestUnacquiredRole.roleName} at ${lowestUnacquiredRoleMessageCount} points!`);
	}
}
