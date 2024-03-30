import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import RedeemBtn from "../components/RedeemBtn";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";

const YourBet = () => {
    const account = useAccount();

    const {data} = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getBetsByAddress',
        args: [account.address],
    });

    return (
        <div className="h-[500px]">
            <table className="min-w-full table-auto bg-black text-white">
                <thead className="justify-between">
                    <tr>
                        <th className="px-6 py-2">Over</th>
                        <th className="px-6 py-2">Ball Number</th>
                        <th className="px-6 py-2">Prediction</th>
                        <th className="px-6 py-2">Zone</th>
                        <th className="px-6 py-2">Bet Amount</th>
                        <th className="px-6 py-2">Redeem</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-700">
                    {data && data.map((bet, index) => (
                        <tr key={index} className="bg-gray-800 border-b border-gray-600">
                            <td className="px-6 py-2">{Number(bet.betOver)}</td>
                            <td className="px-6 py-2">{Number(bet.betBallNumber)}</td>
                            <td className="px-6 py-2">{Number(bet.betPrediction) == 10 ? 'W' : Number(bet.betPrediction)}</td>
                            <td className="px-6 py-2">{Number(bet.betZone)}</td>
                            <td className="px-6 py-2">{Number(bet.betAmount)}</td>
                            <td className="px-6 py-2">
                              <RedeemBtn betId={bet.betId} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
};

export default YourBet;