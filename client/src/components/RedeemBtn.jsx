import React, { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";

const RedeemBtn = ({ betId }) => {
    const [isRedeemable, setIsRedeemable] = useState(false);
    const { data } = useReadContract( {
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "canWithdrawTokens",
        args: [betId]
    });

    useEffect(() => {
        if (data) {
            setIsRedeemable(data[0]);
        }
    }, [data]);

    return (
        <button disabled={!isRedeemable} className="px-4 py-2 bg-blue-500 text-white disabled:opacity-50">
            Redeem
        </button>
    );
};

export default RedeemBtn;