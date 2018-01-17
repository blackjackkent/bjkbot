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
		const userData = this.client.provider.get(message.guild, 'autorole-data');
		if (userData == null) {
			message.say('Error retrieving user data.');
			return;
		}
		const senderKey = message.author.toString();
		const count = userData[senderKey];
		const unacquiredRoles = config.autoRoles.levels.filter(l => l.requiredMessageCount > count);
		const lowestUnacquiredRoleMessageCount =
			Math.min(...unacquiredRoles.map(level => level.requiredMessageCount));
		const lowestUnacquiredRole = unacquiredRoles
			.find(level => level.requiredMessageCount === lowestUnacquiredRoleMessageCount);
		message.reply(`you have accumulated ${count} points! The next role you can acquire is ${lowestUnacquiredRole.roleName} at ${lowestUnacquiredRoleMessageCount} points!`);
	}
};
