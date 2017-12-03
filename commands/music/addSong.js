const {
    Command
} = require('discord.js-commando');
var google = require('googleapis');
const youtube = google.youtube('v3');
const config = require('../../config.json');
const MusicRepository = require('../../modules/data/musicRepository');
const uuidv4 = require('uuid/v4');

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
		this.musicRepository = new MusicRepository(client);
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
		const command = this;
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
			command.printSearchResult(result, message);
			command.saveSearchResult(result, message);
		});
	}

	printSearchResult(result, message) {
		message.say(`Added "${result.snippet.title}" to the queue!`);
	}

	saveSearchResult(result, message) {
		const queueItem = {
			id: uuidv4(),
			requesterId: message.author.toString(),
			songUrl: "https://www.youtube.com/watch?v=" + result.id.videoId,
			songTitle: result.snippet.title
		};
		this.musicRepository.addSongToQueue(message.guild, queueItem);
	}
};
