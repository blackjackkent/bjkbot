const AutoRoleProcessor = require('./autoRoleProcessor');
const JukeboxProcessor = require('./jukeboxProcessor');
// const CustomCommandProcessor = require('./customCommandProcessor');
const config = require('../../config.json');

module.exports = class MessageProcessor {
	constructor(client) {
		this.discordJsClient = client;
		this.autoRoleProcessor = new AutoRoleProcessor();
		this.jukeboxProcessor = new JukeboxProcessor(this.discordJsClient);
		// this.customCommandProcessor = new CustomCommandProcessor(client);
	}

	inhibit(message) {
		if (message.content == `${config.prefix}join`) {
			return 'Command handled by scenario runner';
		}
		if (message.content.startsWith(`${config.prefix}addsong`) && !config.music.enabled) {
			return 'Music commands are disabled.';
		}
		if (this.isValidMusicCommand(message.content)) {
			return 'Command handled by jukebox runner';
		}
	}

	process(message) {
		if (config.autoRoles.enabled) {
			this.autoRoleProcessor.process(message, this.discordJsClient);
		}
		if (this.isValidMusicCommand(message.content)) {
			this.jukeboxProcessor.process(message);
		}
		// this.customCommandProcessor.process(message);
	}

	isValidMusicCommand(content) {
		if (!config.music.enabled) {
			return false;
		}
		const commands = [
			`${config.prefix}playqueue`,
			`${config.prefix}stopqueue`,
			`${config.prefix}nowplaying`,
			`${config.prefix}skipqueue`
		];
		if (commands.includes(content)) {
			return true;
		}
		return false;
	}
};
