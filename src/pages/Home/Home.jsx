import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import MarketCap from "../../components/MarketCap/MarcetCap";

export default function Home({ currency, onCurrencyChange }) {
  return (
    <div>
      <Navbar onCurrencyChange={onCurrencyChange} />
      <Header />
      <MarketCap currency={currency} />
    </div>
  );
}
