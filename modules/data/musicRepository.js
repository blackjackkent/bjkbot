const BaseRepository = require('./baseRepository');

module.exports = class MusicRepository extends BaseRepository {
	constructor(client) {
		super(client);
	}
	getSongAtQueuePosition(guild, queuePosition) {
		let data = this.get(guild, 'music-data');
		return data[queuePosition];
	}
	deleteSongAtQueuePosition(guild, queuePosition) {
		let data = this.get(guild, 'music-data');
		data.splice(queuePosition, 1);
		this.set(guild, 'music-data', data);
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
