import React from "react";
import { cryckLogo } from "../assets";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CONTRACT_ABI, CONTRACT_ADDRESS} from '../config.js';
import { useReadContract,useAccount } from 'wagmi';

const Header = () => {
  const account = useAccount();

  const CRCBalance = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [account.address],
});

  const balance = CRCBalance.data ? Number(CRCBalance.data) : 0;

  return (
    <nav className="sticky bg-black w-full top-0 z-50 flex items-center p-4">
      <div className="text-white font-bold flex items-center space-x-2">
        <img src={cryckLogo} alt="logo" className="h-16" />
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <ConnectButton />
        <div className="flex items-center space-x-2 text-white">
          <span>{balance}</span>
          <img src={"./crc.png"} alt="CRC" className="h-6" />
        </div>
      </div>
    </nav>
  );
};

export default Header;