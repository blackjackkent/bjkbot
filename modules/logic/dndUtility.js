function getCheckResultMessage(result, abilityIdentifier, modifier, proficiencyBonus = null) {
	let reply = '';
	if (result.isCriticalSuccess) {
		reply += 'Critical Success! ';
	}
	if (result.isCriticalFailure) {
		reply += 'Critical Failure! :( ';
	}
	reply += `You rolled a natural ${result.naturalRoll}. `;
	reply += `With your ${abilityIdentifier} modifier of ${modifier}`;
	if (proficiencyBonus != null) {
		reply += ` and your proficiency bonus of ${proficiencyBonus}`;
	}
	reply += `, your total is ${result.total}!`;
	return reply;
}

function validateAbilityArgument(value) {
	const valid = ['strength', 'constitution', 'intelligence', 'wisdom', 'dexterity', 'charisma'];
	if (!valid.includes(value)) {
		return false;
	}
	return true;
}

function validateSkillArgument(value) {
	const valid = ['acrobatics', 'animalhandling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleightofhand', 'stealth', 'survival'];
	if (!valid.includes(value)) {
		return false;
	}
	return true;
}

function getAbilityForSkill(skillIdentifier) {
	const allSkills = getAvailableSkills();
	const skillObject = allSkills.find(s => s.key == skillIdentifier);
	return skillObject.abilityKey;
}

function getAvailableSkills() {
	return [
		{
			key: "acrobatics",
			abilityKey: "dexterity"
		},
		{
			key: "animalhandling",
			abilityKey: "wisdom"
		},
		{
			key: "arcana",
			abilityKey: "intelligence"
		},
		{
			key: "athletics",
			abilityKey: "strength"
		},
		{
			key: "deception",
			abilityKey: "charisma"
		},
		{
			key: "history",
			abilityKey: "intelligence"
		},
		{
			key: "insight",
			abilityKey: "wisdom"
		},
		{
			key: "intimidation",
			abilityKey: "charisma"
		},
		{
			key: "investigation",
			abilityKey: "intelligence"
		},
		{
			key: "medicine",
			abilityKey: "wisdom"
		},
		{
			key: "nature",
			abilityKey: "intelligence"
		},
		{
			key: "perception",
			abilityKey: "wisdom"
		},
		{
			key: "performance",
			abilityKey: "charisma"
		},
		{
			key: "persuasion",
			abilityKey: "charisma"
		},
		{
			key: "religion",
			abilityKey: "intelligence"
		},
		{
			key: "sleightofhand",
			abilityKey: "dexterity"
		},
		{
			key: "stealth",
			abilityKey: "dexterity"
		},
		{
			key: "survival",
			abilityKey: "wisdom"
		}
	]
}

module.exports = {
	getCheckResultMessage: getCheckResultMessage,
	validateAbilityArgument: validateAbilityArgument,
	validateSkillArgument: validateSkillArgument,
	getAbilityForSkill: getAbilityForSkill,
	getAvailableSkills: getAvailableSkills
}
