const {
	STRENGTH,
	STRENGTH_ABBREVIATION,
	DEXTERITY,
	DEXTERITY_ABBREVIATION,
	CONSTITUTION,
	CONSTITUTION_ABBREVIATION,
	INTELLIGENCE,
	INTELLIGENCE_ABBREVIATION,
	WISDOM,
	WISDOM_ABBREVIATION,
	CHARISMA,
	CHARISMA_ABBREVIATION
} = require('../constants/dndConstants');
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
	const valid = [
		STRENGTH,
		STRENGTH_ABBREVIATION,
		CONSTITUTION,
		CONSTITUTION_ABBREVIATION,
		INTELLIGENCE,
		INTELLIGENCE_ABBREVIATION,
		WISDOM,
		WISDOM_ABBREVIATION,
		DEXTERITY,
		DEXTERITY_ABBREVIATION,
		CHARISMA,
		CHARISMA_ABBREVIATION
	];
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

function getCleanAbilityName(abilityIdentifier) {
	if (abilityIdentifier.substring(0, 3) === STRENGTH_ABBREVIATION) {
		return STRENGTH;
	}
	if (abilityIdentifier.substring(0, 3) === CONSTITUTION_ABBREVIATION) {
		return CONSTITUTION;
	}
	if (abilityIdentifier.substring(0, 3) === DEXTERITY_ABBREVIATION) {
		return DEXTERITY;
	}
	if (abilityIdentifier.substring(0, 3) === WISDOM_ABBREVIATION) {
		return WISDOM;
	}
	if (abilityIdentifier.substring(0, 3) === CHARISMA_ABBREVIATION) {
		return CHARISMA;
	}
	if (abilityIdentifier.substring(0, 3) === INTELLIGENCE_ABBREVIATION) {
		return INTELLIGENCE;
	}
	return null;
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
			abilityKey: DEXTERITY
		},
		{
			key: "animalhandling",
			abilityKey: WISDOM
		},
		{
			key: "arcana",
			abilityKey: INTELLIGENCE
		},
		{
			key: "athletics",
			abilityKey: STRENGTH
		},
		{
			key: "deception",
			abilityKey: CHARISMA
		},
		{
			key: "history",
			abilityKey: INTELLIGENCE
		},
		{
			key: "insight",
			abilityKey: WISDOM
		},
		{
			key: "intimidation",
			abilityKey: CHARISMA
		},
		{
			key: "investigation",
			abilityKey: INTELLIGENCE
		},
		{
			key: "medicine",
			abilityKey: WISDOM
		},
		{
			key: "nature",
			abilityKey: INTELLIGENCE
		},
		{
			key: "perception",
			abilityKey: WISDOM
		},
		{
			key: "performance",
			abilityKey: CHARISMA
		},
		{
			key: "persuasion",
			abilityKey: CHARISMA
		},
		{
			key: "religion",
			abilityKey: INTELLIGENCE
		},
		{
			key: "sleightofhand",
			abilityKey: DEXTERITY
		},
		{
			key: "stealth",
			abilityKey: DEXTERITY
		},
		{
			key: "survival",
			abilityKey: WISDOM
		}
	]
}

module.exports = {
	getCheckResultMessage: getCheckResultMessage,
	validateAbilityArgument: validateAbilityArgument,
	validateSkillArgument: validateSkillArgument,
	getAbilityForSkill: getAbilityForSkill,
	getAvailableSkills: getAvailableSkills,
	getCleanAbilityName: getCleanAbilityName
}
