const {
	Command
} = require('discord.js-commando');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = class ResetPointsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resetpoints',
			group: 'points',
			memberName: 'resetpoints',
			guildOnly: true,
			description: 'Resets the points for a particular user.',
			examples: ['resetpoints blackjackkent'],
			args: [
				{
					key: 'user',
					prompt: 'What user should be reset?',
					type: 'user'
				}
			]
		});
	}
	run(message, args) {
		const {
			user
		} = args;
		if (!message.member.hasPermission(Discord.Permissions.FLAGS.MANAGE_ROLES)) {
			message.reply('You do not have permission to manage roles in this server!');
			return;
		}
		const userData = this.client.provider.get(message.guild, 'autorole-data');
		const userKey = user.toString();
		if (Object.prototype.hasOwnProperty.call(userData, userKey)) {
			userData[userKey] = 0;
		}
		this.client.provider.set(message.guild, 'autorole-data', userData);
		message.reply('Message count for user reset to 0!');
		const affectedUser = message.guild.members.find(val => val.user.id === user.id);
		this.removeAllManagedRoles(message, affectedUser);
	}

	removeAllManagedRoles(message, affectedUser) {
		const currentRoles = affectedUser.roles;
		const managedRoles = config.autoRoles.levels;
		managedRoles.forEach((role) => {
			if (currentRoles.find('name', role.roleName) == null) {
				return;
			}
			const discordRole = message.guild.roles.find('name', role.roleName);
			affectedUser.removeRole(discordRole, 'Point count was reset.');
			message.reply(`user was removed from ${role.roleName}!`);
		});
	}
};
