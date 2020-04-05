#!/bin/sh

# Decrypt the file
mkdir $HOME/.aragon
# --batch to prevent interactive command --yes to assume "yes" for questions
gpg --batch --yes --decrypt --passphrase="$GPG_KEY" \
--output ./keys.json keys.json.gpg