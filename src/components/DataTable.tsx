import React, { useState } from "react";
import { useFilterContext } from "../context/FilterContext";

const PAGE_SIZE = 100;

export const DataTable: React.FC = () => {
  const { filteredData } = useFilterContext();
  const [page, setPage] = useState(1);

  const startIdx = (page - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const currentPageData = filteredData.slice(startIdx, endIdx);

  if (!currentPageData.length) return <div>No data</div>;

  const columns = Object.keys(currentPageData[0]);

  return (
    <div>
      <div
        style={{
          maxHeight: "750px",
          overflowY: "auto",
          border: "1px solid #ddd",
          marginBottom: 10,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #000", padding: 4 }}>#</th> {/* Row number column */}
              {columns.map((col) => (
                <th key={col} style={{ border: "1px solid #000", padding: 4 }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((row, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ccc", padding: 4 }}>
                  {startIdx + idx + 1}
                </td>
                {columns.map((col) => (
                  <td key={col} style={{ border: "1px solid #ccc", padding: 4 }}>
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: 10 }}>
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>Prev</button>
        <span style={{ margin: "0 10px" }}>
          Page {page} / {Math.ceil(filteredData.length / PAGE_SIZE)}
        </span>
        <button onClick={() => setPage((p) => p + 1)} disabled={endIdx >= filteredData.length}>Next</button>
      </div>

      <div style={{ fontSize: 12, marginTop: 4 }}>
        Showing {currentPageData.length} of {filteredData.length} rows on this page (total {filteredData.length})
      </div>
    </div>
  );
};
