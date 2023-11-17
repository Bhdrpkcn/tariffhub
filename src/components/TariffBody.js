import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TariffCard from "./TariffCard";
import SidebarMobile from "./SidebarMobile";
import { Select, FloatButton } from "antd";
import {
  setSortingFilter,
  sortTariffs,
  filterTariffs,
} from "../redux/reducers/tariffReducer";
import { useDispatch } from "react-redux";

function TariffBody() {
  const dispatch = useDispatch();

  const tariffsFromRedux = useSelector((state) => state.tariffRedux);

  const handleSortingChange = useCallback(
    (value) => {
      dispatch(setSortingFilter(value));
      dispatch(filterTariffs());
    },
    [dispatch]
  );

  const handleSortingCancel = useCallback(() => {
    // Reset sorting filter and order to initial values and apply filters
    dispatch(setSortingFilter("Sort by"));
    dispatch(sortTariffs()); // Reset sorting order
    dispatch(filterTariffs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sortTariffs());
    dispatch(filterTariffs());
  }, [tariffsFromRedux.sortingFilter, tariffsFromRedux.speedFilters, dispatch]);

  useEffect(() => {
    dispatch(filterTariffs());
  }, [tariffsFromRedux.brandFilters, dispatch]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="tariffBody">
      <div className="tariffHeader">
        <div className="tariffHeaderTitle">Tariffs</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Select
            className="sortBtn"
            value={tariffsFromRedux.sortingFilter}
            onChange={handleSortingChange}
            style={{ width: 150, height: 40, marginLeft: 16, marginRight: 8 }}
          >
            <Select.Option value="download_speed">Download</Select.Option>
            <Select.Option value="upload_speed">Upload</Select.Option>
            <Select.Option value="price">Price</Select.Option>
          </Select>
          <CloseOutlined className="sortBtnCancel"
            style={{ fontSize: 30, marginRight: 8, alignItems: "center" }}
            value={tariffsFromRedux.sortingFilter}
            onClick={handleSortingCancel}
          />
        </div>
      </div>
      <>{isMobile && <SidebarMobile />}</>
      {tariffsFromRedux.isLoading ? (
        <div className="loadSpin">
          <Spin />
        </div>
      ) : (
        <div>
          {tariffsFromRedux.filteredTariffs &&
          tariffsFromRedux.filteredTariffs.length > 0 ? (
            tariffsFromRedux.filteredTariffs.map((tariff, index) => (
              <div key={tariff.id}>
                <TariffCard tariff={tariff} index={index + 1} />
              </div>
            ))
          ) : (
            <div>No matching tariffs found.</div>
          )}
        </div>
      )}

      <FloatButton.BackTop duration={2000} />
    </div>
  );
}

export default TariffBody;
