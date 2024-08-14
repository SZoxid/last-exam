import React from "react";

export default function Navbar() {
  return (
    <div className="w-[70%] border border-green-600 flex justify-between items-center m-auto">
      <div>
        <h2>CRYPTOFOLIO</h2>
      </div>
      <div className="flex">
        <select name="" id="" className="w-[110px] h-[50px]">
          <option value="">USD</option>
          <option value="">Rub</option>
          <option value="">Dir</option>
        </select>
        <button>whatch list</button>
      </div>
    </div>
  );
}
