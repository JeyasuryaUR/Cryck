import React from "react";
import MatchCard from "../components/MatchCard";

const MatchBet = () => {
  return (
    <div className="bg-black">
      <div>
        <MatchCard />
      </div>
      <div className="flex w-full bg-gray-900">
        <div className="w-[50%] h-[500px]">
          <p className="text-center text-white">Your Bet</p>
        </div>
        <div className="w-[50%] h-[500px]">
          <p className="text-center text-white">Next Bet</p>
        </div>
      </div>
    </div>
  );
};

export default MatchBet;
