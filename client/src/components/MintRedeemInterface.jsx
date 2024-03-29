import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import { CONTRACT_ABI, CONTRACT_ADDRESS} from '../config.js';

function MintRedeemInterface() {
    const [isMinting, setIsMinting] = useState(true);
    const [CRC, setCRC] = useState(0)
    const [tCore, setTCore] = useState(0);
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

    const handleInputChange = (event) => {
        const value = event.target.value;
        if(isMinting){
            setCRC(value*1000);
        } else {
            setTCore(value/1000)
        }
    };

    const handleMint = async () => {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const ethAmount = web3.utils.toWei(CRC.toString(), 'ether'); 
        await contract.methods.mintCoins().send({ from: account, value: ethAmount });
    };

    const handleRedeem = async () => {
        const accounts = await window.ethereum.enable();
        const account = accounts[0];
        const tokenAmount = web3.utils.toWei(tCore.toString(), 'ether'); 
        await contract.methods.mintEthBack(tokenAmount).send({ from: account });
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
                            onChange={handleInputChange} 
                            placeholder='Enter the amount of tCORE to mint CRC'
                            className='p-2 border rounded mr-2 flex-grow text-black'
                        />
                        <button onClick={handleMint} className='p-2 bg-green-500 text-white rounded'>Mint Coins</button>
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
                            placeholder='Enter the amount of CRC to redeem for tCORE'
                            className='p-2 border rounded mr-2 flex-grow text-black'
                        />
                        <button onClick={handleRedeem} className='p-2 bg-blue-500 text-white rounded'>Redeem</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MintRedeemInterface;