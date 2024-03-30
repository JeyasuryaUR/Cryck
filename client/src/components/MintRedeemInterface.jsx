import React, { useEffect, useState } from 'react';
import Web3 from 'web3'
import { CONTRACT_ABI, CONTRACT_ADDRESS} from '../config.js';
import { useReadContract, useWriteContract,useAccount } from 'wagmi';

function MintRedeemInterface() {
    const account = useAccount();
    const [isMinting, setIsMinting] = useState(true);
    const [mintInput, setMintInput] = useState(0);
    const [redeemInput, setRedeemInput] = useState(0);

    const { writeContract,error,status } = useWriteContract();

    const CRCBalance = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'balanceOf',
        args: [account.address],
    });

    const handleMint = async (CRCAmount) => {
        if(error){
            alert(error.shortMessage)
        }

        writeContract({ 
            abi:CONTRACT_ABI,
            address: CONTRACT_ADDRESS,
            functionName: 'mintCoins',
            args: [CRCAmount],
            value: Web3.utils.toWei(CRCAmount/1000, 'ether'),
         })
    };

    
    const handleRedeem = async (ethAmount) => {
        if(error){
            alert(error.cause.reason)
        }

        writeContract({ 
            abi:CONTRACT_ABI,
            address: CONTRACT_ADDRESS,
            functionName: 'convertCRCToEth',
            args: [Web3.utils.toWei(ethAmount, 'ether')],
         })
    };

    return (
        <div className='text-white p-4 h-[650px]'>
            <div className='mb-4'>
                <label className='inline-flex items-center'>
                    <span className='ml-2'>Available CRC: {Number(CRCBalance.data)} </span>
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
                        <button onClick={() => handleMint(mintInput)} className='p-2 bg-green-500 text-white rounded'>Mint Coins</button>
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
                        <button onClick={() => handleRedeem(redeemInput)} className='p-2 bg-blue-500 text-white rounded'>Redeem</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MintRedeemInterface;