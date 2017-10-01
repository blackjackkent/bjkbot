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
		let {
			user
		} = args;
		if (!message.member.hasPermission(Discord.Permissions.FLAGS["MANAGE_ROLES"])) {
			message.reply("You do not have permission to manage roles in this server!");
			return;
		}
		let userData = this.client.provider.get(message.guild, 'autoregular-data');
		let userKey = user.toString();
		if (userData.hasOwnProperty(userKey)) {
			userData[userKey] = 0;
		}
		this.client.provider.set(message.guild, 'autoregular-data', userData);
		message.reply(`Message count for user reset to 0!`);
		let affectedUser = message.guild.members.find(val => val.user.id === user.id);
		this.removeRegularRoleIfApplicable(message, affectedUser);
	}

	removeRegularRoleIfApplicable(message, affectedUser) {
		let currentRoles = affectedUser.roles;
		let isAlreadyRegular = currentRoles.find('name', config.autoRegular.regularRoleName) != null;
		if (isAlreadyRegular) {
			let regularRole = message.guild.roles.find('name', config.autoRegular.regularRoleName);
			affectedUser.removeRole(regularRole, 'Point count was reset.');
			message.reply(`user was removed from ${config.autoRegular.regularRoleName}!`);
		}
	}
}
