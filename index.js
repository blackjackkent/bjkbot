const {
    CommandoClient,
	SQLiteProvider
} = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const config = require('./config');
const MessageProcessor = require('./modules/processors/messageProcessor');
const DndScenarioInitializer = require('./modules/processors/dndScenarioInitializer');
process.on('unhandledRejection', r => console.log(r));
const client = new CommandoClient({
	commandPrefix: config.prefix,
	owner: config.ownerId,
	disableEveryone: true
});
client.registry
	.registerDefaultTypes()
	.registerGroups([
		['demo', 'Demo'],
		['spoiler', 'Spoiler'],
		['points', 'Points'],
		['dnd', 'DND'],
		['wiki', 'Wiki'],
		['customcommands', 'Custom Commands']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
client.dispatcher.addInhibitor(msg => {
	if (msg.content == config.prefix + 'join') {
		return 'Command handled by scenario runner';
	}
});
client.on('ready', () => {
	console.log('Bot initialized.');
	client.user.setGame(config.botDisplayGame);

	/* ------- MESSAGE PROCESSOR ---- */
	var messageProcessor = new MessageProcessor(client);
	client.on('message', (message) => {
		messageProcessor.process(message);
	});
});

sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
	client.setProvider(new SQLiteProvider(db)).then(() => {
		if (config.dnd.scenarioRunningEnabled) {
			var scenarioInit = new DndScenarioInitializer(client);
			scenarioInit.init();
		};
	});
});
client.login(config.token);
