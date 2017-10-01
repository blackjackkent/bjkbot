const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json');
const https = require('https');

module.exports = class WikiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'wiki',
			group: 'wiki',
			memberName: 'wiki',
			guildOnly: true,
			description: 'Searches Wikipedia for the first article matching the search phrase',
			examples: ['wiki The Defenestration of Prague', 'wiki Sense and Sensibility (film)'],
			args: [{
				key: 'keyphrase',
				prompt: 'What phrase do you want to search for on Wikipedia?',
				type: 'string'
			}]
		});
	}
	run(message, args) {
		const {
            keyphrase
        } = args;
		return this.queryWikipedia(message, encodeURIComponent(keyphrase));
	}

	queryWikipedia(message, keyphrase) {
		var options = {
			host: `${config.wiki.language}.wikipedia.org`,
			path: `/w/api.php?action=query&list=search&srsearch=${keyphrase}&format=json&srlimit=1`
		};
		var self = this;
		var callback = function (response) {
			var body = '';
			response.on('data', function (chunk) {
				body += chunk;
			});
			response.on('end', function () {
				var data = JSON.parse(body);
				if (!data || !data.query || !data.query.search) {
					self.sendNotFoundMessage(message, keyphrase);
					return;
				}
				self.sendFoundMessage(message, data.query.search[0].title);
				console.log(JSON.parse(body));
			});
		}

		https.request(options, callback).end();
	}

	sendNotFoundMessage(message, keyphrase) {
		message.say(`I couldn't find any results on Wikipedia for "${keyphrase}". :(`);
	}

	sendFoundMessage(message, articleTitle) {
		articleTitle = this.encodeArticleTitle(articleTitle);
		message.say(`https://${config.wiki.language}.wikipedia.org/wiki/${articleTitle}`);
	}

	encodeArticleTitle(articleTitle) {
		articleTitle = articleTitle.replace(/ /g, "_");
		return articleTitle;
	}
}
