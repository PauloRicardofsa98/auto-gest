"use client";
import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { BoxIcon } from "lucide-react";

import DataTableColumnContent from "@/app/_components/table/data-table-column-content";
import DataTableColumnHeader from "@/app/_components/table/data-table-column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

import ProductRowActions from "./product-row-actions";

export const productColumns: ColumnDef<Product>[] = [
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
    cell: ({ row: { original: product } }) => (
      <DataTableColumnContent align="start">
        {product.id}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "name",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" align="start" />
    ),
    cell: ({ row: { original: product } }) => (
      <DataTableColumnContent align="start">
        {product.name}
      </DataTableColumnContent>
    ),
    filterFn: (row, id, value) => {
      return row.original.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" align="start" />
    ),
    cell: ({ row: { original: product } }) => (
      <DataTableColumnContent align="start">
        {product.sku}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unidade" align="start" />
    ),
    cell: ({ row: { original: product } }) => (
      <DataTableColumnContent align="start">
        {product.unit}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" align="start" />
    ),
    cell: ({ row: { original: product } }) => (
      <DataTableColumnContent align="start">
        {Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(product.price))}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estoque" align="start" />
    ),
    cell: ({ row: { original: product } }) => (
      <DataTableColumnContent align="start">
        {product.stock}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "stokInfo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Info"} />
    ),
    cell: ({ row: { original: product } }) => {
      return (
        <DataTableColumnContent>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BoxIcon />
              </TooltipTrigger>
              <TooltipContent className="gap-4">
                <div className="flex flex-col">
                  <h1 className="text-xl italic">Estoque</h1>
                  <span>
                    <b>Estoque:</b> {product.stock}
                  </span>
                  <span>
                    <b>Estoque mínimo:</b> {product.minimumStock}
                  </span>
                  <span>
                    <b>Estoque máximo:</b> {product.maximumStock}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DataTableColumnContent>
      );
    },
    enableSorting: false,
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" />
    ),
    cell: ({ row: { original: product } }) => (
      <DataTableColumnContent>
        {new Date(product.createdAt).toLocaleDateString("pt-BR")}
      </DataTableColumnContent>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="flex items-center justify-center">Ações</div>,
    cell: ({ row: { original: product } }) => (
      <DataTableColumnContent>
        <ProductRowActions product={product} />
      </DataTableColumnContent>
    ),
  },
];
