import React, { useEffect, useState } from 'react';
import { useReadContract, useWriteContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";

const RedeemBtn = ({ betId }) => {
    const {writeContract,error,status} = useWriteContract();

    const { data } = useReadContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "canWithdrawTokens",
        args: [betId]
    });

    const handleRedeem = async () =>{
        if(error){
            alert(error.cause.reason)
        }

        writeContract({ 
            abi:CONTRACT_ABI,
            address: CONTRACT_ADDRESS,
            functionName: 'resolveBet',
            args: [betId],
         });
    }

    useEffect(() => {
        if(status === "success"){
            alert('Redeem Successful');
        }
    }, [status]);

    return (
        <button disabled={!data} onClick={handleRedeem} className="px-4 py-2 bg-blue-500 text-white disabled:opacity-50">
            Redeem
        </button>
    );
};

export default RedeemBtn;