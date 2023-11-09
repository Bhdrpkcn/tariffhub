import React from "react";
import "./tariffCard.css";
import { Button, Badge } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

function TariffCard({ tariff, index }) {
  const tariffs = useSelector((state) => state.tariffRedux.tariffs);

  //fix : get from reducer
  const maxDownloadSpeed = Math.max(
    ...tariffs.map((t) => parseInt(t.download_speed, 10))
  );
  const maxUploadSpeed = Math.max(
    ...tariffs.map((t) => parseInt(t.upload_speed, 10))
  );

  const relativeDownloadSpeed =
    (parseInt(tariff.download_speed, 10) / maxDownloadSpeed) * 100;
  const relativeUploadSpeed =
    (parseInt(tariff.upload_speed, 10) / maxUploadSpeed) * 100;

  let badgeTypes;
  //seperate the badge & speed comp ?
  const speedProduct = relativeDownloadSpeed * relativeUploadSpeed;

  if (speedProduct > 2000) {
    badgeTypes = "Fastest Connection";
  } else if (speedProduct > 1999) {
    badgeTypes = "Fast Connection";
  } else if (speedProduct > 500) {
    badgeTypes = "Optimum Connection";
  } else if (speedProduct > 50) {
    badgeTypes = "Slow Connection";
  } else {
    badgeTypes = "default"; // If none of the conditions are met, you can set a default value.
  }

  let badgeColor;

  if (badgeTypes === "Fastest Connection") {
    badgeColor = "green";
  } else if (badgeTypes === "Fast Connection") {
    badgeColor = "yellow";
  } else if (badgeTypes === "Optimum Connection") {
    badgeColor = "gray";
  } else {
    badgeColor = "red";
  }

  console.log("down:", relativeDownloadSpeed, "up:", relativeUploadSpeed);

  return (
    <Badge.Ribbon text={badgeTypes} color={badgeColor}>
      <div className="tariffCard">
        <div className="tariffCred">
          <div className="tarifNo">{index}</div>
          <div className="tariffBrand">
            <div className="tariffName">{tariff.name}</div>
            <div className="tariffImage">image</div>
            <div>{tariff.brand}</div>
          </div>
        </div>
        <div className="tariffSpecs">
          <div className="tariffSpeed">
            <div className="tariffDown">
              <DownloadOutlined />
              {tariff.download_speed}
              <div className="speedBar">
                <div
                  className="speedFillDown"
                  style={{ width: `${relativeDownloadSpeed}%` }}
                ></div>
              </div>
            </div>

            <div className="tariffUp">
              <UploadOutlined />
              {tariff.upload_speed}
              <div className="speedBar">
                <div
                  className="speedFillUp"
                  style={{ width: `${relativeUploadSpeed}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="tariffOffers">
            {tariff.offers.map((offer, index) => (
              <div key={offer.id}>
                <CheckOutlined />
                {offer}
              </div>
            ))}
          </div>
        </div>

        <div className="tariffDetails">
          <div className="price">Price: {tariff.price}</div>
          <Button>to Tariff</Button>
        </div>
      </div>
    </Badge.Ribbon>
  );
}

export default TariffCard;
