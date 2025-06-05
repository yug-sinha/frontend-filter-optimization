// src/App.tsx

import React, { useEffect, useState } from "react";
import { FilterProvider } from "./context/FilterContext";
import { FilterPanel } from "./components/FilterPanel";
import { DataTable } from "./components/DataTable";
import { parseCSV } from "./utils/csv";
import "./App.css";

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

export default App;
