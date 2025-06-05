import React from "react";
import { useFilterContext } from "../context/FilterContext";
import { FilterDropdown } from "./FilterDropdown";

export const FilterPanel: React.FC = () => {
  const { data } = useFilterContext();
  if (data.length === 0) return null;
  const columns = Object.keys(data[0] || {});

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
      {columns.map(col => (
        <FilterDropdown key={col} column={col} />
      ))}
    </div>
  );
};
