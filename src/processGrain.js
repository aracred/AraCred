/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const BigNumber = require('bignumber.js');
const book = require('../config/addressbook.json');
const data = require('../scores.json');
const transaction = require('../config/dao.json');

/**
 * This function says hello.
 * @param score Element of `scores.json`[1].users array
 * @param addressBook `addressbook.json`
 * @returns [address, latestCred] : false
 */
const getScore = (score, addressBook) => {
	const bookNames = addressBook.map((element) => element.name);
	const scoreName = score.address[score.address.length - 1];

	return bookNames.includes(scoreName)
		? [
				addressBook.filter((entry) => entry.name === scoreName)[0].address,
				new BigNumber(score.intervalCred[score.intervalCred.length - 1])
					.toFixed(18)
					.toString()
					.replace('.', ''),
		  ]
		: false;
};

/**
 * This function says hello.
 * @param rawScore
 * @param addressBook `addressbook.json`
 * @param tx
 * @returns transation settings
 */
const mintSettings = (rawScore, addressBook, tx) => {
	const {users} = rawScore[1];

	const whitelistedGrain = users
		.filter((leaf) => getScore(leaf, addressBook))
		.map((leaf) => getScore(leaf, addressBook));

	const settings = tx;
	settings[0].mints = whitelistedGrain; // <-- maybe broken

	return JSON.stringify(settings, null, 2);
};

/**
 * This function says hello.
 * @returns <Promise>
 */
const grain = () => {
	try {
		// console.log(book)

		if (book.length < 1) {
			console.log('this should never happen');
			throw new Error('`addressbook.json` is empty');
		}
		if (data.length < 1) {
			console.log('this should never happen');
			throw new Error('`scores.json` is empty');
		}

		fs.writeFile(
			'./log/transactionSettings.json',
			mintSettings(data, book, transaction),
			(err) => {
				if (err) {
					console.log(err);
				}
			},
		);
		return 'file sucessfully written';
	} catch (err) {
		console.error(err);
		process.exit(-1);
	}
};

console.log(mintSettings(data, book, transaction));
console.log(grain());
