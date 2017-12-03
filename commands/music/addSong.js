const {
    Command
} = require('discord.js-commando');

module.exports = class AddSongCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'addsong',
			group: 'music',
			memberName: 'addsong',
			guildOnly: true,
			description: 'Adds a song to the queue to be played in the music channel',
			examples: ['addsong closer chainsmokers', 'addsong the cave mumford and sons'],
			args: [{
				key: 'searchPhrase',
				prompt: 'What song would you like to add to the music queue?',
				type: 'string'
			}]
		});
	}

	run(message) {
		message.say(`${message.author.toString()} Hello!`);
	}
};
