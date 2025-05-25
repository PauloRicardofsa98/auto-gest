"use client";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import DataTableColumnContent from "@/app/_components/table/data-table-column-content";
import DataTableColumnHeader from "@/app/_components/table/data-table-column-header";

import ProductSupplierRowActions from "./product-supplier-row-actions";

type ProductSupplierAll = Prisma.ProductSupplierGetPayload<{
  include: { supplier: true; product: true };
}>;

export const productSupplierColumns: ColumnDef<ProductSupplierAll>[] = [
  {
    accessorKey: "name",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fornecedor" align="start" />
    ),
    cell: ({ row: { original: productSupplier } }) => (
      <DataTableColumnContent align="start">
        {productSupplier.supplier.name}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Preço de custo"
        align="start"
      />
    ),
    cell: ({ row: { original: productSupplier } }) => (
      <DataTableColumnContent align="start">
        {Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          style: "currency",
        }).format(Number(productSupplier.costPrice))}
      </DataTableColumnContent>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="flex items-center justify-center">Ações</div>,
    cell: ({ row: { original: productSupplier } }) => (
      <DataTableColumnContent>
        <ProductSupplierRowActions productSupplier={productSupplier} />
      </DataTableColumnContent>
    ),
  },
];
