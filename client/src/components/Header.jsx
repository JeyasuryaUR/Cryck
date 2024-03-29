import React from "react";

const Header = () => {
  return (
    <nav className="sticky bg-black w-full top-0 z-50 flex">
      <div className="m-4 text-white font-bold">Logo</div>
      <div className="ml-auto m-4 flex items-center">
        <button className="px-4 bg-white rounded-xl py-2 mx-4">
          Connect Wallet
        </button>
        <button className="px-4 text-white py-2">Connect Aadhaar</button>
      </div>
    </nav>
  );
};

export default Header;
