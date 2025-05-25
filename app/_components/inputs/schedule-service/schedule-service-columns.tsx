"use client";

import { Service } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnHeader from "@/app/_components/table/data-table-column-header";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { currencyFormat } from "@/app/_utils/helper";

export const scheduleServiceColumns: ColumnDef<Service>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Procedimento" />
    ),
    cell: ({ row }) => row.original.name,
    filterFn: (row, id, value) => {
      return row.original.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor do repasse" />
    ),
    cell: ({ row }) => currencyFormat(Number(row.original.price)),
  },
];
