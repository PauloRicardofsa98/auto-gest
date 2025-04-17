import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listClients } from "@/app/_data/client";
import { listServices } from "@/app/_data/service";
import { getPeriod } from "@/app/_utils/helper";

import ManagerSchedule from "./_components/manager-schedule";
import ScheduleCore from "./_components/schedule-core";

const SchedulePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string }>;
}) => {
  const { period } = await searchParams;

  const filterPeriod = getPeriod(period);
  console.log(filterPeriod);
  const [clients, services] = await Promise.all([
    listClients(),
    listServices(),
  ]);

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-col justify-between lg:flex-row">
        <div>
          <CardTitle>Agendamentos</CardTitle>
        </div>
        <ManagerSchedule clients={clients} services={services} />
      </CardHeader>

      <CardContent>
        <ScheduleCore clients={clients} services={services} />
      </CardContent>
    </Card>
  );
};

export default SchedulePage;
