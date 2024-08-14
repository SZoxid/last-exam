import { Carousel } from "flowbite-react";
import React from "react";

export default function Header() {
  return (
    <div
      className="w-full h-[400px] relative flex flex-col items-center "
      style={{
        backgroundImage: `url('/header-bg-img.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute border top-[70px]">
        <h2 className="text-[55px] text-[#87CEEB] font-bold">
          CRYPTOFOLIO WATCH LIST
        </h2>
        <p className="text-[14px] text-[#A9A9A9] font-medium text-center">
          Get all the Info regarding your favorite Crypto Currency
        </p>
      </div>
      <div className="absolute w-[1280px] h-[150px] border top-[230px]">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>
    </div>
  );
}

