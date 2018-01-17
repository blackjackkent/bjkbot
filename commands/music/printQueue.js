const {
	Command
} = require('discord.js-commando');
const config = require('../../config.json');
const MusicRepository = require('../../modules/data/musicRepository');

module.exports = class PrintQueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'queue',
			group: 'music',
			memberName: 'queue',
			guildOnly: true,
			description: 'Prints the next five songs to be played in the queue',
			examples: ['queue']
		});
		this.musicRepository = new MusicRepository(client);
	}

	run(message) {
		const queue = this.musicRepository.getQueue(message.guild);
		if (!queue || !queue.length) {
			message.say(`The music queue is empty! Use \`${config.prefix}addsong\` to add a song!`);
			return;
		}
		const itemsToPrint = queue.slice(0, 5);
		let response = 'Up Next:\n\n';
		itemsToPrint.forEach((item, index) => {
			response += `${index + 1}. ${item.songTitle}\n`;
		});
		message.say(response);
	}
};
