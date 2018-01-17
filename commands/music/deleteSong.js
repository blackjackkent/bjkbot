const {
	Command
} = require('discord.js-commando');
const MusicRepository = require('../../modules/data/musicRepository');

module.exports = class DeleteSongCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'deletesong',
			group: 'music',
			memberName: 'deletesong',
			guildOnly: true,
			description: 'Removes a song at a given position in the music queue',
			examples: ['deletesong 5'],
			args: [{
				key: 'queuePosition',
				prompt: 'What queue item would you like to remove?',
				type: 'integer'
			}]
		});
		this.musicRepository = new MusicRepository(client);
	}

	run(message, args) {
		let {
			queuePosition
		} = args;
		queuePosition -= 1;
		const queueItem = this.musicRepository.getSongAtQueuePosition(message.guild, queuePosition);
		this.musicRepository.deleteSongAtQueuePosition(message.guild, queuePosition);
		message.say(`Removed "${queueItem.songTitle}" from the queue.`);
	}
};
