import React, { useState, useRef, useEffect } from "react";
import { background } from "../assets";
import MatchCard from "../components/MatchCard";
import MintRedeemInterface from "../components/MintRedeemInterface";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config";
import Web3 from "web3";
import { uploadDataWithKey } from "../utils/arweaveHelper";
import YourBet from "../components/YourBet";

const MatchBet = () => {
  const account = useAccount();
  const [selectedTab, setSelectedTab] = useState("Your Bet");
  const [betAmount, setBetAmount] = useState();
  const { writeContract, error, status } = useWriteContract();

  const totalBets = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "totalBets",
  });

  const predictions = ["4", "6", "W"];
  const zones = Array.from({ length: 14 }, (_, i) => (i + 1).toString());

  let optId = 1;
  const predictionZoneMap = [];

  for (let prediction of predictions) {
    for (let zone of zones) {
      predictionZoneMap.push({
        optId: optId++,
        prediction,
        zone,
      });
    }
  }

  const predictionRef = useRef();
  const zoneRef = useRef();
  const ballRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const betAmountInWei = Web3.utils.toBigInt(betAmount);
    const selectedPrediction = predictionRef.current.value;
    const selectedZone = zoneRef.current.value;
    const selectedBall = ballRef.current.value;
    const selectedOption = predictionZoneMap.find(
      (option) =>
        option.prediction === selectedPrediction && option.zone === selectedZone
    );
    const betId = Number(totalBets.data) - 6 + parseInt(selectedBall);

    const dataForArweave = {
      betId,
      betAmount,
      selectedZone,
      selectedBall,
      selectedOption,
      selectedPrediction,
      overNumber: totalBets / 6,
    };

    await uploadDataWithKey(account, dataForArweave);

    if (selectedOption) {
      if (error) {
        alert(error.cause.reason);
      }

      writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "bet",
        args: [betAmountInWei, betId, selectedOption.optId],
      });
    } else {
      console.log("Yoo");
    }
  };

  return (
    <div className="flex w-full h-full bg-black">
      <div className="w-[45%]">
        <MatchCard />
      </div>
      <div className="w-[55%] bg-black pr-3">
        <div className="flex w-full bg-gray-900 mb-5 rounded-md">
          <div
            className="w-[33%] rounded-md p-1"
            onClick={() => setSelectedTab("Next Bet")}
          >
            <p
              className={`text-center text-white ${
                selectedTab === "Next Bet" ? "bg-gray-700" : ""
              }`}
            >
              Next Bet
            </p>
          </div>
          <div
            className="w-[33%] rounded-md p-1"
            onClick={() => setSelectedTab("Your Bet")}
          >
            <p
              className={`text-center text-white ${
                selectedTab === "Your Bet" ? "bg-gray-700" : ""
              }`}
            >
              Your Bet
            </p>
          </div>
          <div
            className="w-[33%] rounded-md p-1"
            onClick={() => setSelectedTab("Mint CRC")}
          >
            <p
              className={`text-center text-white ${
                selectedTab === "Mint CRC" ? "bg-gray-700" : ""
              }`}
            >
              Mint Coins
            </p>
          </div>
        </div>
        {selectedTab === "Next Bet" && (
          <div className="h-full bg-black text-white">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="ballNumber"
                  className="block text-sm font-medium text-white"
                >
                  Ball Number
                </label>
                <select
                  id="ballNumber"
                  required
                  ref={ballRef}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
                >
                  <option value="">Select Ball Number</option>
                  <option value="0">Ball 1</option>
                  <option value="1">Ball 2</option>
                  <option value="2">Ball 3</option>
                  <option value="3">Ball 4</option>
                  <option value="4">Ball 5</option>
                  <option value="5">Ball 6</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="prediction"
                  className="block text-sm font-medium text-white"
                >
                  Prediction
                </label>
                <select
                  ref={predictionRef}
                  id="prediction"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
                >
                  <option value="">Select Prediction</option>
                  <option value="4">Four</option>
                  <option value="6">Six</option>
                  <option value="W">Wicket</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="zone"
                  className="block text-sm font-medium text-white"
                >
                  Zone
                </label>
                <select
                  ref={zoneRef}
                  id="zone"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
                >
                  <option value="">Select Zone</option>
                  <option value="1">Zone 1</option>
                  <option value="2">Zone 2</option>
                  <option value="3">Zone 3</option>
                  <option value="4">Zone 4</option>
                  <option value="5">Zone 5</option>
                  <option value="6">Zone 6</option>
                  <option value="7">Zone 7</option>
                  <option value="8">Zone 8</option>
                  <option value="9">Zone 9</option>
                  <option value="10">Zone 10</option>
                  <option value="11">Zone 11</option>
                  <option value="12">Zone 12</option>
                  <option value="13">Zone 13</option>
                  <option value="14">Zone 14</option>
                </select>

                <input
                  placeholder="Amount of CRC to bet"
                  type="number"
                  className="p-2 border rounded my-5 flex-grow bg-gray-700 border-gray-300 text-white outline-none w-full"
                  onChange={(e) => setBetAmount(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {selectedTab === "Your Bet" && <YourBet />}
        {selectedTab === "Mint CRC" && <MintRedeemInterface />}
      </div>
    </div>
  );
};

export default MatchBet;
