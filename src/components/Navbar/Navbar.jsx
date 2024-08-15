import React from "react";
import { Link } from "react-router-dom";



export default function Navbar({ onCurrencyChange }) {
  return (
    <div className="bg-[#14161A]">
      <div className="w-[1280px] h-[65px] flex justify-between items-center m-auto bg-[#14161A]">
        <div className="p-[15px]">
          <h2 className="text-[20px] font-bold text-[#87CEEB]">
            <Link to="/">CRYPTOFOLIO</Link>
          </h2>
        </div>
        <div className="flex gap-[15px] p-[15px]">
          <select
            name="currency"
            id="currency"
            className="w-[85px] h-[40px] text-[16px] font-normal text-white bg-[#14161A] border-none"
            onChange={(e) => onCurrencyChange(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="rub">RUB</option>
            <option value="aed">AED</option>
            <option value="eur">EUR</option>
          </select>
          <button  className="w-[133px] h-[40px] bg-[#87CEEB] border-none rounded-[4px] text-[14px] font-medium uppercase">
            watch list
          </button>
        </div>
      </div>
    </div>
  );
}
