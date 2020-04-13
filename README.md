![Run aragonCLI](https://github.com/aracred/AraCred/workflows/Run%20aragonCLI/badge.svg)
![Run SourceCred](https://github.com/aracred/AraCred/workflows/Run%20SourceCred/badge.svg)

# Aracred-actions

> **_WARNING:_** _DO NOT USE THS ON MAINNET_, yet

Automates the process of calculating Sourcecred Scores and creating a vote to
mint them as tokens in an Aragon DAO

## Setup

### 1. Fork this repo and clone repo

1. fork this repo
1. in your fork, add infura and ethereum private keys to your repo secrets set
   your infura key as `INFURA_KEY` set your ethereum private key as
   `PRIVATE_KEY`
1. in the github actions section of your fork, enable actions
1. clone repo localy

```sh
git clone https://github.com/<YOUR_GITHUB_USERNAME>/AraCred.git && cd AraCred
```

4. delete the `./docs` file

### 2. Setup Discord bot

1. burrrata's guide
2. in your repos secrets add your bots token as `SOURCECRED_DISCORD_TOKEN`

### 3. configure DAO

1. configure your DAO Addresses in `/config/dao.json`

```json
{
	"daoAddress": "YOUR_DAO_ADDRESS",
	"tokenManagerAddress": "YOUR_TOKEN_MANAGER_ADDRESS",
	"votingAddress": "YOUR_VOTING_ADDRESS"
}
```

2. in `./config/project.json` add the guild id of your discord server

3. in the same file replace the identities with users you want to track grain
   for
4. if you are tracking grain against github, replace the repos you want to track
   at the bottom

```json
"repoIds": [ { "name": "AraCred", "owner": "aracred" }, { "name": "website",
"owner": "aracred" }
```

### 4. Push your repo

- `git add .`
- `git commit -m "initial commit"`
- `git push`

## API
