const {encodeCallScript} = require('@aragon/test-helpers/evmScript');
const {encodeActCall} = require('@aragon/toolkit');

const {
  daoAddress,
  votingAddress,
  financeAddress,
  payments,
  environment,
} = require('../log/transactionSettings.json')[0];

async function main() {
  // Encode a bunch of payments.
  const newImmediatePaymentSignature =
    'newImmediatePayment(address,address,uint256,string)';
  const calldatum = await Promise.all(
    payments.map(({tokenAddress, receiverAddress, amount, receipt}) =>
      encodeActCall(newImmediatePaymentSignature, [
        tokenAddress,
        receiverAddress,
        amount,
        receipt,
      ]),
    ),
  );

  const actions = calldatum.map((calldata) => ({
    to: financeAddress,
    calldata,
  }));

  // Encode all actions into a single EVM script.
  const script = encodeCallScript(actions);
  console.log(
    `npx dao exec ${daoAddress} ${votingAddress} newVote ${script} Payments --environment aragon:${environment} `,
  );

  process.exit();
}

main();
