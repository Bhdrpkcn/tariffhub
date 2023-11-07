import React from "react";

function TariffCard({ tariff }) {
    
  return (
    <div className="tariff-card">
      <h3 className="tariff-name">Tariff Name: {tariff.name}</h3>
      <p className="brand">Brand: {tariff.brand}</p>
      <p className="download-speed">Download Speed: {tariff.download_speed}</p>
      <p className="upload-speed">Upload Speed: {tariff.upload_speed}</p>
      <p className="price">Price: {tariff.price}</p>
    </div>
  );
}

export default TariffCard;
