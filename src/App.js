import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get(
          "https://canopy-frontend-task.now.sh/api/holdings"
        );
        setHoldings(response.data.payload);
      } catch (error) {
        console.error("Error fetching holdings:", error);
      }
    };

    fetchHoldings();
  }, []);

  const groupedHoldings = holdings.reduce((acc, holding) => {
    const { asset_class } = holding;
    if (!acc[asset_class]) {
      acc[asset_class] = [];
    }
    acc[asset_class].push(holding);
    return acc;
  }, {});
  return (
    <div className="holdings-table-container">
      <h1>Holdings Table</h1>
      {Object.entries(groupedHoldings).map(([assetClass, holdings]) => (
        <div key={assetClass}>
          <h2>{assetClass}</h2>
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticker</th>
                <th>Average Price</th>
                <th>Market Price</th>
                <th>Latest Change Percentage</th>
                <th>Market Value (Base CCY)</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <tr key={index}>
                  <td>{holding.name}</td>
                  <td>{holding.ticker}</td>
                  <td>{holding.avg_price}</td>
                  <td>{holding.market_price}</td>
                  <td>{holding.latest_chg_pct}</td>
                  <td>{holding.market_value_ccy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}{" "}
    </div>
  );
}

export default App;
