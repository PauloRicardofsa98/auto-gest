"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "@/app/_components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  name: string;
  title: string;
}

export function DataTableFilterInput<TData>({
  table,
  name,
  title,
}: DataTableToolbarProps<TData>) {
  return (
    <Input
      placeholder={`Filtrar por ${title}...`}
      value={(table.getColumn(name)?.getFilterValue() as string) ?? ""}
      onChange={(event) => {
        table.getColumn(name)?.setFilterValue(event.target.value);
      }}
      className="h-8 w-full lg:w-[250px]"
    />
  );
}

export default DataTableFilterInput;
