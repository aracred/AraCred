![Run aragonCLI](https://github.com/aracred/AraCred/workflows/Run%20aragonCLI/badge.svg)
![Run SourceCred](https://github.com/aracred/AraCred/workflows/Run%20SourceCred/badge.svg)

# Aracred

> **_WARNING:_** _DO NOT USE THS ON MAINNET_, yet

Automates the process of calculating Sourcecred Scores and creating a vote to
mint them as tokens in an Aragon DAO

## Setup

### 1. clone repo

```sh
git clone https://github.com/aracred/AraCred.git && cd aracred
```

### 2. configure DAO

configure your DAO Addresses in `/config/dao.json`

```js
{
  daoAddress: 'YOUR_DAO_ADDRESS',
  tokenManagerAddress: 'YOUR_TOKEN_MANAGER_ADDRESS',
  votingAddress: 'YOUR_VOTING_ADDRESS',
}
```

### 3. set up your new repo

1. create the repo for your new project
2. add infura and ethereum private keys to your repo secrets set your infura key
   as `INFURA_KEY` set your ethereum private key as `PRIVATE_KEY`
3. remove the current `.git` file and create a new one `rm -rf .git && git init`
4. push to your new repo
   `git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git && git push -u origin master`

## API
