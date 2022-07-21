import { ethers, Wallet } from 'ethers';
import { readFile } from 'fs/promises';
import 'dotenv/config';
const validatorAbi = JSON.parse(
  await readFile(
    new URL('./files/abi_validator.json', import.meta.url)
  )
);
const proposalAbi = JSON.parse(
  await readFile(
    new URL('./files/abi_proposal.json', import.meta.url)
  )
);

async function main() {
  const MAX_GAS_LIMIT = 2000000000;
  const options = {
    // gasPrice,
    gasLimit: MAX_GAS_LIMIT,
    nonce: 45,
  };

  const _provider = ethers.providers.getDefaultProvider(
    process.env.RPC_URL,
    options,
  );

  let user_wallet       = new Wallet(process.env.USER1_KEY);
  let validator1_wallet = new Wallet(process.env.VALIDATOR1_KEY);
  let validator2_wallet = new Wallet(process.env.VALIDATOR2_KEY);
  let validator3_wallet = new Wallet(process.env.VALIDATOR3_KEY);
  let validator4_wallet = new Wallet(process.env.VALIDATOR4_KEY);

  let new_validator_wallet = new Wallet(process.env.NEW_VALIDATOR);

  const user = user_wallet.connect(_provider);
  const validator1 = validator1_wallet.connect(_provider);
  const validator2 = validator2_wallet.connect(_provider);
  const validator3 = validator3_wallet.connect(_provider);
  const validator4 = validator4_wallet.connect(_provider);
  const new_validator = new_validator_wallet.connect(_provider);

  let validator_addr = process.env.VALIDATOR_ADDRESS;
  let proposal_addr = process.env.PROPOSAL_ADDRESS;
  const validator_contract = new ethers.Contract(validator_addr, validatorAbi, _provider);
  const proposal_contract = new ethers.Contract(proposal_addr, proposalAbi, _provider);

// 1. createProposal

/* 
  let createProposal = await proposal_contract.connect(new_validator).createProposal(new_validator.address, "I wanna become a validator");
  await createProposal.wait();
  console.log('createProposal', createProposal);
*/



// 2.vote

/*
  const id = "0x5ae5707b7760c4c608d6132dd6cc8e0af9b9bbce3f4d93420c60f15e89cfecbe"; //get from txn detail (log index 1)
 
  let voteProposal = await proposal_contract.connect(validator1).voteProposal(id, true);
  await voteProposal.wait();
  console.log('voteProposal Val 1', voteProposal);

  voteProposal = await proposal_contract.connect(validator2).voteProposal(id, true);
  await voteProposal.wait();
  console.log('voteProposal Val 2', voteProposal);

  voteProposal = await proposal_contract.connect(validator3).voteProposal(id, true);
  await voteProposal.wait();
  console.log('voteProposal Val 3', voteProposal);

  voteProposal = await proposal_contract.connect(validator4).voteProposal(id, true);
  await voteProposal.wait();
  console.log('voteProposal Val 4', voteProposal);
*/

/*
  let result = await validator_contract.connect(new_validator).createOrEditValidator(new_validator.address,  "Validator 007", "007", "https://spectre-bc.io", "validator007@spectre-bc.io","Validator 007");
  console.log('createOrEditValidator', result);
  await result.wait();
  console.log('createOrEditValidator', result.hash);
*/

/*
  let result = await validator_contract.connect(user).stake(new_validator.address, {
    value: '55000000000000000000' // 55
   });
  await result.wait();
  console.log('stake', result);
*/
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
