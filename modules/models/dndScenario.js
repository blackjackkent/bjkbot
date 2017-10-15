module.exports = class DndScenario {
	constructor(rawScenario) {
		this.description = rawScenario.description;
		this.difficultyClass = rawScenario.difficultyClass;
		this.ability = rawScenario.ability;
		this.successMessage = rawScenario.successMessage;
		this.failureMessage = rawScenario.failureMessage;
		this.critFailMessage = rawScenario.critFailMessage;
		this.critSuccessMessage = rawScenario.critSuccessMessage;
	}
}
