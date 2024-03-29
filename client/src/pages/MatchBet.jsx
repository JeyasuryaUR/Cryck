import React, { useState, useRef } from "react";
import MatchCard from "../components/MatchCard";

const MatchBet = () => {
  const [selectedTab, setSelectedTab] = useState("Your Bet");

  const predictions = ["4", "6", "W"];
  const zones = Array.from({length: 14}, (_, i) => (i + 1).toString());

  let id = 1;
  const predictionZoneMap = [];

  for (let prediction of predictions) {
    for (let zone of zones) {
      predictionZoneMap.push({
        id: id++,
        prediction,
        zone
      });
    }
  }
  //console.log(predictionZoneMap);

  const predictionRef = useRef();
  const zoneRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedPrediction = predictionRef.current.value;
    const selectedZone = zoneRef.current.value;

    const selectedOption = predictionZoneMap.find(option => option.prediction === selectedPrediction && option.zone === selectedZone);

    if (selectedOption) {
      
      //console.log(`The id for prediction ${selectedPrediction} and zone ${selectedZone} is ${selectedOption.id}`);
    } else {
      //console.log(`No option found for prediction ${selectedPrediction} and zone ${selectedZone}`);
    }
  };

  return (
    <div className="flex bg-black">
      <div className="w-[50%]">
        <MatchCard />
      </div>
      <div className="w-[50%] bg-black">
        <div className="flex w-full bg-gray-900">
          <div className="w-[50%]" onClick={() => setSelectedTab("Next Bet")}>
            <p className={`text-center text-white ${selectedTab === "Next Bet" ? "bg-gray-700" : ""}`}>Your Bet</p>
          </div>
          <div className="w-[50%]" onClick={() => setSelectedTab("Your Bet")}>
            <p className={`text-center text-white ${selectedTab === "Your Bet" ? "bg-gray-700" : ""}`}>Next Bet</p>
          </div>
        </div>
        {selectedTab === "Your Bet" && (
          <div className="h-[500px] bg-black text-white">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="ballNumber" className="block text-sm font-medium text-white">Ball Number</label>
                <select
                  id="ballNumber"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-white"
                >
                  <option value="">Select Ball Number</option>
                  <option value="1">Ball 1</option>
                  <option value="2">Ball 2</option>
                  <option value="3">Ball 3</option>
                  <option value="4">Ball 4</option>
                  <option value="5">Ball 5</option>
                  <option value="6">Ball 6</option>
                </select>
              </div>

              <div>
                <label htmlFor="prediction" className="block text-sm font-medium text-white">Prediction</label>
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
                <label htmlFor="zone" className="block text-sm font-medium text-white">Zone</label>
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
                </select>
              </div>

              <button type="submit" className="mt-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-indigo-400 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
              </button>
            </form>
          </div>
        )}
        {selectedTab === "Next Bet" && (
          <div className="h-[500px]">
            {/* Next Bet content goes here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchBet;