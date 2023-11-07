import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import TariffCard from "./TariffCard";
import { Select } from "antd";
import {
  setTariffRedux,
  setLoading,
  setSortingFilter,
  sortTariffs,
} from "../redux/reducers/tariffReducer";
import { useDispatch } from "react-redux";

function Test() {
  const dispatch = useDispatch();
  const tariffsFromRedux = useSelector((state) => state.tariffRedux);
  const sortingCriteria = useSelector(
    (state) => state.tariffRedux.sortingCriteria
  ); // Get the sorting criteria from Redux

  const handleSortingChange = (value) => {
    dispatch(setSortingFilter(value)); // Dispatch the action to set the sorting filter
    dispatch(sortTariffs()); // Dispatch the action to sort tariffs
  };

  const sortedTariffs = useSelector((state) => state.tariffRedux.tariffs);

  return (
    <div className="tariffBody">
      <div className="tariffHeader">
        <h2>Tariffs (add Header-child for tariffs)</h2>
        <Select
          value={tariffsFromRedux.sortingFilter}
          onChange={handleSortingChange}
          style={{ width: 200, marginLeft: 16 }}
        >
          <Select.Option value="download_speed">Download</Select.Option>
          <Select.Option value="upload_speed">Upload</Select.Option>
          <Select.Option value="price">Price</Select.Option>
        </Select>
      </div>
      {tariffsFromRedux.isLoading ? (
        <div className="loadSpin">
          <Spin />
        </div>
      ) : (
        <ul>
          {sortedTariffs.map((tariff, index) => (
            <li key={tariff.id}>
              <TariffCard tariff={tariff} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Test;
