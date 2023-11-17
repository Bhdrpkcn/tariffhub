import React from "react";
import "./sidebar.css";
import FilterOptions from "./FilterOptions";
import {
  setSpeedFilters,
  filterTariffs,
  setBrandFilters,
  filterBrandTariffs,
} from "../redux/reducers/tariffReducer";
import { useDispatch, useSelector } from "react-redux";
import { DashboardOutlined, ClearOutlined } from "@ant-design/icons";

const SidebarMobile = () => {
  const speedFilterOptions = [
    { label: "Up to 10 Mbps", value: "upTo10Mbps" },
    { label: "10 - 25 Mbps", value: "10to25Mbps" },
    { label: "30 Mbps or Higher", value: "30MbpsOrHigher" },
  ];
  const brandFilterOptions = [
    { label: "Wodafone", value: "Wodafone" },
    { label: "O3", value: "O3" },
    { label: "Kelekom", value: "Kelekom" },
    { label: "China Com", value: "China Com" },
    { label: "Singdel", value: "Singdel" },
  ];

  const dispatch = useDispatch();

  const speedFilters = useSelector((state) => state.tariffRedux.speedFilters);
  const brandFilters = useSelector((state) => state.tariffRedux.brandFilters);

  const handleSpeedFilterChange = (value) => {
    const updatedFilters = speedFilters.includes(value)
      ? speedFilters.filter((filter) => filter !== value)
      : [...speedFilters, value];

    dispatch(setSpeedFilters(updatedFilters));
    dispatch(filterTariffs());
  };

  const handleBrandFilterChange = (brand) => {
    const updatedBrandFilters = brandFilters.includes(brand)
      ? brandFilters.filter((filter) => filter !== brand)
      : [...brandFilters, brand];

    dispatch(setBrandFilters(updatedBrandFilters));
    dispatch(filterBrandTariffs());
  };

  const handleClearAllFilters = () => {
    dispatch(setSpeedFilters([]));
    dispatch(setBrandFilters([]));
    dispatch(filterTariffs());
  };

  return (
    <div className="sidebarMobile">
      <div className="sidebarFiltersM">
        <div>Select Brand</div>
        <FilterOptions
          className="sdFilterOptionsM"
          options={brandFilterOptions}
          filters={brandFilters}
          onChange={handleBrandFilterChange}
        />
      </div>
      <div className="sidebarFiltersM">
        <div>
          <DashboardOutlined /> Tariff Speed
        </div>
        <FilterOptions
          options={speedFilterOptions}
          filters={speedFilters}
          onChange={handleSpeedFilterChange}
        />
      </div>
      <div className="sidebarFiltersM">
        <div>Clear All</div>
        <div className="sdFilterClearM" onClick={handleClearAllFilters}>
          <ClearOutlined />
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
