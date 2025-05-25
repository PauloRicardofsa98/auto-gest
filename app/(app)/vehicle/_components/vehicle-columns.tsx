"use client";

import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnContent from "@/app/_components/table/data-table-column-content";
import DataTableColumnHeader from "@/app/_components/table/data-table-column-header";

import VehicleRowActions from "./vehicle-row-actions";

type VehicleAll = Prisma.VehicleGetPayload<{
  include: { client: true };
}>;
export const vehicleColumns: ColumnDef<VehicleAll>[] = [
  {
    accessorKey: "id",

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={"Id"}
        align="start"
        className="w-[15px]"
      />
    ),
    cell: ({ row: { original: vehicle } }) => (
      <DataTableColumnContent align="start">
        {vehicle.id}
      </DataTableColumnContent>
    ),
  },

  {
    accessorKey: "plate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placa" align="start" />
    ),
    cell: ({ row: { original: vehicle } }) => (
      <DataTableColumnContent align="start">
        {vehicle.plate}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo" align="start" />
    ),
    cell: ({ row: { original: vehicle } }) => (
      <DataTableColumnContent align="start">
        {vehicle.model}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marca" align="start" />
    ),
    cell: ({ row: { original: vehicle } }) => (
      <DataTableColumnContent align="start">
        {vehicle.brand}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ano" align="start" />
    ),
    cell: ({ row: { original: vehicle } }) => (
      <DataTableColumnContent align="start">
        {vehicle.year}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cor" align="start" />
    ),
    cell: ({ row: { original: vehicle } }) => (
      <DataTableColumnContent align="start">
        {vehicle.color}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" align="start" />
    ),
    cell: ({ row: { original: vehicle } }) => (
      <DataTableColumnContent align="start">
        {vehicle.client?.name}
      </DataTableColumnContent>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="flex items-center justify-center">Ações</div>,
    cell: ({ row: { original: vehicle } }) => (
      <DataTableColumnContent>
        <VehicleRowActions vehicle={vehicle} />
      </DataTableColumnContent>
    ),
  },
];
