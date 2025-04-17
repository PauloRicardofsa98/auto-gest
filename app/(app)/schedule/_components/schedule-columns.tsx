"use client";
import { Prisma, ScheduleService, ScheduleStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Microscope } from "lucide-react";

import { DataTableColumnContent } from "@/app/_components/table/data-table-column-content";
import { DataTableColumnHeader } from "@/app/_components/table/data-table-column-header";
import { Badge } from "@/app/_components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import { currencyFormat } from "@/app/_utils/helper";

import { ScheduleRowActions } from "./schedule-row-actions";

type ScheduleAll = Prisma.ScheduleGetPayload<{
  include: {
    client: true;
    vehicle: true;
    scheduleServices: {
      include: {
        service: true;
      };
    };
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
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
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
    accessorKey: "procedures",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="justify-center"
        column={column}
        title="Procedimentos"
      />
    ),
    cell: ({ row }) => {
      return (
        <DataTableColumnContent>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Microscope />
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-col">
                  {row.original.scheduleServices.length > 0 ? (
                    row.original.scheduleServices.map((service, index) => {
                      return (
                        <div className="flex gap-2" key={index}>
                          <span>
                            <b>Procedimento:</b> {service.service.name}
                          </span>
                          <span>
                            <b>Valor cliente:</b>{" "}
                            {currencyFormat(Number(service.value))}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <span className="flex gap-2 hover:cursor-pointer">
                      Nenhum procedimento cadastrado
                    </span>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DataTableColumnContent>
      );
    },
  },
  {
    accessorKey: "value",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Valor do agendamento"} />
    ),
    cell: ({ row }) => {
      const valueBudget = (procedures: ScheduleService[]) => {
        return procedures.reduce((accumulator, budgetProcedures) => {
          return accumulator + Number(budgetProcedures.value);
        }, 0);
      };

      return (
        <DataTableColumnContent>
          {currencyFormat(valueBudget(row.original.scheduleServices))}
        </DataTableColumnContent>
      );
    },
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
