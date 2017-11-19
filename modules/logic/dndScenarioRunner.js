const config = require('../../config.json');
const DnDRepository = require('../../modules/data/dndRepository');
const RollAbilityCheckCommand = require('../../commands/dnd/rollAbilityCheck');
const DndScenarioParticipant = require('../models/dndScenarioParticipant');
const { getRandomValue } = require('./utility');

module.exports = class DndScenarioRunner {
	constructor(client, guild) {
		this.discordJsClient = client;
		this.discordGuild = guild;
		this.gamingChannel = this.discordGuild.channels.find('name', config.dnd.gamingChannel);
		this.dndRepository = new DnDRepository(client);
		this.scenarioTimeout = null;
		this.participationTimeout = null;
		this.currentScenario = null;
		this.participants = [];
		this.handleParticipationMessage = this.handleParticipationMessage.bind(this);
		this.runRandomScenario = this.runRandomScenario.bind(this);
		this.clearListener = this.clearListener.bind(this);
	}

	run() {
		this.seedDatabase();
		this.setRandomTimerInterval();
	}

	setRandomTimerInterval() {
		var min = config.dnd.scenarioMinInterval;
		var max = config.dnd.scenarioMaxInterval;
		var random = getRandomValue(max, min);
		var milliseconds = Math.floor(random * 60000);
		console.log(`setting random timer interval of ${milliseconds} milliseconds`);
		this.scenarioTimeout = setTimeout(this.runRandomScenario, milliseconds);
	}

	runRandomScenario() {
		if (!this.gamingChannel) {
			return;
		}
		this.currentScenario = this.dndRepository.getRandomScenario(this.discordGuild);
		this.gamingChannel.send(`Time for an adventure!`);
		this.gamingChannel.send(this.currentScenario.description);
		this.gamingChannel.send(`Type ${config.prefix}join to participate!`)
		this.listeningForParticipation = true;
		this.participants = [];
		this.participationTimeout = setTimeout(this.clearListener, 30000);
		this.discordJsClient.on('message', this.handleParticipationMessage);
	}

	handleParticipationMessage(message) {
		if (message.guild.id != this.discordGuild.id || message.channel.name !== config.dnd.gamingChannel) {
			return;
		}
		if (message.content !== config.prefix + 'join') {
			return;
		}
		let user = message.author;
		let rollAbilityCheck = new RollAbilityCheckCommand(this.discordJsClient);
		let result = rollAbilityCheck.runAsModule(message, { abilityIdentifier: this.currentScenario.ability });
		if (!result) {
			return;
		}
		this.participants.push(new DndScenarioParticipant(user, result));
	}

	clearListener() {
		this.discordJsClient.removeListener('message', this.handleParticipationMessage);
		this.gamingChannel.send('Scenario closed!');
		if (!this.participants || this.participants.length == 0) {
			this.printNoParticipants();
			this.currentScenario = null;
			this.setRandomTimerInterval();
			return;
		}
		this.printCritSuccess();
		this.printSuccess();
		this.printFailure();
		this.printCritFailure();
		this.currentScenario = null;
		this.setRandomTimerInterval();
	}

	printNoParticipants() {
		this.gamingChannel.send(`No one joined the adventure! Resetting...`);
	}

	printResult(participants, resultMessage) {
		let users = participants.map(function (participant) { return participant.user; });
		let message = users.join(', ');
		message += ": " + resultMessage;
		this.gamingChannel.send(message);
	}

	printCritSuccess() {
		let critSuccess = this.participants.filter((participant) => participant.diceRollResult.isCriticalSuccess);
		if (!critSuccess.length) {
			return;
		}
		this.printResult(critSuccess, this.currentScenario.critSuccessMessage);
	}

	printCritFailure() {
		let critFailure = this.participants.filter((participant) => participant.diceRollResult.isCriticalFailure);
		if (!critFailure.length) {
			return;
		}
		this.printResult(critFailure, this.currentScenario.critFailMessage);
	}

	printSuccess() {
		let success = this.participants.filter((participant) =>
			participant.diceRollResult.total >= this.currentScenario.difficultyClass
			&& !participant.diceRollResult.isCriticalSuccess);
		if (!success.length) {
			return;
		}
		console.log('test');
		this.printResult(success, this.currentScenario.successMessage);
	}

	printFailure() {
		let failure = this.participants.filter((participant) =>
			participant.diceRollResult.total < this.currentScenario.difficultyClass
			&& !participant.diceRollResult.isCriticalFailure);
		if (!failure.length) {
			return;
		}
		this.printResult(failure, this.currentScenario.failureMessage);
	}

	seedDatabase() {
		let allScenarios = this.dndRepository.getAllScenarios(this.discordGuild);
		if (!allScenarios) {
			this.dndRepository.setAllScenarios(this.discordGuild, this.getDefaultScenarios());
		}
	}

	getDefaultScenarios() {
		return [
			{
				'description': 'A roving band of orcs attacks your party out of the forest. Roll a dexterity check to dodge their arrows.',
				'difficultyClass': 12,
				'ability': 'dexterity',
				'successMessage': 'You successfully dodge aside, pulling your weapons to enter the fray.',
				'failureMessage': 'You attempt to dodge, but are too slow, and immediately become a pincushion for several orc arrows.',
				'critFailMessage': 'You take an arrow in the throat and are pinned to a nearby tree in dramatic fashion.',
				'critSuccessMessage': 'You do a dramatic forward roll and dodge out of the way of the arrows, coming back to your feet safe and unharmed.',
			}
		]
	};
}
