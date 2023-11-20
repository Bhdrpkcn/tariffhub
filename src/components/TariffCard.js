import React, { useState } from "react";
import "./tariffCard.css";
import { Button, Badge } from "antd";
import {
  UploadOutlined,
  DownloadOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import TariffModal from "./TariffModal";
import LogoWodafone from "../images/logoWdf.png";
import LogoO3 from "../images/logoO3.png";
import LogoKelekom from "../images/logoTlk.png";
import LogoChinaCom from "../images/logoChn.png";
import LogoSingdel from "../images/logoSing.png";

function TariffCard({ tariff, index }) {
  const maxDownloadSpeed = useSelector(
    (state) => state.tariffRedux.maxDownloadSpeed
  );
  const maxUploadSpeed = useSelector(
    (state) => state.tariffRedux.maxUploadSpeed
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const relativeDownloadSpeed =
    (parseInt(tariff.download_speed, 10) / maxDownloadSpeed) * 100;
  const relativeUploadSpeed =
    (parseInt(tariff.upload_speed, 10) / maxUploadSpeed) * 100;

  const brandLogoMap = {
    Wodafone: LogoWodafone,
    O3: LogoO3,
    Kelekom: LogoKelekom,
    "China Com": LogoChinaCom,
    Singdel: LogoSingdel,
  };
  const logo = brandLogoMap[tariff.brand];

  let badgeTypes;
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
    badgeTypes = "default";
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

  return (
    <Badge.Ribbon text={badgeTypes} color={badgeColor}>
      <div className="tariffCard">
        <div className="tariffCred">
          <div className="tarifNo">{index}</div>
          <div className="tariffBrand">
            <div className="tariffName">{tariff.name}</div>
            <div className="tariffImage">
              {logo && (
                <img
                  src={logo}
                  alt={`${tariff.brand} logo`}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
            <div className="tariffBrandName">{tariff.brand}</div>
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
              <div key={`${tariff.id}-${index}`}>
                <CheckOutlined />
                {offer}
              </div>
            ))}
          </div>
        </div>

        <div className="tariffDetails">
          <div className="price">{tariff.price}</div>
          <Button onClick={showModal}>to Tariff</Button>
        </div>
      </div>
      <TariffModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        tariff={tariff}
        relativeDownloadSpeed={relativeDownloadSpeed}
        relativeUploadSpeed={relativeUploadSpeed}
      />
    </Badge.Ribbon>
  );
}

export default TariffCard;
