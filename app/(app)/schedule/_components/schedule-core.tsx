"use client";

import { Client, Prisma, Schedule, Service } from "@prisma/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Loading from "@/app/_components/loading";
import { DataTable } from "@/app/_components/table/data-table";
import { listSchedules } from "@/app/_data/schedule";

import HeaderSchedule from "./header-schedule";
import { scheduleColumns } from "./schedule-columns";

interface ScheduleCoreProps {
  clients: Client[];
  services: Service[];
}

const ScheduleCore = ({ clients, services }: ScheduleCoreProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [filter, setFilter] = useState<Prisma.ScheduleWhereInput | undefined>();

  const handleUpdateFilter = (filter: Prisma.ScheduleWhereInput) => {
    setFilter(filter);
  };

  useEffect(() => {
    const updateSchedules = async () => {
      setIsLoading(true);
      const promise = listSchedules({
        where: filter,
        include: {
          client: true,
          scheduleServices: {
            include: {
              service: true,
            },
          },
          vehicle: true,
          employer: true,
        },
      });
      toast.promise(promise, {
        loading: "Carregando agendamentos...",
        success: (response) => {
          setSchedules(response);
          return "Agendamentos carregados com sucesso!";
        },
        error: (error) => error.message,
        finally: () => setIsLoading(false),
      });
    };
    updateSchedules();
  }, [filter]);

  return (
    <div>
      <HeaderSchedule
        clients={clients}
        services={services}
        handleUpdateFilter={handleUpdateFilter}
      />
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Loading />
        </div>
      ) : (
        <DataTable
          columns={scheduleColumns}
          data={JSON.parse(JSON.stringify(schedules))}
        />
      )}
    </div>
  );
};

export default ScheduleCore;
