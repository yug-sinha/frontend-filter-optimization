import { render } from "@testing-library/react";
import { DataTable } from "./DataTable";
import { FilterProvider } from "../context/FilterContext";

const mockData = [
  { number: 1, mod3: 1 },
  { number: 2, mod3: 2 },
  { number: 3, mod3: 0 },
];

describe("DataTable", () => {
  it("renders the table with data", () => {
    const { getByText } = render(
      <FilterProvider data={mockData}>
        <DataTable />
      </FilterProvider>
    );
    expect(getByText("number")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
  });
});
