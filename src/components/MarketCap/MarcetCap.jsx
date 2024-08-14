import React, { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";

export default function MarketCap({ currency }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currency]);

  return (
    <div className="border border-red-600 bg-[#14161A]">
      <div className="max-w-7xl border border-red-600 m-auto mt-[20px] bg-[#14161A] p-4">
        <h2 className="text-[34px] font-normal text-white text-center">
          Cryptocurrency Prices by Market Cap
        </h2>
        <input
          type="text"
          placeholder="Search For a Crypto Currency.."
          className="w-full h-[55px] rounded-[4px] bg-[#14161A] mt-[12px] text-[16px] font-normal text-white p-2"
        />

        <table className="w-full mt-4 text-white border-collapse">
          <thead>
            <tr className="bg-[#87CEEB] text-black h-[55px] rounded-t-[4px]">
              <th className="p-2 text-left">Coin</th>
              <th className="p-2">Price</th>
              <th className="p-2 text-left">24h Change</th>
              <th className="p-2 text-left">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="bg-[#1E1F25] h-[55px]">
                <td className="p-2 flex items-center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 mr-2"
                  />
                  {coin.name}
                </td>
                <td className="p-2">
                  {currency.toUpperCase()} {coin.current_price.toLocaleString()}
                </td>
                <td
                  className="flex items-center gap-[18px] p-2"
                  style={{
                    color:
                      coin.price_change_percentage_24h >= 0 ? "green" : "red",
                  }}
                >
                  <FiEye />
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="p-2">
                  {currency.toUpperCase()} {coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
