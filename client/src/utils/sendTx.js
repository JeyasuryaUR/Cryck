import Web3 from 'web3';

import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config';
// Initialize Web3 instance with a provider
const web3 = new Web3('https://rpc.test.btcs.network');

// Create contract instance
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// Sender's account details
const senderAddress = '0x257c7d5EF6F1C5601Ad38E48A05976CB933aa4C1';
// const privateKey = process.env.REACT_APP_PRIVATE_KEY; 
const privateKey = '1ec52388c0bb45afc6a20f6a66b4f03d27216e1e048f62d7f6f7d5d22eb3074f'; 

export const callUploadAnswerForBet = async (_betId,optionId) => {
    const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest'); // get the latest nonce
    const encodedABI = contract.methods.uploadAnswerForBet(_betId, optionId).encodeABI();
    const gasPrice = await web3.eth.getGasPrice();

    const tx = {
        from: senderAddress,
        to: CONTRACT_ADDRESS,
        gas: 2000000, // Set gas limit
        gasPrice: gasPrice,
        nonce: nonce,
        data: encodedABI,
    };

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Transaction receipt:', receipt);
    console.log('Answered Uploaded for betId',_betId);
};
