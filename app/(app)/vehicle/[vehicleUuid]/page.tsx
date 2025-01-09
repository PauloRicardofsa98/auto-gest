import { getVehicle } from "@/app/_data/vehicle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { FormVehicle } from "../../vehicle/_components/vehicle-form";
import { listClients } from "@/app/_data/client";

const ManagerVehicle = async ({
  params,
}: {
  params: Promise<{ vehicleUuid: string }>;
}) => {
  const { vehicleUuid } = await params;
  const [vehicle, clients] = await Promise.all([
    getVehicle({ where: { uuid: vehicleUuid } }),
    listClients(),
  ]);

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{vehicle ? "Editar" : "Cadastrar"} veiculo</CardTitle>
        <CardDescription>Administre os dados do veiculo</CardDescription>
      </CardHeader>
      <CardContent>
        <FormVehicle vehicle={vehicle} clients={clients} />
      </CardContent>
    </Card>
  );
};

export default ManagerVehicle;
