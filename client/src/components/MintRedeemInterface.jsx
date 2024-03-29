import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import { CONTRACT_ABI, CONTRACT_ADDRESS} from '../config.js';

function MintRedeemInterface() {
    const [isMinting, setIsMinting] = useState(true);
    const [CRC, setCRC] = useState(0)
    const [tCore, setTCore] = useState(0);
    const [mintInput, setMintInput] = useState(0);
    const [redeemInput, setRedeemInput] = useState(0);
    let web3 = new Web3(window.ethereum);

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const getTotalCRC = async () => {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const balance = await contract.methods.balanceOf(account).call();
        return balance;
    };
   
    useEffect(()=>{
        getTotalCRC().then(balance =>{
            setCRC(balance);
            setTCore(balance/1000);
        })
    },[]);

    const handleMint = async (CRCAmount) => {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        await contract.methods.mintCoins(CRCAmount).send({ from: account });
    };

    const handleRedeem = async (ethAmount) => {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        await contract.methods.convertCRCToEth(ethAmount).send({ from: account });
    };

    return (
        <div className='text-white p-4'>
            <div className='mb-4'>
                <label className='inline-flex items-center'>
                    <span className='ml-2'>Available CRC: {CRC} (= {tCore} tCOREs)</span>
                </label>
            </div>
            <div className='mb-4'>
                <label className='inline-flex items-center'>
                    <input type='radio' className='form-radio' checked={isMinting} onChange={() => setIsMinting(true)} />
                    <span className='ml-2'>Mint CRC</span>
                </label>
                {isMinting && (
                    <div className='flex items-center mt-2'>
                        <input 
                            type='number' 
                            placeholder='Enter the amount CRC to mint'
                            className='p-2 border rounded mr-2 flex-grow text-black'
                            onChange={e => setMintInput(e.target.value)}
                        />
                        <button onClick={() => handleMint(CRC)} className='p-2 bg-green-500 text-white rounded'>Mint Coins</button>
                    </div>
                )}
            </div>
            <div>
                <label className='inline-flex items-center'>
                    <input type='radio' className='form-radio' checked={!isMinting} onChange={() => setIsMinting(false)} />
                    <span className='ml-2'>Redeem tCore</span>
                </label>
                {!isMinting && (
                    <div className='flex items-center mt-2'>
                        <input 
                            type='number' 
                            placeholder='Enter the amount tCORE to redeem'
                            className='p-2 border rounded mr-2 flex-grow text-black'
                            onChange={e => setRedeemInput(e.target.value)}
                        />
                        <button onClick={() => handleRedeem(tCore)} className='p-2 bg-blue-500 text-white rounded'>Redeem</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MintRedeemInterface;