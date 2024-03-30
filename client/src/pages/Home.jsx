import React from "react";
import { Link } from "react-router-dom";
import { background } from "../assets";
import { oneStep, twoStep, threeStep } from "../assets";

const Home = () => {
  return (
    <div className="flex relative flex-col justify-center items-center self-center px-16 py-20 mt-0 w-full text-white min-h-[608px] max-md:px-5 max-md:max-w-full bg-black">
      <img
        loading="lazy"
        src={background}
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-col items-center mt-3 mb-3.5 max-w-full w-[682px]">
        <div className="self-stretch capitalize text-6xl text-center tracking-[6.78px] max-md:max-w-full max-md:text-4xl">
          A prediction based cricket game
        </div>
        <div className="mt-16 text-2xl text-center underline tracking-[2.9px] max-md:mt-10 max-md:max-w-full">
          Earn crypto rewards for correct predictions
        </div>
        <Link
          to="/match"
          className="justify-center px-6 py-4 text-center mt-12 text-xl font-bold leading-6 border tracking-wide border-white border-solid rounded-[113.173px] max-md:px-5 max-md:mt-10"
        >
          Start Playing
        </Link>
      </div>
      {/* About Section */}
      <div className="m-4">
        <p className="m-4 text-left text-3xl uppercase font-extrabold tracking-wide">
          About Us
        </p>
        <p className="m-2 capitalize text-lg">
          Cryck is a decentralized cricket betting platform where you can guess
          the game and win real rewards. Dive into the excitement of cricket
          betting with our unique NFTbased game prediction system based on
          events taking place on particular portions of a cricket stadium
        </p>
      </div>
      <div className="m-4 text-left">
        <div className="m-4 ml-0 text-left text-3xl uppercase font-extrabold tracking-wide">
          Steps To Play
        </div>
        <p className="m-2 text-left text-2xl font-mono">
          USING OUR PLATFORM TO PLACE PREDICTIONS
        </p>
        <p className="m-3 text-gray-400">IS AS EASY AS 1-2-3</p>
        <div className="m-4">
          <div className="flex m-4">
            <img src={oneStep} alt="one" className="mx-3" />
            <p className="text-2xl m-4">
              Guess the Game: Buy NFTs representing different parts of the
              cricket ground and predict the outcome of the next ball, boundary,
              or six.
            </p>
          </div>
          <div className="flex m-4">
            <img src={twoStep} alt="one" className="mx-3" />
            <p className="text-2xl m-4">
              Earn Rewards: Win cryptocurrency rewards for accurate predictions
              and participation in contests.
            </p>
          </div>
          <div className="flex m-4">
            <img src={threeStep} alt="one" className="mx-3" />
            <p className="text-2xl m-4">
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
