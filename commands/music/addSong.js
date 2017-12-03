const {
    Command
} = require('discord.js-commando');
var google = require('googleapis');
const youtube = google.youtube('v3');
const config = require('../../config.json');

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

	run(message, args) {
		const {
			searchPhrase
		} = args;
		const parameters = {
			'auth': config.music.youTubeApiKey,
			'maxResults': '1',
			'part': 'snippet',
			'q': searchPhrase,
			'type': 'video'
		}
		youtube.search.list(parameters, function (err, response) {
			if (err) {
				message.say('There was an error searching for your query. Please try again later.');
				return;
			}
			if (!response.items || response.items.length[0]) {
				message.say('No results found for your query. :( ');
				return;
			}
			const result = response.items[0];
			const url = "https://www.youtube.com/watch?v=" + result.id.videoId;
			message.say(`${url}`);
		});
	}
};
