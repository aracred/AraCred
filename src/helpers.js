const BigNumber = require('bignumber.js');

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
}

module.exports = {
    getUsers: scores => {
        return scores[1].users
    },
    whitelistedGrain: (users, addressBook) => {
        return users
            .filter((leaf) => getScore(leaf, addressBook))
            .map((leaf) => getScore(leaf, addressBook));
    },
    total: whitelisted => {
        return whitelisted
            .map((score) => score[1])
            .reduce((acc, val) => BigNumber(acc).plus(BigNumber(val)).toString());
    },
    normalisedGrain: (whitelist, total, tokensToMint) => {
        // TODO: Remove users with score of '0'
        return whitelist.map((user) => [
            user[0],
            BigNumber(user[1]).dividedBy(total).multipliedBy(tokensToMint).toFixed(18).toString().replace('.', ''),
        ])
    }
}