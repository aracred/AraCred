#!/usr/bin/env node

const fs = require('fs');
const userName = require('os').userInfo().username;

const {INFURA_KEY, PRIVATE_KEY} = process.env;

/**
 * produces the contents of `mainnet_key.json`. This file is used by the
 * aragonCLI to sign transactions
 * @returns {string} stringfied content of `mainnet_key`
 */
const fileContent = () => {
  return JSON.stringify(
    {
      rpc: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      keys: [`${PRIVATE_KEY}`],
    },
    null,
    2,
  );
};

/**
 * Entry point to the script. Saves `mainnet_key` to disk.
 */
const saveFile = () => {
  try {
    const dir = `/home/${userName}/.aragon`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log('created `~/.aragon` file');
    }
    fs.writeFile(
      `/home/${userName}/.aragon/mainnet_key.json`,
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

saveFile();
module.export = {fileContent, saveFile};
