const ytdl = require('ytdl-core');
const config = require('../../config.json');
const MusicRepository = require('../data/musicRepository');

module.exports = class JukeboxProcessor {
	constructor(client) {
		this.jukeboxDispatcher = null;
		this.musicRepository = new MusicRepository(client);
	}
	process(message) {
		if (message.content === `${config.prefix}playqueue`) {
			this.processStartQueue(message);
			return;
		}
		if (message.content === `${config.prefix}stopqueue`) {
			this.processStopQueue(message);
			return;
		}
		if (message.content === `${config.prefix}nowplaying`) {
			this.processNowPlaying(message);
			return;
		}
		if (message.content === `${config.prefix}skipqueue`) {
			this.processSkipQueue(message);
		}
	}

	processStartQueue(message) {
		if (this.checkIsValidScenario(message)) {
			message.member.voiceChannel.join()
				.then((connection) => {
					message.reply(`Now playing jams in \`#${message.member.voiceChannel.name}\`!`);
					this.playQueue(connection, message);
				})
				.catch(console.log);
		}
	}

	playQueue(connection, message) {
		const queue = this.musicRepository.getQueue(message.guild);
		if (!queue || !queue.length) {
			message.channel.send(`The music queue is empty! Use \`${config.prefix}addsong\` to add a song!`);
			this.jukeboxDispatcher = null;
			return;
		}
		const item = queue[0];
		this.printNowPlaying(item, message);
		this.jukeboxDispatcher = connection.playStream(ytdl(item.songUrl, { quality: 'lowest' }), { bitrate: 16000 });
		const self = this;
		this.jukeboxDispatcher.on('end', (reason) => {
			if (reason === 'user_stop') {
				return;
			}
			this.musicRepository.deleteSongAtQueuePosition(message.guild, 0);
			self.playQueue(connection, message);
		});
	}

	processStopQueue(message) {
		if (this.checkIsValidScenario(message, true)) {
			this.jukeboxDispatcher.end('user_stop');
		}
	}

	processNowPlaying(message) {
		if (this.checkIsValidScenario(message, true)) {
			const item = this.musicRepository.getSongAtQueuePosition(message.guild, 0);
			this.printNowPlaying(item, message);
		}
	}

	processSkipQueue(message) {
		if (this.checkIsValidScenario(message, true)) {
			this.jukeboxDispatcher.end();
		}
	}

	checkIsValidScenario(message, shouldValidateDispatcher) {
		if (!message.guild) {
			return false;
		}
		const jukeboxChannel = message.guild.channels
			.find(c => c.name === config.music.musicVoiceChannel);
		if (
			!jukeboxChannel
			|| !message.member.voiceChannel
			|| message.member.voiceChannel.name !== jukeboxChannel.name
		) {
			message.reply(`You must be in the \`#${jukeboxChannel.name}\` channel in order to manage the music queue.`);
			return false;
		}
		if (shouldValidateDispatcher && this.jukeboxDispatcher === null) {
			message.reply('The queue is not currently playing!');
			return false;
		}
		return true;
	}

	printNowPlaying(item, message) {
		let response = 'Now Playing:\n\n';
		response += `${item.songTitle}\n`;
		message.channel.send(response);
	}
};
