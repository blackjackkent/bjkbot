function getRandomValue(max, min) {
	let actualMax = max + 1;
	return Math.floor(Math.random() * (actualMax - min) + min);
}

function getRandomItemsFromArray(arr, count) {
	var result = new Array(count),
		length = arr.length,
		taken = new Array(length);
	if (count > length)
		throw new RangeError("getRandomItemsFromArray: more elements taken than available");
	while (count--) {
		var x = Math.floor(Math.random() * length);
		result[count] = arr[x in taken ? taken[x] : x];
		taken[x] = --length;
	}
	return result;
}

module.exports = {
	getRandomValue: getRandomValue,
	getRandomItemsFromArray: getRandomItemsFromArray
}
