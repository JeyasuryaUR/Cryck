import React from "react";
import { background } from "../assets";

const Home = () => {
  return (
    <div className="flex relative flex-col justify-center items-center self-center px-16 py-20 mt-0 w-full text-white min-h-[608px] max-md:px-5 max-md:max-w-full bg-black">
      <img
        loading="lazy"
        src={background}
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-col items-center mt-6 mb-3.5 max-w-full w-[682px]">
        <div className="self-stretch text-8xl text-center tracking-[6.78px] max-md:max-w-full max-md:text-4xl">
          A prediction based cricket game
        </div>
        <div className="mt-16 text-4xl text-center underline  tracking-[2.9px] max-md:mt-10 max-md:max-w-full">
          Earn crypto rewards for correct predictions
        </div>
        <div className="justify-center p-6 mt-12 text-xl font-bold leading-6 border border-white border-solid rounded-[113.173px] max-md:px-5 max-md:mt-10">
          Start Playing
        </div>
      </div>
    </div>
  );
};

export default Home;
