const DndScenarioRunner = require('../logic/dndScenarioRunner');
module.exports = class DndScenarioInitializer {
	constructor(client) {
		this.discordJsClient = client;
	}

	init() {
		let currentGuilds = this.discordJsClient.guilds;
		currentGuilds.every((guild) => {
			this.initForGuild(guild);
		});
		this.discordJsClient.on('guildCreate', (guild) => {
			this.initForGuild(guild);
		});
	}

	initForGuild(guild) {
		let scenarioRunner = new DndScenarioRunner(this.discordJsClient, guild);
		scenarioRunner.run();
	}
}
