import { Prisma, ScheduleStatus } from "@prisma/client";
import { CircleIcon } from "lucide-react";

import { listSchedules } from "@/app/_data/schedule";
import { currencyFormat } from "@/app/_utils/helper";

type ScheduleAll = Prisma.ScheduleGetPayload<{
  include: {
    client: true;
    scheduleServices: {
      include: {
        service: true;
      };
    };
    vehicle: true;
  };
}>;

const ScheduleStatusCircle = ({ status }: { status: ScheduleStatus }) => {
  switch (status) {
    case "PENDING":
      return (
        <CircleIcon className="h-5 w-5 fill-yellow-400 text-yellow-400">
          Pendente
        </CircleIcon>
      );
    case "CANCELED":
      return (
        <CircleIcon className="h-5 w-5 fill-red-500 text-red-500">
          Cancelado
        </CircleIcon>
      );
    case "DONE":
      return (
        <CircleIcon className="h-5 w-5 fill-green-500 text-green-500">
          Finalizado
        </CircleIcon>
      );
    default:
      return (
        <CircleIcon className="h-5 w-5 fill-gray-400 text-gray-400">
          Finalizado
        </CircleIcon>
      );
  }
};

const RecentSchedules = async () => {
  const recentSchedules = (await listSchedules({
    include: {
      client: true,
      scheduleServices: {
        include: {
          service: true,
        },
      },
      vehicle: true,
    },
    take: 5,
  })) as ScheduleAll[];

  return (
    <div className="space-y-8">
      {recentSchedules.map((schedule, index) => (
        <div key={index} className="flex items-center">
          <div className="ml-4 space-y-1">
            <div className="flex items-center space-x-2">
              <ScheduleStatusCircle status={schedule.status} />
              <p className="text-sm font-medium capitalize leading-none">
                {schedule.vehicle.brand} {schedule.vehicle.model}{" "}
                {schedule.vehicle.color}
              </p>
            </div>
            <p className="truncate text-sm text-muted-foreground">
              {schedule.scheduleServices.map((service) => service.service.name)}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {currencyFormat(
              Number(
                schedule.scheduleServices.reduce(
                  (acc, service) => acc + Number(service.value),
                  0,
                ),
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSchedules;
