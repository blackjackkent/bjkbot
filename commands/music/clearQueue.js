const {
    Command
} = require('discord.js-commando');
const MusicRepository = require('../../modules/data/musicRepository');

module.exports = class ClearQueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clearqueue',
			group: 'music',
			memberName: 'clearqueue',
			guildOnly: true,
			description: 'Removes all songs from the queue',
			examples: ['clearqueue']
		});
		this.musicRepository = new MusicRepository(client);
	}

	run(message, args) {
		this.musicRepository.clearQueue(message.guild);
		message.say(`Queue cleared!`);
	}
};
