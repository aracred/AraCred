const book = require('../config/addressbook.json');
const data = require('../scores.json');

const {
  getUsers,
  whitelistedGrain,
  normalisedGrain,
  total,
} = require('./helpers');

const users = getUsers(data);
const whitelist = whitelistedGrain(users, book);
const totalCred = total(whitelist);
const normalised = normalisedGrain(whitelist, totalCred, 100); // <-- ***HARD CODED*** for testing

console.log(normalised);
