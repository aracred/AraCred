#!/usr/bin/env node

const fs = require('fs');
const userName = require('os').userInfo().username;

const {INFURA_KEY, PRIVATE_KEY} = process.env;
const fileContent = () => {
	return JSON.stringify(
		{
			rpc: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
			keys: [`${PRIVATE_KEY}`],
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
					console.log('Successfully setup signer');
				}
			},
		);
	} catch (err) {
		console.error(err);
		process.exit(-1);
	}
};

saveFile();
module.export = {fileContent, saveFile};
