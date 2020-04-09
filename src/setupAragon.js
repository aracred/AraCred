#!/usr/bin/env node
const fs = require('fs');

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
		console.log(fileContent());
		fs.writeFile('./rinkeby_key.json', fileContent(), (err) => {
			if (err) {
				console.log('Error writing file', err);
			} else {
				console.log('Successfully setup keys');
			}
		});
	} catch (err) {
		console.error(err);
		process.exit(-1);
	}
};
saveFile();
module.export = {fileContent, saveFile};
