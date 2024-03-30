import React from "react";
import { cryckLogo } from "../assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <nav className="sticky bg-black w-full top-0 z-50 flex items-center p-4">
      <div className="text-white font-bold flex items-center space-x-2">
        <img src={cryckLogo} alt="logo" className="h-16" />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-white">
          <span>1000</span>
          <img src={"./crc.png"} alt="CRC" className="h-6" />
        </div>
        <ConnectButton />
        <button className="px-4 text-white py-2 rounded bg-indigo-500 hover:bg-indigo-600">Connect Aadhaar</button>
      </div>
    </nav>
  );
};

export default Header;