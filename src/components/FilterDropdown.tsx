// FilterDropdown.tsx
import React, { useDeferredValue, forwardRef } from "react";
import type { SyntheticEvent } from "react";
import {
  Autocomplete,
  Checkbox,
  TextField,
  useAutocomplete
} from "@mui/material";
import { VariableSizeList } from "react-window";
import { useFilterContext } from "../context/FilterContext";
import type { ListChildComponentProps } from "react-window";

type Props = { column: string };

// Custom virtualized ListboxComponent for MUI
const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const option = data[index];
  return React.cloneElement(option, {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const ListboxComponent = forwardRef<HTMLDivElement>(
  function ListboxComponent(props: any, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const itemCount = itemData.length;
    const itemSize = 36;

    const height = Math.min(8, itemCount) * itemSize + 2 * LISTBOX_PADDING;

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            height={height}
            width="100%"
            itemSize={() => itemSize}
            itemCount={itemCount}
            itemData={itemData}
            outerElementType={OuterElementType}
            overscanCount={5}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  }
);

export const FilterDropdown = React.memo(({ column }: Props) => {
  const { filters, setFilters, dropdownOptions } = useFilterContext();
  const options = dropdownOptions[column] || [];
  const deferredOptions = useDeferredValue(options);

  const handleChange = (_: SyntheticEvent, values: (string | number)[]) => {
    setFilters(prev => ({ ...prev, [column]: values }));
  };

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      ListboxComponent={ListboxComponent as any}
      options={deferredOptions}
      value={filters[column] || []}
      onChange={handleChange}
      getOptionLabel={(option) => String(option)}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={selected}
            style={{ marginRight: 8 }}
          />
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
      style={{ minWidth: 200, marginBottom: 10 }}
    />
  );
});
