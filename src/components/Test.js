import React from "react";
import { useSelector } from "react-redux";

function Test() {
  const tariffsFromRedux = useSelector((state) => state.tariffRedux);

  return (
    <div>
      <h2>Tariffs</h2>
          {tariffsFromRedux.isLoading ? (
            <p>Loading...</p>
          ) : (
      <ul>
        {tariffsFromRedux.tariffs.map((tariff, index) => (
          <li key={tariff.id}>
              <div>
                <h3>Tariff Name: {tariff.name}</h3>
                <p>Brand: {tariff.brand}</p>
                <p>Download Speed: {tariff.download_speed}</p>
              </div>
          </li>
        ))}
      </ul>
        )}
    </div>
  );
}

export default Test;
