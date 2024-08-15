import React, { useState, useEffect } from "react";
import { FiEye, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function MarketCap({ currency }) {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // Yangi holat
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const navigateToCryptoView = (id) => {
    navigate(`/crypto/${id}`);
  };

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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCoins(data);
        setFilteredCoins(data);
        setCurrencySymbol(currencySymbols[currency.toLowerCase()] || "₹");
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [currency, page]);

  useEffect(() => {
    setFilteredCoins(
      coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, coins]);

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
            className={`w-[35px] h-[35px] rounded-full ${
              page === pageNumber
                ? "bg-[#343A40] text-[#87CEEB]"
                : "text-[#87CEEB]"
            }`}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      );
    });
  };

  const handleAddToWatchlist = (coin) => {
    if (!watchlist.find((watchlistCoin) => watchlistCoin.id === coin.id)) {
      setWatchlist([...watchlist, coin]);
      setIsDrawerOpen(true);
    }
  };


  const handleRemoveFromWatchlist = (coinId) => {
    setWatchlist(watchlist.filter((coin) => coin.id !== coinId));
  };

  return (
    <div className="bg-[#14161A]">
      <div className="max-w-7xl mx-auto p-4 bg-[#14161A]">
        <h2 className="text-[34px] font-normal text-white text-center mt-[15px]">
          Cryptocurrency Prices by Market Cap
        </h2>
        <input
          type="text"
          placeholder="Search For a Crypto Currency.."
          className="w-full h-[55px] rounded-[4px] bg-[#14161A] mt-[13px] text-[16px] font-normal text-white border-[#343A40]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full mt-[20px] text-white">
          <thead>
            <tr className="bg-[#87CEEB] text-black h-[55px] rounded-t-[4px]">
              <th className="p-[15px] text-left w-[40%]">Coin</th>
              <th className="text-right w-[20%]">Price</th>
              <th className="text-right w-[20%]">24h Change</th>
              <th className="p-[15px] text-right w-[20%]">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr
                key={coin.id}
                className="bg-[#16171A] h-[95px] border-b items-center"
              >
                <td
                  className="w-full h-[95px] flex items-center pl-[15px] gap-[15px] cursor-pointer"
                  onClick={() => navigateToCryptoView(coin.id)}
                >
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
                  className="w-full flex items-center justify-end gap-[10px]"
                  style={{
                    color:
                      coin.price_change_percentage_24h >= 0 ? "green" : "red",
                  }}
                >
                  <FiEye
                    className="w-[26px] h-[24px] cursor-pointer"
                    onClick={() => handleAddToWatchlist(coin)}
                  />
                  <span className="ml-2">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </td>
                <td className="text-right text-[14px] font-normal pr-[15px]">
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

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="w-[250px] p-[15px]">
          <Typography variant="h6">Watchlist</Typography>
          {watchlist.length > 0 ? (
            <div className="flex flex-col gap-[15px]">
              {watchlist.map((coin) => (
                <div
                  key={coin.id}
                  className="flex items-center justify-between bg-[#16171A] rounded-[4px] p-[10px] text-white"
                >
                  <div className="flex items-center gap-[10px]">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-[40px] h-[40px]"
                    />
                    <div className="flex flex-col">
                      <span>{coin.name}</span>
                      <span>
                        {currencySymbol} {coin.current_price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleRemoveFromWatchlist(coin.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="body2">No items in watchlist</Typography>
          )}
        </div>
      </Drawer>
    </div>
  );
}
