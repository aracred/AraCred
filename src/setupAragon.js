#!/usr/bin/env node
/* eslint-disable global-require */
// TODO: Refactor setupAragon
// Refactor to the file exports the function for testing

// TODO: Create unit tests for# setupAragon()
// crete unit test for the functiom
const fs = require('fs')
const secrets = require('../keys.json') // ?+

const keySettings = JSON.stringify(
  {
    rpc: `https://rinkeby.infura.io/v3/${secrets.INFURA_KEY}`, // ?+
    keys: [`${secrets.PRIVATE_KEY}`], // ?+
  },
  null,
  2,
)

try {
  const dir = `/home/${require('os').userInfo().username}/.aragon`
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    console.log('created `~/.aragon` file')
  }
  fs.writeFile(
    `/home/${require('os').userInfo().username}/.aragon/rinkeby_key.json`,
    keySettings,
    err => {
      if (err) {
        console.log('Error writing file', err)
      } else {
        console.log('Successfully setup keys')
      }
    },
  )
} catch (err) {
  console.error(err)
  process.exit(-1)
}
