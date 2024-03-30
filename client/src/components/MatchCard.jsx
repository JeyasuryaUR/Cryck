import React from "react";

const MatchCard = () => {
  return (
    <div className="shrink-0 self-stretch m-auto border-blue-900 border-solid border-[5px] h-[594px] rounded-[39px] w-[396px] max-md:mt-10">
      <div className="flex relative gap-0.5 mt-10 ml-6 max-md:mt-10 max-md:ml-2.5">
        <div className="flex flex-col text-white">
          <div className="flex gap-2.5">
            <div className="flex flex-col whitespace-nowrap">
              <div className="self-center text-2xl text-neutral-300 tracking-[2px]">
                Mi
              </div>
              <div className="mt-6 text-3xl border border-white border-solid tracking-[2.53px]">
                132/4
              </div>
              <div className="mt-1.5 text-xl">9.4/20</div>
            </div>
            <div className="flex flex-col items-center my-auto font-bold text-center">
              <div className="self-stretch text-xs">
                Match 23 (Wankhede Stadium)
              </div>
              <div className="mt-7 text-sm font-light">
                Need 70 runs in 62 balls
              </div>
              <div className="mt-3 text-xs">Target : 202</div>
            </div>
          </div>
          <div className="mt-10 text-lg tracking-widest border-0 border-white border-solid max-md:mt-10">
            Hardik Pandya*
            <br />
            Rohit Sharma
          </div>
        </div>
        <div className="flex flex-col self-start whitespace-nowrap text-neutral-300">
          <div className="self-center text-2xl tracking-[2px]">gt</div>
          <div className="mt-6 text-3xl text-white border border-white border-solid tracking-[2.53px]">
            201/8
          </div>
          <div className="mt-1.5 text-xl text-white">20/20</div>
          <div className="mt-9 text-base tracking-widest text-right">
            (32/22)
            <br />
            (45/21)
          </div>
        </div>
      </div>
      <div className="flex relative flex-col px-12 pt-5 pb-7 mt-9 max-w-full text-white rounded-none border-t border-white border-solid w-[388px] max-md:px-5">
        <div className="self-center text-3xl border-0 border-white border-solid tracking-[2.26px]">
          Commentary
        </div>
        <div className="justify-center py-1.5 mt-6 text-lg bg-white">
          Allrounder Hardik Pandya's calling cards brisk seam bowling and
          powerful ball-striking marked by the ability to hit sixes from the
          first ball.
          <br />
          Hardik, who plays his domestic cricket for Baroda, first caught the
          eye with an unbeaten 31-ball 61 for Mumbai Indians{" "}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
