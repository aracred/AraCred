/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const fs = require('fs')
const BigNumber = require('bignumber.js')
const book = require('../addressbook.json')
const data = require('../scores.json')

const transaction = [
  {
    daoAddress: '0xA9D3447C6F727224BB30C5BE380750E03ada6d9B',
    tokenManagerAddress: '0xe00cb0155a8e6113620bbd45c25678cd679a4ebf',
    votingAddress: '0x3762ecf1595f4cf411ced7647971635d5ceb6aa1',
    environment: 'rinkeby',
    mints: [],
    burns: [],
  },
]

/**
 * This function says hello.
 * @param score Element of `scores.json`[1].users array
 * @param addressBook `addressbook.json`
 * @returns [address, latestCred] : false
 */
const getScore = (score, addressBook) => {
  const bookNames = addressBook.map(element => element.name)
  const scoreName = score.address[score.address.length - 1]

  return bookNames.includes(scoreName)
    ? [
        addressBook.filter(entry => entry.name === scoreName)[0].address,
        new BigNumber(score.intervalCred[score.intervalCred.length - 1])
          .toFixed(18)
          .toString()
          .replace('.', ''),
      ]
    : false
}

/**
 * This function says hello.
 * @param rawScore
 * @param addressBook `addressbook.json`
 * @param tx
 * @returns transation settings
 */
const mintSettings = (rawScore, addressBook, tx) => {
  const { users } = rawScore[1]

  const whitelistedGrain = users
    .filter(leaf => getScore(leaf, addressBook))
    .map(leaf => getScore(leaf, addressBook))

  const settings = tx
  settings[0].mints = whitelistedGrain

  return JSON.stringify(settings, null, 2)
}

/**
 * This function says hello.
 * @returns <Promise>
 */
const grain = () => {
  try {
    // console.log(book)

    if (book.length < 1) {
      console.log('this should never happen')
      throw new Error('`addressbook.json` is empty')
    }
    if (data.length < 1) {
      console.log('this should never happen')
      throw new Error('`scores.json` is empty')
    }

    // console.log(mintSettings(data, book, transaction))
    fs.writeFile(
      './transactionSettings.json',
      mintSettings(data, book, transaction),
      err => {
        if (err) {
          console.log(err)
        }
      },
    )
    return 'file sucessfully written'
  } catch (err) {
    console.error(err)
    process.exit(-1)
  }
}
console.log(grain())
/*
const r = async () => {
  console.log(await grain())
}

r()
export { getScore, mintSettings, grain, r }
*/
