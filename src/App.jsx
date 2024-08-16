import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CryptoView from "./pages/CryptoView/CryptoView";
import "flowbite/dist/flowbite.css";
import "./App.css";

function App() {
  const [currency, setCurrency] = useState("usd");

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home currency={currency} onCurrencyChange={handleCurrencyChange} />
          }
        />
        <Route
          path="/crypto/:coinId"
          element={<CryptoView currency={currency} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
