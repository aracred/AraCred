const fs = require('fs');
const book = require('../config/addressbook.json');
const data = require('../scores.json');

// *** NOT USING FOR TESTING***
const {daoAddress,tokenManagerAddress,votingAddress,environment,tokensToMint} = process.env

const {getUsers,whitelistedGrain,normalisedGrain,total} = require('./helpers')


// 1. get users from scores <-- done!
// 2. filter users with address book <-- done!
// 3. get total filtered cred in the interval <-- done!
// 4. normalise by total tokens
// 5. create evm script file
// 6. send transaction
const mintSettings = () => {
    const users = getUsers(data);
    const whitelist = whitelistedGrain(users, book);
    const totalCred = total(whitelist)
    const normalised = normalisedGrain(whitelist, totalCred, 100) // <-- ***HARD CODED*** for testing

    // create mint script settings ***HARD CODED*** for testing
    // rinkeby.aragon.org/#/azsxdc123
    const settings = [{}];
    settings[0].daoAddress = '0xc466e089CfC2935dF3f471AC291402e00d41C9D7';
    settings[0].tokenManagerAddress = '0x87a31b9a2ee0b7b7899192e94eec3334135d607e';
    settings[0].votingAddress = '0x29c58e25df47f1b958e1d707fb7b4a9800554d5c';
    settings[0].environment = 'rinkeby';
    settings[0].mints = normalised;
    settings[0].burns = [];
  
    // log the setings to console
    console.log(JSON.stringify(settings, null, 2));

    try {
        fs.writeFile(
          './log/transactionSettings.json',
          JSON.stringify(settings, null, 2),
          (err) => {
            if (err) {
              console.log('Did not save transaction settings');
              console.log(err);
            }
          },
        );
        return 'file sucessfully written';

      } catch (err) {
        console.error(err);
        process.exit(-1);
      }
}

mintSettings()




