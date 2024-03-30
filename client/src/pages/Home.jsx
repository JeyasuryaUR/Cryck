import React from "react";
import { Link } from "react-router-dom";
import { background } from "../assets";
import { oneStep, twoStep, threeStep } from "../assets";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center px-16 py-20 mt-0 w-full text-white min-h-screen bg-black bg-cover" >
      <div className="w-full flex items-center justify-center" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex flex-col items-center mt-3 mb-3.5 max-w-2xl">
        <h1 className="text-6xl text-center tracking-wide font-bold mb-8">A prediction based cricket game</h1>
        <p className="mt-16 text-2xl text-center underline tracking-wide mb-8">Earn crypto rewards for correct predictions</p>
        <Link to="/match" className="px-6 py-4 text-center mt-12 text-xl font-bold leading-6 border tracking-wide border-white rounded-full">
          Start Playing
        </Link>
      </div>
      </div>
      {/* About Section */}
      <div className="bg-gray-600 border-[0.01px] border-gray-600 backdrop-filter backdrop-blur-sm bg-opacity-20 text-white p-8 rounded-3xl shadow-lg max-w-2xl mt-16">
        <h2 className="text-3xl uppercase font-bold tracking-wide mb-4">About Us</h2>
        <p className="text-lg">
          Cryck is a decentralized cricket betting platform where you can guess
          the game and win real rewards. Dive into the excitement of cricket
          betting with our unique NFTbased game prediction system based on
          events taking place on particular portions of a cricket stadium
        </p>
      </div>
      <div className="text-white max-w-2xl mt-16">
        <h2 className="text-3xl uppercase font-bold tracking-wide mb-4">Steps To Play</h2>
        <p className="text-2xl font-mono mb-2">USING OUR PLATFORM TO PLACE PREDICTIONS</p>
        <p className="text-gray-400 mb-8">IS AS EASY AS 1-2-3</p>
        <div className="grid grid-cols-1 gap-8">
          <div className="flex items-center">
            <img src={oneStep} alt="one" className="w-16 h-16 mr-8" />
            <p className="text-2xl">
              Guess the Game: Buy NFTs representing different parts of the
              cricket ground and predict the outcome of the next ball, boundary,
              or six.
            </p>
          </div>
          <div className="flex items-center">
            <img src={twoStep} alt="two" className="w-16 h-16 mr-8" />
            <p className="text-2xl">
              Earn Rewards: Win cryptocurrency rewards for accurate predictions
              and participation in contests.
            </p>
          </div>
          <div className="flex items-center">
            <img src={threeStep} alt="three" className="w-16 h-16 mr-8" />
            <p className="text-2xl">
              Fair and Transparent: Enjoy transparency and fairness ensured by
              blockchain technology, providing a level playing field for all
              participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;