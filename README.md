![Node.js CI](https://github.com/pythonpete32/aracred-actions/workflows/Node.js%20CI/badge.svg)

# Aracred-actions

> **_ WARNING: _** _DO NOT USE THS ON MAINNET_

Automates the process of calculating Sourcecred Scores and creating a vote to mint them as tokens in an Aragon DAO

## Setup

### 1. clone repo

```
git clone https://github.com/pythonpete32/aracred-actions.git && cd aracred-actions
```

### 2. Set Encrypt Aracred Keys

1. Setup Aracred with an Infura and Ethereum private key
   create a json file in the root of the project called `keys.json` and paste the in the following

```json
{
  "PRIVATE_KEY": "",
  "INFURA_KEY": ""
}
```

2. Encrypt the keys file
   use a srong password, this file will be on github!

```
gpg --symmetric --cipher-algo AES256 keys.json
```

### 3. Edit DAO Addresses

The Addresses are hard coded in `/src/processScores.js` line 15

```js
  daoAddress: '0xA9D3447C6F727224BB30C5BE380750E03ada6d9B',
  tokenManagerAddress: '0xe00cb0155a8e6113620bbd45c25678cd679a4ebf',
  votingAddress: '0x3762ecf1595f4cf411ced7647971635d5ceb6aa1',
```

### 4. Git

remove the current `.git` file and create a new one
`rm -rf .git && git init`

then push to a new repo. :)

## API
