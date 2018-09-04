const _ = require('lodash');
const fs = require('fs');
const LineReader = require('line-by-line');
const request = require('request-promise');
const status = require('../libs/statusCodes');

function splitByWords(text) {
	// split string by spaces (including spaces, tabs, and newlines)
	return text.split(/\s+/);
}

function createWordMap(wordsArray, wordsMap) {
	const newWordMap = JSON.parse(JSON.stringify(wordsMap));
	wordsArray.forEach((key) => {
		if (_.has(newWordMap, key)) {
			newWordMap[key] += 1;
		} else {
			newWordMap[key] = 1;
		}
	});

	return newWordMap;
}

function sortByCount(wordsMap) {
	// sort by count in descending order
	let finalWordsArray = [];
	finalWordsArray = Object.keys(wordsMap).map((key) => {
		return {
			name: key,
			total: wordsMap[key],
		};
	});

	finalWordsArray.sort((a, b) => {
		return b.total - a.total;
	});

	return finalWordsArray;
}

class Frequency {
	async getFrequentWords(num) {
		try {
			await request.get('http://terriblytinytales.com/test.txt').pipe(fs.createWriteStream('test.txt'));
			const lineReader = new LineReader('test.txt');

			let wordsMap = {};

			lineReader.on('error', (err) => {
				console.log(err);
				throw err;
			});
			lineReader.on('line', (line) => {
				console.log('wordsMap => ', line);
				const wordsArray = splitByWords(line);
				wordsMap = createWordMap(wordsArray, wordsMap);
			});

			lineReader.on('end', () => {
				const finalWordsArray = sortByCount(wordsMap);
				return {
					result: _.slice(finalWordsArray, 0, parseInt(num, 10)),
					meta: status.API_SUCCESS,
				};
			});
		} catch (err) {
			throw err;
		}
	}
}

module.exports = Frequency;
