import React from "react";
import PropTypes from "prop-types";

const MatchCard = ({ matchData }) => {
  const team1 = matchData.teamInfo[0];
  const team2 = matchData.teamInfo[1];
  const score1 = matchData.score[0];
  const score2 = matchData.score[1];

  return (
    <div className="shrink-0 self-stretch m-auto border-blue-900 border-solid border-[5px] h-[594px] rounded-[39px] w-[396px] max-md:mt-10">
      <div className="flex relative gap-0.5 mt-10 ml-6 max-md:mt-10 max-md:ml-2.5">
        <div className="flex flex-col text-white">
          <div className="flex gap-2.5">
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-2xl text-neutral-300 tracking-[2px]">
                {team1.shortname}
              </div>
              <div className="mt-6 text-3xl border border-white border-solid tracking-[2.53px]">
                {score1.r}/{score1.w}
              </div>
              <div className="mt-1.5 text-xl">{score1.o}/20</div>
            </div>
            <div className="flex flex-col items-center my-auto font-bold text-center">
              <div className="self-stretch text-xs">
                {matchData.name} ({matchData.venue})
              </div>
              <div className="mt-7 text-sm font-light">
                {/* You need to calculate the runs and balls needed */}
              </div>
              <div className="mt-3 text-xs">Target : {score2.r}</div>
            </div>
          </div>
          <div className="mt-10 text-lg tracking-widest border-0 border-white border-solid max-md:mt-10">
            {/* You need to fetch the player names */}
          </div>
        </div>
        <div className="flex flex-col self-start whitespace-nowrap text-neutral-300">
          <div className="self-center text-2xl tracking-[2px]">
            {team2.shortname}
          </div>
          <div className="mt-6 text-3xl text-white border border-white border-solid tracking-[2.53px]">
            {score2.r}/{score2.w}
          </div>
          <div className="mt-1.5 text-xl text-white">{score2.o}/20</div>
          <div className="mt-9 text-base tracking-widest text-right">
            {/* You need to fetch the player scores */}
          </div>
        </div>
      </div>
      <div className="flex relative flex-col px-12 pt-5 pb-7 mt-9 max-w-full text-white rounded-none border-t border-white border-solid w-[388px] max-md:px-5">
        <div className="self-center text-3xl border-0 border-white border-solid tracking-[2.26px]">
          Commentary
        </div>
        <div className="justify-center py-1.5 mt-6 text-lg bg-white">
          {/* You need to fetch the commentary */}
        </div>
      </div>
    </div>
  );
};
export default MatchCard;
