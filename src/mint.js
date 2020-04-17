const {encodeCallScript} = require('@aragon/test-helpers/evmScript');
const {encodeActCall} = require('@aragon/toolkit');

const {
  daoAddress,
  tokenManagerAddress,
  votingAddress,
  mints,
  burns,
  environment,
} = require('../log/transactionSettings.json')[0];

async function main() {
  // Encode a bunch of token mints and burns.
  const mintSignature = 'mint(address,uint256)';
  const burnSignature = 'burn(address,uint256)';
  const calldatum = await Promise.all([
    ...mints.map(([receiverAddress, amount]) =>
      encodeActCall(mintSignature, [receiverAddress, amount]),
    ),
    ...burns.map(([holderAddress, amount]) =>
      encodeActCall(burnSignature, [holderAddress, amount]),
    ),
  ]);

  const actions = calldatum.map((calldata) => ({
    to: tokenManagerAddress,
    calldata,
  }));

  // Encode all actions into a single EVM script.
  const script = encodeCallScript(actions);
  console.log(
    `npx dao exec ${daoAddress} ${votingAddress} newVote ${script} MintsAndBurns --environment aragon:${environment} `,
  );

  process.exit();
}

main();
