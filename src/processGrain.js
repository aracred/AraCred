/* eslint-disable consistent-return */
const fs = require('fs');
const BigNumber = require('bignumber.js');
const book = require('../config/addressbook.json');
const data = require('../scores.json');
const { 
  daoAddress,
  tokenManagerAddress,
  votingAddress,
  financeAddress,
  environment,
  tokensToMint,
  tokenAddress,
  mode
} = require('../config/config.json')


/**
 * processGrain helper function, Takes one user element from the `scores.json` file
 * and searches for the users name in the `addressbook.json` file. If it finds
 * it, the function returnns an array with the users address and the ammount
 * of cred they accumulated in the period
 * @param {Object} score Element of `scores.json`[1].users array
 * @param {Object} addressBook `addressbook.json`
 * @returns {array} [address, latestCred] : false
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

const getScoreAndName = (score, addressBook) => {
  const bookNames = addressBook.map((element) => element.name);
  const scoreName = score.address[score.address.length - 1];

  return bookNames.includes(scoreName)
    ? [
        addressBook.filter((entry) => entry.name === scoreName)[0].address,
        new BigNumber(score.intervalCred[score.intervalCred.length - 1])
          .toFixed(18)
          .toString()
          .replace('.', ''),
        scoreName
      ]
    : false;
};


/**
 * Main function in processGrain. It takes `scores.json`, `address.book`,
 * and a template for the transaction handler. It returns the completed
 * template required by the transaction handler.
 * @param {Object} rawScore, the `scores.json` file calculated by Sourcecred
 * @param {Object} addressbook, the `addressbook.json` file
 * @returns {Object} transation settings
 */
const mintSettings = (rawScore, addressBook) => {
  const {users} = rawScore[1];
  const whitelistedGrain = users
    .filter((leaf) => getScore(leaf, addressBook))
    .map((leaf) => getScore(leaf, addressBook));

  // ----------------------------------------------------------------
  const total = whitelistedGrain
    .map((score) => score[1])
    .reduce((acc, val) => BigNumber(acc).plus(BigNumber(val)).toString());

  const normalisedGrain = whitelistedGrain.map((user) => [
    user[0],
    BigNumber(user[1]).dividedBy(total).multipliedBy(tokensToMint).toString().replace(".", "")
  ]);
  console.log(normalisedGrain);
  // ----------------------------------------------------------------

  const settings = [{}];
  settings[0].daoAddress = daoAddress;
  settings[0].tokenManagerAddress = tokenManagerAddress;
  settings[0].votingAddress = votingAddress;
  settings[0].environment = environment;
  settings[0].mints = normalisedGrain;
  settings[0].burns = [];
  
  console.log(JSON.stringify(settings, null, 2))
  return JSON.stringify(settings, null, 2);
};

const transferSettings = (rawScore, addressBook) => {
  const {users} = rawScore[1];
  const whitelistedGrain = users
    .filter((leaf) => getScoreAndName(leaf, addressBook))
    .map((leaf) => getScoreAndName(leaf, addressBook));

  // ----------------------------------------------------------------
  const total = whitelistedGrain
    .map((score) => score[1])
    .reduce((acc, val) => BigNumber(acc).plus(BigNumber(val)).toString());

  //console.log(whitelistedGrain)
  const normalisedGrain = whitelistedGrain
    .filter(user => user[1] > 0)
    .map((user) => {
      return {
        "tokenAddress": tokenAddress,
        "receiverAddress": user[0],
        "amount": BigNumber(user[1]).dividedBy(total).multipliedBy(tokensToMint).toString().replace(".", ""),
        "receipt": user[2]
      }
  });
  // console.log(normalisedGrain);
  // ----------------------------------------------------------------

  const settings = [{}];
  settings[0].daoAddress = daoAddress;
  settings[0].votingAddress = votingAddress;
  settings[0].financeAddress = financeAddress;
  settings[0].environment = environment;
  settings[0].payments = normalisedGrain;

  console.log(JSON.stringify(settings, null, 2))
  return JSON.stringify(settings, null, 2);
};

/**
 * Entry point to the `processGrain.js` script
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

    mode === 'mint' 
    ? fs.writeFile(
      './log/transactionSettings.json',
      mintSettings(data, book),
      (err) => {
        if (err) {
          console.log('Did not save transaction settings');
          console.log(err);
        }
      },
    )
    : fs.writeFile(
      './log/transactionSettings.json',
      transferSettings(data, book),
      (err) => {
        if (err) {
          console.log('Did not save transaction settings');
          console.log(err);
        }
      },
    )

    return 'file sucessfully written';
  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
};

console.log(grain());
