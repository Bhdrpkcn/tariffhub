import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";

const FilterOptions = ({ options, filters, onChange }) => {
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

  const className = isMobile ? "sdFilterOptionsM" : "sdFilterOptions";

  return (
    <div className={className}>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          onChange={() => onChange(option.value)}
          checked={filters.includes(option.value)}
        >
          {option.label}
        </Checkbox>
      ))}
    </div>
  );
};

export default FilterOptions;
