import React, { useState } from "react";
import Home from "./pages/Home/Home";

function App() {
  const [currency, setCurrency] = useState("usd");

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <div>
      <Home currency={currency} onCurrencyChange={handleCurrencyChange} />
    </div>
  );
}

export default App;
