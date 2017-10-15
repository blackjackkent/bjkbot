function getCheckResultMessage(result, abilityIdentifier, modifier) {
	let reply = '';
	if (result.isCriticalSuccess) {
		reply += 'Critical Success! ';
	}
	if (result.isCriticalFailure) {
		reply += 'Critical Failure! :( ';
	}
	reply += `You rolled a natural ${result.naturalRoll}. `;
	reply += `With your ${abilityIdentifier} modifier of ${modifier}, your total is ${result.total}!`;
	return reply;
}

function validateAbilityArgument(value) {
	const valid = ['strength', 'constitution', 'intelligence', 'wisdom', 'dexterity', 'charisma'];
	if (!valid.includes(value)) {
		return false;
	}
	return true;
}

module.exports = {
	getCheckResultMessage: getCheckResultMessage,
	validateAbilityArgument: validateAbilityArgument
}
