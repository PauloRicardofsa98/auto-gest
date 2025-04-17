import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listClients } from "@/app/_data/client";
import { listServices } from "@/app/_data/service";
import { getPeriod } from "@/app/_utils/helper";

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
    <Card className="min-h-full max-w-sm lg:max-w-full">
      <CardHeader className="flex-col justify-between lg:flex-row">
        <div>
          <CardTitle>Agendamentos</CardTitle>
        </div>
        {/* <ManagerSchedule clients={clients} services={services} /> */}
        <Button asChild>
          <Link href="/schedule/new">Novo Agendamento</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <ScheduleCore clients={clients} services={services} />
      </CardContent>
    </Card>
  );
};

export default SchedulePage;
