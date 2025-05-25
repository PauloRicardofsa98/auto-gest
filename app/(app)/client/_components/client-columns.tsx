"use client";
import { Client } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Contact } from "lucide-react";

import DataTableColumnContent from "@/app/_components/table/data-table-column-content";
import DataTableColumnHeader from "@/app/_components/table/data-table-column-header";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { maskCpfCnpj } from "@/app/_utils/helper";

import ClientRowActions from "./client-row-actions";
import ObsClient from "./obs-client";

export const clientColumns: ColumnDef<Client>[] = [
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
    cell: ({ row: { original: client } }) => (
      <DataTableColumnContent align="start">{client.id}</DataTableColumnContent>
    ),
  },
  {
    accessorKey: "observation",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Obs"
        align="start"
        className="w-[15px]"
      />
    ),
    cell: ({ row: { original: client } }) => (
      <DataTableColumnContent align="start" className="w-[30px]">
        <ObsClient client={client} />
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" align="start" />
    ),
    cell: ({ row: { original: client } }) => (
      <DataTableColumnContent align="start">
        <div className="flex flex-col">
          <span>{client.name}</span>
          <span className="text-sm text-muted-foreground">
            {client.cpfCnpj ? maskCpfCnpj(client.cpfCnpj) : ""}
          </span>
        </div>
      </DataTableColumnContent>
    ),
    filterFn: (row, id, value) => {
      const noPoints = value.replace(/\D/g, "");
      const isNumber = /^\d+$/.test(noPoints);
      const cpfCnpj = row.original.cpfCnpj;
      if (isNumber && cpfCnpj) {
        const includeCpf = cpfCnpj.includes(noPoints);
        return includeCpf;
      }

      return row.original.name.toLowerCase().includes(value.toLowerCase());
    },
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
                <Contact />
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
    cell: ({ row: { original: client } }) => (
      <DataTableColumnContent>
        {new Date(client.createdAt).toLocaleDateString("pt-BR")}
      </DataTableColumnContent>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="flex items-center justify-center">Ações</div>,
    cell: ({ row: { original: client } }) => (
      <DataTableColumnContent>
        <ClientRowActions client={client} />
      </DataTableColumnContent>
    ),
  },
];
