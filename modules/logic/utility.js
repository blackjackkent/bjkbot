function getRandomValue(max, min) {
	let actualMax = max + 1;
	return Math.floor(Math.random() * (actualMax - min) + min);
}

module.exports = {
	getRandomValue: getRandomValue
}
