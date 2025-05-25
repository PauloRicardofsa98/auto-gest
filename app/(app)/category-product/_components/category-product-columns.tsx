"use client";
import { CategoryProduct } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnContent from "@/app/_components/table/data-table-column-content";
import DataTableColumnHeader from "@/app/_components/table/data-table-column-header";

import CategoryProductRowActions from "./category-product-row-actions";

export const categoryProductColumns: ColumnDef<CategoryProduct>[] = [
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
    cell: ({ row: { original: category } }) => (
      <DataTableColumnContent align="start">
        {category.id}
      </DataTableColumnContent>
    ),
  },

  {
    accessorKey: "name",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" align="start" />
    ),
    cell: ({ row: { original: category } }) => (
      <DataTableColumnContent align="start">
        {category.name}
      </DataTableColumnContent>
    ),
    filterFn: (row, id, value) => {
      return row.original.name.toLowerCase().includes(value.toLowerCase());
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row: { original: category } }) => (
      <DataTableColumnContent>
        {new Date(category.createdAt).toLocaleDateString("pt-BR")}
      </DataTableColumnContent>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="flex items-center justify-center">Ações</div>,
    cell: ({ row: { original: category } }) => (
      <DataTableColumnContent>
        <CategoryProductRowActions categoryProduct={category} />
      </DataTableColumnContent>
    ),
  },
];
