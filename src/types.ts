// src/types.ts

export type DataRow = Record<string, string | number>;

export type Filters = Record<string, (string | number)[]>;

export type FilterContextType = {
  data: DataRow[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  dropdownOptions: Record<string, (string | number)[]>;
  filteredData: DataRow[];
};
