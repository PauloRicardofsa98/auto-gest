import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { getClient } from "@/app/_data/client";

import { FormClient } from "../_components/client-form";

const ManagerClient = async ({
  params,
}: {
  params: Promise<{ clientUuid: string }>;
}) => {
  const { clientUuid } = await params;
  const client = await getClient({ uuid: clientUuid });

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{client ? "Editar" : "Cadastrar"} cliente</CardTitle>
        <CardDescription>Administre os dados do cliente</CardDescription>
        <CardContent>
          <FormClient client={client} />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ManagerClient;
