#!/usr/bin/env node

/*
 * Takes two commandline arguments
 * [0]: INFURA_KEY
 * [1]: PRIVATE_KEY
 */
const fs = require('fs');

const {TEST} = process.env;

const args = process.argv.slice(2);
const userName = require('os').userInfo().username;

const fileContent = () => {
	return JSON.stringify(
		{
			rpc: `https://rinkeby.infura.io/v3/${args[0]}`,
			keys: [`${args[1]}`],
		},
		null,
		2,
	);
};

const saveFile = () => {
	try {
		const dir = `/home/${userName}/.aragon`;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
			console.log('created `~/.aragon` file');
		}
		fs.writeFile(
			`/home/${userName}/.aragon/rinkeby_key.json`,
			fileContent(),
			(err) => {
				if (err) {
					console.log('Error writing file', err);
				} else {
					console.log('Successfully setup keys');
				}
			},
		);
	} catch (err) {
		console.error(err);
		process.exit(-1);
	}
};
console.log(TEST);
saveFile();
module.export = {fileContent, saveFile};
