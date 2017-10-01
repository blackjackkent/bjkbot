module.exports = class BaseRepository {
	constructor(client) {
		this.client = client;
	}

	get(guild, key) {
		let result = this.client.provider.get(guild, key);
		if (!result) {
			return {};
		}
		return result;
	}

	set(guild, key, value) {
		this.client.provider.set(guild, key, value);
	}
}
