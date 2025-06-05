import React from "react";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import type { SyntheticEvent } from "react";
import { useFilterContext } from "../context/FilterContext";

type Props = { column: string };

export const FilterDropdown: React.FC<Props> = ({ column }) => {
  const { filters, setFilters, dropdownOptions } = useFilterContext();
  const options = dropdownOptions[column] || [];

  const handleChange = (
    _: SyntheticEvent,
    values: (string | number)[]
  ) => {
    setFilters(prev => ({ ...prev, [column]: values }));
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={options}
      value={filters[column] || []}
      onChange={handleChange}
      getOptionLabel={(option) => String(option)}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={selected} style={{ padding: "0 8px 0 0" }} />
            {option}
          </div>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={column}
          placeholder="Type to search"
          size="small"
        />
      )}
      style={{ minWidth: 180, marginBottom: 10 }}
    />
  );
};
