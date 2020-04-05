/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */

// TODO: Refactor
// Refactor into exportable functions for testing

const writeFile = require('fs')

const BigNumber = require('bignumber.js')

const data = require('../scores.json')
const book = require('../addressbook.json')

// WARNING: These settings are not saving correct
const transaction = {
  daoAddress: '0xA9D3447C6F727224BB30C5BE380750E03ada6d9B',
  tokenManagerAddress: '0xe00cb0155a8e6113620bbd45c25678cd679a4ebf',
  votingAddress: '0x3762ecf1595f4cf411ced7647971635d5ceb6aa1',
  environment: 'rinkeby',
  mints: [],
  burns: [],
}
/**
 * This function transforms SourceCredit Scores and an Aragon Addressbook
 * into a configuration file for the toolkit script
 * @returns The config json
 */

const grain = () => {
  const cred = []
  data[1].users
    .filter(element => element.address[1] === 'identity')
    .map(element => {
      const entry = book.filter(input => {
        if (element.address[2] === input.name) {
          return input.address
        }
        return false
      })
      cred.push([
        entry[0].address,
        new BigNumber(element.intervalCred[element.intervalCred.length - 1])
          .toFixed(18)
          .toString()
          .replace('.', ''),
      ])
      return true // Add error handling
    })

  console.log(cred)

  transaction.mints = cred
  const write = JSON.stringify(transaction, null, 2)

  writeFile('./transactionSettings.json', write, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      // console.log('Successfully wrote file')
    }
  })
  return write
}
