import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config';
import EventEmitter from 'events';
const dataEventEmitter = new EventEmitter();

const web3 = new Web3('https://rpc.test.btcs.network');
const myContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

async function betIdToAddress(betId) {
  try {
    const address = await myContract.methods.checkBetsForBet(betId).call();
    return address;
  } catch (error) {
    console.error('Error fetching addresses for bet ID:', error);
    return [];
  }
}

//TODO: configure sender address & private key
const SENDER_ADDRESS = "PUBLIC_KEY"
const PRIVATE_KEY = "PRIVATE_KEY"

async function uploadAnswerForBet(betId, optionId) {
  const nonce = await web3.eth.getTransactionCount(SENDER_ADDRESS, 'latest'); // get the latest nonce
  const encodedABI = myContract.methods.uploadAnswerForBet(betId, optionId).encodeABI();
  const gasPrice = await web3.eth.getGasPrice();
  const tx = {
        from: SENDER_ADDRESS,
        to: CONTRACT_ADDRESS,
        gas: 2000000,
        gasPrice,
        nonce: nonce,
        data: encodedABI,
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    // Send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Transaction receipt:', receipt);
}


const zones = Array.from({length: 14}, (_, i) => (i + 1));
const predictions = [4, 6, 10];

export let generatedBetId = 35;
export let generatedOver = 0;
export let generatedBall = 0;
let correctOptionId = Math.floor(Math.random() * 42) + 1;
let score = 0;
let wickets = 0;
let genResponse = [];
export const getGeneratedBetId = () => generatedBetId;

export const updateGeneratedValues = () => {
  generatedBetId++; 
  if(generatedBall ==5 ){
    generatedBall=-1;
    generatedOver++
  }
  generatedBall++;
  dataEventEmitter.emit('update', { generatedBetId, generatedBall, generatedOver });
}

function resetMatchData() {
  score = 0;
  wickets = 0;
  generatedOver = 0;
  generatedBall = 0;
}

function generateData() {
  const match = "MI vs CSK";
  const runs = Math.floor(Math.random() * 7);
  score += runs;
  if (runs === 0) wickets++;
  const target = `${Math.floor(Math.random() * 250) + score}/${Math.floor(Math.random() * 10) + wickets}`;
  generatedBall++;
  if (generatedBall > 6) {
    generatedOver++;
    generatedBall = 1;
  }
  if (generatedOver >= 20) { // Example condition to reset match data after 20 overs
    resetMatchData();
  }
  correctOptionId = Math.floor(Math.random() * 42) + 1;
  const zone = zones[Math.floor(Math.random() * zones.length)];
  const prediction = predictions[Math.floor(Math.random() * predictions.length)];

  const data = {
    betId: generatedBetId++,
    match,
    score: `${score}/${wickets}`,
    target,
    over: `${generatedOver}.${generatedBall}`,
    ball:generatedBall,
    correctOptionId,
    zone,
    prediction,
    commentary: ""
  };
  console.log(correctOptionId);

  genResponse.push(data);
  if (genResponse.length > 25) { // Limit genResponse size to last 100 entries
    genResponse.shift(); // Remove the oldest entry
  }
}

const uploadAnswerIfBet = async (betId,correctOptionId,)=>{
  console.log(`betId for check : ${betId}`);
  const addresses = await betIdToAddress(betId);
  console.log(addresses)
  if (Number(addresses) > 0) {
    await uploadAnswerForBet(betId, correctOptionId);
  }
  else{
    console.log('No bets this betId');
  }
}

generateData();

setInterval(async () => {
  console.log('New interval')
  await uploadAnswerIfBet(getGeneratedBetId(), correctOptionId);
  generateData();
}, 140000);

export const response = genResponse;
export { dataEventEmitter };