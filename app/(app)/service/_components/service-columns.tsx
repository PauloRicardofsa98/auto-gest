"use client";

import { Service } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnContent from "@/app/_components/table/data-table-column-content";
import DataTableColumnHeader from "@/app/_components/table/data-table-column-header";

import ServiceRowActions from "./service-row-actions";

export const serviceColumns: ColumnDef<Service>[] = [
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
    cell: ({ row: { original: service } }) => (
      <DataTableColumnContent align="start">
        {service.id}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "name",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" align="start" />
    ),
    cell: ({ row: { original: service } }) => (
      <DataTableColumnContent align="start">
        {service.name}
      </DataTableColumnContent>
    ),
    filterFn: (row, id, value) => {
      return row.original.name.toLowerCase().includes(value.toLowerCase());
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" align="start" />
    ),
    cell: ({ row: { original: service } }) => (
      <DataTableColumnContent align="start">
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(service.price))}
      </DataTableColumnContent>
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row: { original: service } }) => (
      <DataTableColumnContent>
        {new Date(service.createdAt).toLocaleDateString("pt-BR")}
      </DataTableColumnContent>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="flex items-center justify-center">Ações</div>,
    cell: ({ row: { original: service } }) => (
      <DataTableColumnContent>
        <ServiceRowActions service={service} />
      </DataTableColumnContent>
    ),
  },
];
