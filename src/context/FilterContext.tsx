import React, { createContext, useContext, useState, useMemo } from "react";
import type { DataRow, Filters, FilterContextType } from "../types";


const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ data: DataRow[]; children: React.ReactNode }> = ({ data, children }) => {
  const [filters, setFilters] = useState<Filters>({});

  // Apply all filters to get filtered data
  const filteredData = useMemo(() => {
    return data.filter(row =>
      Object.entries(filters).every(([col, selected]) =>
        !selected || selected.length === 0 || selected.includes(row[col])
      )
    );
  }, [data, filters]);

  // Recalculate dropdown options for each column
  const dropdownOptions = useMemo(() => {
    const options: Record<string, (string | number)[]> = {};
    const columns = Object.keys(data[0] || {});
    columns.forEach(col => {
      // Apply all filters except this one
      const otherFilters = Object.fromEntries(Object.entries(filters).filter(([k]) => k !== col));
      const subData = data.filter(row =>
        Object.entries(otherFilters).every(([otherCol, sel]) =>
          !sel || sel.length === 0 || sel.includes(row[otherCol])
        )
      );
      // Unique values for this column in the filtered data
      options[col] = Array.from(new Set(subData.map(row => row[col])));
    });
    return options;
  }, [data, filters]);

  return (
    <FilterContext.Provider value={{ data, filters, setFilters, dropdownOptions, filteredData }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used within FilterProvider");
  return ctx;
};
