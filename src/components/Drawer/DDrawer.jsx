import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";

export default function DDrawer({
  isDrawerOpen,
  setIsDrawerOpen, // Qabul qilish
  watchlist,
  handleRemoveFromWatchlist,
  currencySymbol,
}) {
  const [removed, setRemoved] = useState(null);

  const handleRemove = (coinId) => {
    setRemoved(coinId);
    handleRemoveFromWatchlist(coinId);
    setTimeout(() => setRemoved(null), 1000); // 1 soniya kutish
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      PaperProps={{
        style: {
          backgroundColor: "#515151",
          color: "white",
        },
      }}
    >
      <div className="w-[400px] p-[15px]">
        <Typography
          variant="h4"
          className="text-white text-center font-medium uppercase"
        >
          Watchlist
        </Typography>
        {watchlist.length > 0 ? (
          <div className="grid grid-cols-2 gap-[15px] mt-[30px]">
            {watchlist.map((coin) => (
              <div
                key={coin.id}
                className={`h-[240px] bg-[#16171A] rounded-[25px] p-[10px] text-white ${
                  removed === coin.id ? "bg-green-500" : ""
                }`}
              >
                <div className="w-full flex flex-col items-center">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-[90px] h-[90px] mt-[15px]"
                  />
                  <span className="mt-[30px]">
                    {currencySymbol} {coin.current_price.toLocaleString()}
                  </span>
                  <button
                    className={`w-[100px] h-[35px] mt-[15px] ${
                      removed === coin.id ? "bg-green-500" : "bg-red-600"
                    }`}
                    onClick={() => handleRemove(coin.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Typography variant="body2">No items in watchlist</Typography>
        )}
      </div>
    </Drawer>
  );
}
