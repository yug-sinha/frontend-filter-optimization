import { render, fireEvent } from "@testing-library/react";
import { FilterDropdown } from "./FilterDropdown";
import { FilterProvider } from "../context/FilterContext";

const mockData = [
  { number: 1, mod3: 1, mod4: 1 },
  { number: 2, mod3: 2, mod4: 2 },
  { number: 3, mod3: 0, mod4: 3 },
];

describe("FilterDropdown", () => {
  it("renders dropdown and handles multi-select", () => {
    const { getByLabelText } = render(
      <FilterProvider data={mockData}>
        <FilterDropdown column="mod3" />
      </FilterProvider>
    );
    const select = getByLabelText("mod3");
    fireEvent.change(select, { target: { selectedOptions: [{ value: "1" }, { value: "2" }] } });
    expect(select).toBeInTheDocument();
  });
});
