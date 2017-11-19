let config = require('../../config.json');
module.exports = class AutoRoleProcessor {
	process(message, client) {
		if (message.author.id === client.user.id) {
			return;
		}
		let userData = this.getUserData(message, client);
		this.updateUserData(message, client, userData);
		this.setRoleIfApplicable(message, userData);
	}

	getUserData(message, client) {
		let userData = client.provider.get(message.guild, 'autorole-data');
		if (!userData) {
			userData = {};
		}
		return userData;
	}

	updateUserData(message, client, userData) {
		var senderKey = message.author.toString();
		if (userData.hasOwnProperty(senderKey)) {
			userData[senderKey]++;
		} else {
			userData[senderKey] = 1;
		}
		client.provider.set(message.guild, 'autorole-data', userData);
	}

	setRoleIfApplicable(message, userData) {
		let currentRoles = message.member.roles;
		let currentPoints = userData[message.author.toString()];
		let validRoles = config.autoRoles.levels.filter(l => l.requiredMessageCount <= currentPoints);
		validRoles.forEach((role) => {
			if (currentRoles.find('name', role.roleName) != null) {
				return;
			}
			let roleSetting = message.guild.roles.find('name', role.roleName);
			message.member.addRole(roleSetting, `Became ${role.roleName} via message count`);
			message.reply(`you have been promoted to ${role.roleName}!`);
		});
	}
}
