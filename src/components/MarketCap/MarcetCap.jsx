import React, { useState, useEffect } from "react";
import { FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import "./index.css"

export default function MarketCap({ currency }) {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  const itemsPerPage = 10;
  const totalPages = 10;

  const currencySymbols = {
    usd: "$",
    rub: "₽",
    aed: "د.إ",
    eur: "€",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=${itemsPerPage}&page=${page}&sparkline=false&price_change_percentage=24h`
        );
        const data = await response.json();
        setCoins(data);
        setCurrencySymbol(currencySymbols[currency.toLowerCase()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currency, page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const renderPaginationButtons = () => {
    const pagesToShow = [];

    if (page <= 3) {
      pagesToShow.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (page > 3 && page < totalPages - 2) {
      pagesToShow.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    } else {
      pagesToShow.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    }

    return pagesToShow.map((pageNumber, index) => {
      if (pageNumber === "...") {
        return (
          <li key={index} className="text-white">
            ...
          </li>
        );
      }

      return (
        <li key={index}>
          <button
            className={`w-[35px] h-[35px] rounded-[50%] ${
              page === pageNumber
                ? "bg-[#343A40] text-[#87CEEB]"
                : " text-[#87CEEB]"
            }`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      );
    });
  };

  return (
    <div className="bg-[#14161A]">
      <div className="max-w-7xl m-auto mt-[20px] p-4 bg-[#14161A]">
        <h2 className="text-[34px] font-normal text-white text-center">
          Cryptocurrency Prices by Market Cap
        </h2>
        <input
          type="text"
          placeholder="Search For a Crypto Currency.."
          className="w-full h-[55px] rounded-[4px] bg-[#14161A] mt-[12px] text-[16px] font-normal text-white border-[#343A40]"
        />

        <table className="w-full mt-4 text-white">
          <thead>
            <tr className="bg-[#87CEEB] text-black h-[55px] rounded-t-[4px]">
              <th className="p-[15px] text-left w-[40%]">Coin</th>
              <th className="text-right w-[20%]">Price</th>
              <th className="text-right w-[20%]">24h Change</th>
              <th className="p-[15px] text-right w-[20%]">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="bg-[#1E1F25] h-[95px] border-b">
                <td className="w-full h-[95px] flex items-center pl-[15px] gap-[15px]">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-[50px] h-[50px]"
                  />
                  <div className="flex flex-col">
                    <span className="text-[22px] font-normal">
                      {coin.symbol.toUpperCase()}
                    </span>
                    <span className="text-[14px] font-normal text-[#A9A9A9]">
                      {coin.name}
                    </span>
                  </div>
                </td>
                <td className="text-right text-[14px] font-normal">
                  {currencySymbol} {coin.current_price.toLocaleString()}
                </td>
                <td
                  className="w-full flex items-center justify-end gap-[19px] border h-full"
                  style={{
                    color:
                      coin.price_change_percentage_24h >= 0 ? "green" : "red",
                  }}
                >
                  <FiEye />
                  <span className="ml-2">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </td>
                <td className="w-[20%] text-[14px] font-normal text-right pr-[15px] ">
                  {currencySymbol} {coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-[20px]">
          <nav>
            <ul className="flex list-none items-center gap-1">
              <li>
                <button
                  className={`p-2 rounded ${
                    page === 1
                      ? "text-[#87CEEB] cursor-not-allowed"
                      : "text-[#87CEEB]"
                  }`}
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  <FiChevronLeft size={20} />
                </button>
              </li>
              {renderPaginationButtons()}
              <li>
                <button
                  className={`p-2 rounded ${
                    page === totalPages
                      ? "text-[#87CEEB] cursor-not-allowed"
                      : "text-[#87CEEB]"
                  }`}
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  <FiChevronRight size={20} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
