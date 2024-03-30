import React, { useEffect, useState } from "react";
import { response } from "../data";


const MatchCard = () => {
  console.log(response);
  const [commentary, setCommentary] = useState(response[0].commentary);
  const [score, setScore] = useState(response[0].score);
  const [ballsLeft, setBallsLeft] = useState(62);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = i + 1;
      setCommentary(response[i].commentary);
      setScore(response[i].score);
      setBallsLeft(ballsLeft - 1);
      const betId = response[i].betId;
      const optionId = response[i].correctOptionId;
      
      if (i === response.length - 1) {
        clearInterval(interval);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" m-auto border-blue-900 border-solid border-[5px] rounded-[39px] w-[420px] max-md:mt-10">
      <div className="bg-[#DC1313] flex m-4 mb-1 text-center text-white rounded-2xl w-20">
        <div className="rounded-full bg-white animate-pulse w-[8px] h-[8px] m-2"></div>
        <p className="font-Archivo font-bold uppercase">Live</p>
      </div>
      <div className="flex relative gap-0.5 mt-6 ml-6 max-md:mt-10 max-md:ml-2.5">
        <div className="flex flex-col text-white">
          <div className="flex gap-2.5">
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-2xl text-neutral-300 tracking-wide">
                MI
              </div>
              <div className="mt-6 text-3xl font-Grotesk font-semibold tracking-[2.53px]">
                {score}
              </div>
              <div className="mt-1.5 m-3 text-xl">9.4/20</div>
            </div>
            <div className="flex flex-col items-center my-auto font-bold text-center">
              <div className="self-stretch text-xs">
                Match 23 (Wankhede Stadium)
              </div>
              <div className="mt-7 text-sm font-light">
                Need{" "}
                {Number(response[0].team1.split("/")[0]) -
                  Number(score.split('/')[0])}{" "}
                runs in {ballsLeft} balls
              </div>
              <div className="m-3 text-xs">
                Target : {Number(response[0].team1.split("/")[0]) + 1}
              </div>
            </div>
          </div>
          <div className="mt-10 text-lg tracking-widest border-0 border-white border-solid max-md:mt-10">
            Hardik Pandya*
            <br />
            Rohit Sharma
          </div>
        </div>
        <div className="flex flex-col self-start whitespace-nowrap text-neutral-300">
          <div className="self-center text-2xl tracking-wide">GT</div>
          <div className="mt-6 text-3xl font-Grotesk font-semibold text-white border-solid tracking-[2.53px]">
            201/8
          </div>
          <div className="mt-1.5 m-3 text-xl text-white">20/20</div>
          <div className="mt-9 text-base tracking-widest text-right">
            (32/22)
            <br />
            (45/21)
          </div>
        </div>
      </div>
      <div className="flex relative flex-col px-12 pt-5 pb-7 mt-9 max-w-full text-white rounded-none border-t border-white border-solid w-[418px] max-md:px-5">
        <div className="self-center text-3xl underline-offset-2 tracking-[2.26px]">
          Commentary
        </div>
        <div className="justify-center py-1.5 mt-6 text-md bg-black">
          {commentary}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
