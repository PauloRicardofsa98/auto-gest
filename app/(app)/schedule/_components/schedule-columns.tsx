"use client";
import { Prisma, ScheduleStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnContent } from "@/app/_components/table/data-table-column-content";
import { DataTableColumnHeader } from "@/app/_components/table/data-table-column-header";
import { Badge } from "@/app/_components/ui/badge";

import { ScheduleRowActions } from "./schedule-row-actions";

type ScheduleAll = Prisma.ScheduleGetPayload<{
  include: {
    client: true;
    service: true;
    vehicle: true;
  };
}>;

const ScheduleStatusBadge = ({ status }: { status: ScheduleStatus }) => {
  switch (status) {
    case "PENDING":
      return <Badge className="bg-yellow-400 text-black">Pendente</Badge>;
    case "CANCELED":
      return <Badge className="bg-red-500">Cancelado</Badge>;
    case "DONE":
      return <Badge className="bg-green-500">Finalizado</Badge>;
    default:
      return <Badge className="bg-gray-400">Finalizado</Badge>;
  }
};

export const scheduleColumns: ColumnDef<ScheduleAll>[] = [
  {
    accessorKey: "createdAt",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Criado em" align="start" />
    ),
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent
        align="start"
        className={`${schedule.status === ScheduleStatus.CANCELED && "text-red-500 line-through"}`}
      >
        {new Date(schedule.createdAt).toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        })}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" align="start" />
    ),
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent
        align="start"
        className={`${schedule.status === ScheduleStatus.CANCELED && "text-red-500 line-through"}`}
      >
        {new Date(schedule.date).toLocaleDateString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        })}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Modelo" align="start" />
    ),
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent
        align="start"
        className={`${schedule.status === ScheduleStatus.CANCELED && "text-red-500 line-through"}`}
      >
        {schedule.vehicle.model}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marca" align="start" />
    ),
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent
        align="start"
        className={`${schedule.status === ScheduleStatus.CANCELED && "text-red-500 line-through"}`}
      >
        {schedule.vehicle.brand}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cor" align="start" />
    ),
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent
        align="start"
        className={`${schedule.status === ScheduleStatus.CANCELED && "text-red-500 line-through"}`}
      >
        {schedule.vehicle.color}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serviço" align="start" />
    ),
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent
        align="start"
        className={`${schedule.status === ScheduleStatus.CANCELED && "text-red-500 line-through"} max-w-64`}
      >
        {schedule.service.name}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" align="start" />
    ),
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent
        align="start"
        className={`${schedule.status === ScheduleStatus.CANCELED && "text-red-500 line-through"}`}
      >
        {schedule.client.name}
      </DataTableColumnContent>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" align="start" />
    ),
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent align="start">
        <ScheduleStatusBadge status={schedule.status} />
      </DataTableColumnContent>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: () => <div className="flex items-center justify-center">Ações</div>,
    cell: ({ row: { original: schedule } }) => (
      <DataTableColumnContent>
        <ScheduleRowActions schedule={schedule} />
      </DataTableColumnContent>
    ),
  },
];
