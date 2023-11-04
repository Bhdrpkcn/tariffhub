import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [tariffs, setTariffs] = useState([]);

  useEffect(() => {
    async function fetchTariffs() {
      try {
        const response = await fetch("https://demo6684249.mockable.io/tariffs");
        if (!response.ok) {
          throw new Error(
            `Error fetching tariffs: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setTariffs(data.tariffs);
      } catch (error) {
        console.error("Error fetching tariffs:", error);
      }
    }

    fetchTariffs();
  }, []); // The empty array [] makes this effect run once after the initial render.

  return (
    <div className="App">
      <div>
        {tariffs.map((tariff) => (
          <div className="tariffs">
            <hr />
            <h4>
              brand : {tariff.brand}(-id:{tariff.id})
            </h4>
            <h6>
              <ul>tariff name : {tariff.name}</ul>
              <ul>connection type: {tariff.type}</ul>
              <ul>
                speed: {tariff.download_speed}-{tariff.upload_speed}
              </ul>
              <ul>offers: {tariff.offers}</ul>
              <h2>speed: {tariff.price}</h2>
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
