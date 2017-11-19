const AutoRegularProcessor = require('./autoRegularProcessor');
const CustomCommandProcessor = require('./customCommandProcessor');
const config = require('../../config.json');

module.exports = class MessageProcessor {
	constructor(client) {
		this.discordJsClient = client;
		this.autoRegularProcessor = new AutoRegularProcessor();
		this.customCommandProcessor = new CustomCommandProcessor(client);
	}

	process(message) {
		if (config.autoRegular.enabled) {
			this.autoRegularProcessor.process(message, this.discordJsClient);
		}
		this.customCommandProcessor.process(message);
	}
};
