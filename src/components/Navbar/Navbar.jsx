import React from "react";

export default function Navbar() {
  return (
    <div className="bg-[#14161A]">
      <div className="max-w-7xl h-[65px] flex justify-between items-center m-auto bg-[#14161A]">
        <div>
          <h2 className="text-[20px] font-bold text-[#87CEEB]">CRYPTOFOLIO</h2>
        </div>
        <div className="flex gap-[15px]">
          <select
            name=""
            id=""
            className="w-[85px] h-[40px] text-[16px] font-normal text-white bg-[#14161A] border-none"
          >
            <option value="">USD</option>
            <option value="">Rub</option>
            <option value="">Dir</option>
          </select>
          <button className="w-[133px] h-[40px] bg-[#87CEEB] border-none rounded-[4px] text-[14px] font-medium uppercase">
            whatch list
          </button>
        </div>
      </div>
    </div>
  );
}
