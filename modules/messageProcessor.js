const AutoRegularProcessor = require('./autoRegularProcessor');
const config = require('../config.json');

module.exports = class MessageProcessor {
	constructor(client) {
		this.discordJsClient = client;
		this.autoRegularProcessor = new AutoRegularProcessor();
	}

	process(message) {
		if (config.autoRegular.enabled) {
			this.autoRegularProcessor.process(message, this.discordJsClient);
		}
	}
}
