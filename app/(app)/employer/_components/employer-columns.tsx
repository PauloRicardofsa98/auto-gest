"use client";

import { Employer } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ContactIcon } from "lucide-react";

import DataTableColumnContent from "@/app/_components/table/data-table-column-content";
import DataTableColumnHeader from "@/app/_components/table/data-table-column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

import EmployerRowActions from "./employer-row-actions";

export const employerColumns: ColumnDef<Employer>[] = [
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
    cell: ({ row: { original: employer } }) => (
      <DataTableColumnContent align="start">
        {employer.id}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "name",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" align="start" />
    ),
    cell: ({ row: { original: employer } }) => (
      <DataTableColumnContent align="start">
        {employer.name}
      </DataTableColumnContent>
    ),
    filterFn: (row, id, value) => {
      return row.original.name.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "cpf",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cpf" align="start" />
    ),
    cell: ({ row: { original: employer } }) => (
      <DataTableColumnContent align="start">
        {employer.cpf}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" align="start" />
    ),
    cell: ({ row: { original: employer } }) => (
      <DataTableColumnContent align="start">
        {employer.email}
      </DataTableColumnContent>
    ),
  },

  {
    accessorKey: "info",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Info"} />
    ),
    cell: ({ row: { original: client } }) => {
      const email = client.email;
      const phone = client.phone;

      return (
        <DataTableColumnContent>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ContactIcon />
              </TooltipTrigger>
              <TooltipContent className="gap-4">
                <div className="flex flex-col">
                  <h1 className="text-2xl italic">Contato</h1>
                  <span>
                    <b>Contato:</b> {phone}
                  </span>
                  <span>
                    <b>E-mail:</b> {email}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl italic">Endereço</h1>
                  <span>
                    <b>Endereço:</b> {client.address}
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
    cell: ({ row: { original: employer } }) => (
      <DataTableColumnContent>
        {new Date(employer.createdAt).toLocaleDateString("pt-BR")}
      </DataTableColumnContent>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="flex items-center justify-center">Ações</div>,
    cell: ({ row: { original: employer } }) => (
      <DataTableColumnContent>
        <EmployerRowActions employer={employer} />
      </DataTableColumnContent>
    ),
  },
];
