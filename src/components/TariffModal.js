import React from "react";
import { Button, Modal } from "antd";
import {
  DownloadOutlined,
  UploadOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import LogoWodafone from "../images/logoWdf.png";
import LogoO3 from "../images/logoO3.png";
import LogoKelekom from "../images/logoTlk.png";
import LogoChinaCom from "../images/logoChn.png";
import LogoSingdel from "../images/logoSing.png";

function TariffModal({
  isModalVisible,
  handleCancel,
  tariff,
  relativeDownloadSpeed,
  relativeUploadSpeed,
}) {
  const brandLogoMap = {
    Wodafone: LogoWodafone,
    O3: LogoO3,
    Kelekom: LogoKelekom,
    "China Com": LogoChinaCom,
    Singdel: LogoSingdel,
  };
  const logo = brandLogoMap[tariff.brand];

  return (
    <Modal
      title={null}
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <div>
        <Button className="tariffConsult" onClick={handleCancel}>
          TO THE TARIFF CONSULTANT
        </Button>
        <div className="tariffCard" style={{ padding: "2rem" }}>
          <div className="tariffCred">
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
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TariffModal;
