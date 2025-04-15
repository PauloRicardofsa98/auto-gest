import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { getService } from "@/app/_data/service";

import { FormService } from "../../service/_components/service-form";

const ManagerService = async ({
  params,
}: {
  params: Promise<{ serviceUuid: string }>;
}) => {
  const { serviceUuid } = await params;
  const service = await getService({ uuid: serviceUuid });

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{service ? "Editar" : "Cadastrar"} serviço</CardTitle>
        <CardDescription>Administre os dados do serviço</CardDescription>
      </CardHeader>
      <CardContent>
        <FormService service={service} />
      </CardContent>
    </Card>
  );
};

export default ManagerService;
