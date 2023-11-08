import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import TariffCard from "./TariffCard";
import { Select, FloatButton } from "antd";
import { setSortingFilter, sortTariffs } from "../redux/reducers/tariffReducer";
import { useDispatch } from "react-redux";

function Test() {
  const dispatch = useDispatch();
  const tariffsFromRedux = useSelector((state) => state.tariffRedux);

  const handleSortingChange = (value) => {
    dispatch(setSortingFilter(value));
    dispatch(sortTariffs());
  };

  const sortedTariffs = useSelector((state) => state.tariffRedux.tariffs);

  return (
    <div className="tariffBody">
      <div className="tariffHeader">
        <div className="tariffHeaderTitle">Tariffs</div>
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
            <div key={tariff.id}>
              <TariffCard tariff={tariff} index={index + 1} />
            </div>
          ))}
        </ul>
      )}
      <FloatButton.BackTop duration={2000} />
    </div>
  );
}

export default Test;
