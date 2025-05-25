import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listClients } from "@/app/_data/client";
import { getSchedule } from "@/app/_data/schedule";
import { listServices } from "@/app/_data/service";

import FormSchedule from "../_components/schedule-form";

const ManagerSchedulePage = async ({
  params,
}: {
  params: Promise<{ scheduleUuid: string }>;
}) => {
  const { scheduleUuid } = await params;
  const schedulePromise = await getSchedule({
    where: {
      uuid: scheduleUuid,
    },
    include: {
      scheduleServices: {
        include: {
          service: true,
        },
      },
      client: true,
      vehicle: true,
      employer: true,
    },
  });

  const [schedule, clients, services] = await Promise.all([
    schedulePromise,
    listClients(),
    listServices(),
  ]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>
          {schedule ? "Editar agendamento" : "Novo agendamento"}
        </CardTitle>
        <CardDescription>
          Digite os dados do agendamento e clique em adicionar
        </CardDescription>
        <CardContent>
          <FormSchedule
            clients={clients}
            services={services}
            schedule={schedule}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ManagerSchedulePage;
