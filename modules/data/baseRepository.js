module.exports = class BaseRepository {
	constructor(client) {
		this.client = client;
	}

	get(guild, key) {
		let result = this.client.provider.get(guild, key);
		if (!result) {
			return null;
		}
		return JSON.parse(result);
	}

	set(guild, key, value) {
		let stringifiedValue = JSON.stringify(value);
		this.client.provider.set(guild, key, stringifiedValue);
	}
}
