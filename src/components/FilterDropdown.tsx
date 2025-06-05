import React, { SyntheticEvent, useDeferredValue } from "react";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useFilterContext } from "../context/FilterContext";

type Props = { column: string };

const _FilterDropdown: React.FC<Props> = ({ column }) => {
  const { filters, setFilters, dropdownOptions } = useFilterContext();
  const options = dropdownOptions[column] || [];

  // ✅ Use deferred value for smoother rendering
  const deferredOptions = useDeferredValue(options);

  const handleChange = (_: SyntheticEvent, values: (string | number)[]) => {
    setFilters(prev => ({ ...prev, [column]: values }));
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={deferredOptions}
      value={filters[column] || []}
      onChange={handleChange}
      getOptionLabel={(option) => String(option)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox checked={selected} style={{ marginRight: 8 }} />
          {option}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={column}
          placeholder="Search..."
          size="small"
        />
      )}
      style={{ minWidth: 180, marginBottom: 10 }}
    />
  );
};

// ✅ Wrap in React.memo to skip unnecessary re-renders
export const FilterDropdown = React.memo(_FilterDropdown);
