import React, { useEffect, useState } from "react";
import { FilterProvider } from "../context/FilterContext";
import { FilterPanel } from "./FilterPanel";
import { DataTable } from "./DataTable";
import { parseCSV } from "../utils/csv";
import "../App.css"; // optional: for your own styling

export const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("/dataset_small.csv")
      .then(r => r.text())
      .then(csv => setData(parseCSV(csv)));
  }, []);

  if (data.length === 0) return <div>Loading data...</div>;
  return (
    <FilterProvider data={data}>
      <h2>BI Dashboard: Filterable Table</h2>
      <FilterPanel />
      <DataTable />
    </FilterProvider>
  );
};
