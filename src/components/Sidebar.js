import React from "react";
import "./sidebar.css";
import { Button, Select, Checkbox, Row, Col } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  BankOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarFilters">
        <div>Your Info</div>
        <div className="sdFilterOptions">
          <HomeOutlined />
          <BankOutlined />
        </div>
      </div>
      <div className="sidebarFilters">
        <div>Select Brand</div>
        <div className="sdFilterOptions">
          <HomeOutlined />
          <BankOutlined />
        </div>
      </div>
      <div className="sidebarFilters">
        <div>
          <DashboardOutlined /> Tariff Speed
        </div>
        <div className="sdFilterCheckbox">
          <Checkbox>5 Mbps or Higher</Checkbox>
          <Checkbox>10 Mbps or Higher</Checkbox>
          <Checkbox>20 Mbps or Higher</Checkbox>
          <Checkbox>50 Mbps or Higher</Checkbox>
        </div>
      </div>
      <div className="sidebarFilters">
        <div>Tariff Offers</div>
        <div className="sdFilterCheckbox">
            <Checkbox>Checkbox 1</Checkbox>
            <Checkbox>Checkbox 2</Checkbox>
            <Checkbox>Checkbox 3</Checkbox>
            <Checkbox>Checkbox 4</Checkbox>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
