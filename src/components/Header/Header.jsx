import React, { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";

export default function Header() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const chunkSize = 4;
  const productChunks = [];

  for (let i = 0; i < products.length; i += chunkSize) {
    productChunks.push(products.slice(i, i + chunkSize));
  }

  const customCarouselTheme = {
    root: {
      base: "relative h-full w-full overflow-hidden",
      leftControl:
        "absolute top-0 left-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none",
      rightControl:
        "absolute top-0 right-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
      wrapper: "hidden", // Indicatorsni yashirish uchun
    },
  };

  return (
    <div
      className="w-full h-[420px] relative flex flex-col items-center"
      style={{
        backgroundImage: `url('/header-bg-img.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-[60px] text-center">
        <h2 className="text-[55px] text-[#87CEEB] font-bold">
          CRYPTOFOLIO WATCH LIST
        </h2>
        <p className="text-[14px] text-[#A9A9A9] font-medium">
          Get all the Info regarding your favorite Crypto Currency
        </p>
      </div>
      {products.length > 0 ? (
        <div className="absolute w-[1280px] h-[187px] top-[210px]">
          <Carousel
            slideInterval={3000}
            leftControl=" "
            rightControl=" "
            theme={customCarouselTheme}
          >
            {productChunks.map((chunk, index) => (
              <div
                key={index}
                className="h-full flex justify-center items-center gap-[150px]"
              >
                {chunk.map((product) => (
                  <div
                    key={product.id}
                    className="w-[120px] h-[120px] flex flex-col items-center"
                  >
                    <img
                      src={product.image || ""}
                      alt={product.name || ""}
                      className="w-[80px] h-[80px] object-contain"
                    />
                    <div className="flex mt-[10px] gap-[10px] items-center">
                      <h3 className="text uppercase text-white font-semibold">
                        {product.symbol || ""}
                      </h3>
                      <p
                        className={`text-sm font-semibold ml-1 ${
                          product.price_change_percentage_24h > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {product.price_change_percentage_24h
                          ? product.price_change_percentage_24h.toFixed(2)
                          : ""}
                        %
                      </p>
                    </div>
                    <p className="text-lg text-white font-bold mt-">
                      ${product.current_price || ""}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p className="absolute top-[300px]">
          <span className="loader"></span>
        </p>
      )}
    </div>
  );
}
