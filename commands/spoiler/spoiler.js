const {
    Command
} = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class SpoilerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'spoiler',
			group: 'spoiler',
			memberName: 'spoiler',
			guildOnly: true,
			description: 'Gets or sets the topic of the spoiler channel',
			examples: ['spoiler', 'spoiler Mass Effect'],
			args: [{
				key: 'topic',
				prompt: 'What topic should we set the spoiler channel to?',
				type: 'string',
				default: ''
			}]
		});
	}
	run(message, args) {
		const {
			topic
		} = args;
		if (topic === '') {
			return this.printSpoilerTopic(message);
		}
		return this.setSpoilerTopic(message, topic);
	}

	printSpoilerTopic(message) {
		let topic = this.client.provider.get(message.guild, 'spoiler-topic');
		let sender = this.client.provider.get(message.guild, 'spoiler-author');
		if (!topic || !sender) {
			message.say(`There is no topic currently set in the spoiler channel. Type \`${config.prefix}spoiler {topic}\` to set it.`);
			return;
		}
		message.say(`The current spoiler channel topic is ${topic}, set by ${sender}!`);
	}

	setSpoilerTopic(message, topic) {
		let sender = message.author.toString();
		let generalChannel = message.guild.channels.find('name', config.spoiler.generalChannel);
		let spoilerChannel = message.guild.channels.find('name', config.spoiler.spoilerChannel);
		spoilerChannel.setTopic(`The current spoilerific topic is ${topic}!`);
		this.client.provider.set(message.guild, 'spoiler-topic', topic);
		this.client.provider.set(message.guild, 'spoiler-author', sender);
		message.say(`The spoiler channel topic has been successfully updated to ${topic} ${sender}!`);
		if (message.channel.name !== config.spoiler.spoilerChannel) {
			spoilerChannel.send(`Topic updated to ${topic} by ${sender}!`);
		}
	}
}
