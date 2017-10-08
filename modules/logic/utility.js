function getRandomValue(max, min) {
	return Math.random() * (max - min) + min;
}

module.exports = {
	getRandomValue: getRandomValue
}
