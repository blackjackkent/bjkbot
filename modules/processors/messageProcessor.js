const AutoRoleProcessor = require('./autoRoleProcessor');
const CustomCommandProcessor = require('./customCommandProcessor');
const config = require('../../config.json');

module.exports = class MessageProcessor {
	constructor(client) {
		this.discordJsClient = client;
		this.autoRoleProcessor = new AutoRoleProcessor();
		this.customCommandProcessor = new CustomCommandProcessor(client);
	}

	process(message) {
		if (config.autoRoles.enabled) {
			this.autoRoleProcessor.process(message, this.discordJsClient);
		}
		this.customCommandProcessor.process(message);
	}
};
