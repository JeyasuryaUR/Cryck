import React from "react";
import { logo } from "../assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <nav className="sticky bg-black w-full top-0 z-50 flex">
      <div className="mx-4 text-white font-bold">
        <img src={logo} alt="logo" width={95} />
      </div>
      <div className="ml-auto m-4 flex items-center">
        <ConnectButton />
        <button className="px-4 text-white py-2">Connect Aadhaar</button>
      </div>
    </nav>
  );
};

export default Header;
