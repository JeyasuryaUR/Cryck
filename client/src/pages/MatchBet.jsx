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
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose an Option</option>
            <option value="4">Fours</option>
            <option value="6">Six</option>
            <option value="W">Caught Out</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MatchBet;
