#!/bin/bash

git clone https://github.com/sourcecred/sourcecred.git
cd sourcecred
yarn install
yarn backend
node bin/sourcecred.js load $ORGANISATION
node bin/sourcecred.js scores $ORGANISATION > ../SCORES.json