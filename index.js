const {
    CommandoClient,
	SQLiteProvider
} = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const config = require('./config');
const MessageProcessor = require('./modules/processors/messageProcessor');
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
		['dnd', 'DND']
	])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
client.on('ready', () => {
	console.log('Bot initialized.');
	client.user.setGame('Overwatch');
});
var messageProcessor = new MessageProcessor(client);
client.on('message', (message) => {
	messageProcessor.process(message);
});
sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
	client.setProvider(new SQLiteProvider(db));
});
client.login(config.token);
