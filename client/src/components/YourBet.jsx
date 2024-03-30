import React, { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import RedeemBtn from "../components/RedeemBtn";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";

const YourBet = () => {

    const [bets, setBets] = useState([]);

    const fetchedData = [
        { over: 1, ball: 2, score: 3, zone: 'A', betAmount: 50 },
        { over: 2, ball: 3, score: 4, zone: 'B', betAmount: 100 },
        // More data...
      ];

    useEffect(() => {
        // Fetch the data here and update the state
        setBets(fetchedData);
    }, []);


    return (
        <div className="h-[500px]">
            <table className="min-w-full table-auto bg-black text-white">
                <thead className="justify-between">
                    <tr>
                        <th className="px-6 py-2">Over</th>
                        <th className="px-6 py-2">Ball Number</th>
                        <th className="px-6 py-2">Score</th>
                        <th className="px-6 py-2">Zone</th>
                        <th className="px-6 py-2">Bet Amount</th>
                        <th className="px-6 py-2">Redeem</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-700">
                    {bets.map((bet, index) => (
                        <tr key={index} className="bg-gray-800 border-b border-gray-600">
                            <td className="px-6 py-2">{bet.over}</td>
                            <td className="px-6 py-2">{bet.ball}</td>
                            <td className="px-6 py-2">{bet.score}</td>
                            <td className="px-6 py-2">{bet.zone}</td>
                            <td className="px-6 py-2">{bet.betAmount}</td>
                            <td className="px-6 py-2">
                              <RedeemBtn betId={"hbjfvj"} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
};

export default YourBet;