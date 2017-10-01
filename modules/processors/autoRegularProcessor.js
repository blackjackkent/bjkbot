let config = require('../../config.json');
module.exports = class AutoRegularProcessor {
	process(message, client) {
		if (message.author.id === client.user.id) {
			return;
		}
		let userData = this.getUserData(message, client);
		this.updateUserData(message, client, userData);
		this.setRegularRoleIfApplicable(message, userData);
	}

	getUserData(message, client) {
		let userData = client.provider.get(message.guild, 'autoregular-data');
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
		client.provider.set(message.guild, 'autoregular-data', userData);
	}

	setRegularRoleIfApplicable(message, userData) {
		let currentRoles = message.member.roles;
		let isAlreadyRegular = currentRoles.find('name', config.autoRegular.regularRoleName) != null;
		let isOverRequiredMessageCount = userData[message.author.toString()] > config.autoRegular.requiredMessageCount;
		if (!isAlreadyRegular && isOverRequiredMessageCount) {
			let regularRole = message.guild.roles.find('name', config.autoRegular.regularRoleName);
			message.member.addRole(regularRole, 'Became regular via message count');
			message.reply(`you have been promoted to ${config.autoRegular.regularRoleName}!`);
		}
	}
}
