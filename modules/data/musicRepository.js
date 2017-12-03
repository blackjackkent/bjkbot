const BaseRepository = require('./baseRepository');

module.exports = class MusicRepository extends BaseRepository {
	constructor(client) {
		super(client);
	}
	addSongToQueue(guild, queueItem) {
		let data = this.get(guild, 'music-data');
		if (!data) {
			data = [];
		}
		data.push(queueItem);
		this.setQueue(guild, data);
	}

	setQueue(guild, queueData) {
		this.set(guild, 'music-data', queueData);
	}

	clearQueue(guild) {
		this.setQueue(guild, []);
	}

	getQueue(guild) {
		let data = this.get(guild, 'music-data');
		if (!data) {
			data = [];
		}
		return data;
	}
}
