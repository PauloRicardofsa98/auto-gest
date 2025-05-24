/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";

export type FiltersTable = {
  column: string;
  title: string;
  options: OptionFilter[];
};

export type OptionFilter = {
  value: any;
  label: string;
  icon?: ReactElement;
  isDefault?: boolean;
};
export type FilterInput = {
  name: string;
  title: string;
};

export type TableProps = {
  data: any;
  columns: any;
  filterInput?: FilterInput;
  filters?: FiltersTable[];
};
