import React, { createContext, useContext, useState, useMemo } from "react";
import type { DataRow, Filters, FilterContextType } from "../types";

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ data: DataRow[]; children: React.ReactNode }> = ({ data, children }) => {
  const [filters, setFilters] = useState<Filters>({});

  // ✅ Memoized filtered data
  const filteredData = useMemo(() => {
    return data.filter(row =>
      Object.entries(filters).every(([col, selected]) =>
        !selected?.length || selected.includes(row[col])
      )
    );
  }, [data, filters]);

  // ✅ Memoized dropdown options
  const dropdownOptions = useMemo(() => {
    const options: Record<string, (string | number)[]> = {};
    const columns = Object.keys(data[0] || {});
    columns.forEach(col => {
      const filteredForThis = data.filter(row =>
        Object.entries(filters).every(([otherCol, selected]) =>
          col === otherCol || !selected?.length || selected.includes(row[otherCol])
        )
      );
      options[col] = Array.from(new Set(filteredForThis.map(row => row[col])));
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
