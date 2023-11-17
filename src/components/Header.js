import React, { useRef } from "react";

import {
  CloseOutlined,
  MenuOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "./header.css";
const Header = () => {
  const headRef = useRef();
  const headPhoneRef = useRef();

  const showMenuBar = () => {
    headRef.current.classList.toggle("responsiveHeader");
  };
  const showPhone = () => {
    headPhoneRef.current.classList.toggle("responsiveHeader");
  };

  return (
    <div className="header">
      <MenuOutlined className="nav-btn" onClick={showMenuBar} />
      <h3
        onClick={() => (window.location.href = "/")}
        style={{ cursor: "pointer" }}
      >
        TariffHub
      </h3>
      <div className="headerPhone">
        <PhoneOutlined className="nav-btn" onClick={showPhone} />
      </div>
      <nav ref={headRef}>
        <CloseOutlined
          className="nav-btn nav-close-btn"
          onClick={showMenuBar}
        />
        <a href="/#">
          <UserOutlined />
        </a>
        <a href="/#">Internet</a>
        <a href="/#">Electricity</a>
        <a href="/#">Gas</a>
        <a href="/#">Insurance</a>
      </nav>
      <nav ref={headPhoneRef}>
        <CloseOutlined className="nav-btn nav-close-btn" onClick={showPhone} />
        <a href="/#">
          <UserOutlined /> User Profile
        </a>
        <a href="/#">
          <PhoneOutlined /> : 0999-999-99-99
        </a>
        <div className="tariffExp">
          <p>© 2023 - TARIFFHUB.</p>
          <p>
            The comparison portal. Here, consumers can compare tariffs and
            products in the areas of energy, telecommunications and insurance
            free of charge. TARIFFHUB takes the greatest care to ensure the
            completeness and accuracy of the information presented, but cannot
            assume any liability for this or the performance of the providers.
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Header;
