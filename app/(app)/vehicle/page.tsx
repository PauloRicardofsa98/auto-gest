import Link from "next/link";

import DataTable from "@/app/_components/table/data-table";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listVehicles } from "@/app/_data/vehicle";

import { vehicleColumns } from "./_components/vehicle-columns";

const VehiclePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ vehicleUuid: string }>;
}) => {
  const { vehicleUuid } = await searchParams;

  const vehicles = await listVehicles({
    where: {
      uuid: vehicleUuid,
    },
    include: {
      client: true,
    },
  });

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Veículos</CardTitle>
          <CardDescription>Gerenciamento dos veículos</CardDescription>
        </div>
        <Button asChild>
          <Link href="/vehicle/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={vehicleColumns}
          data={vehicles}
          filterInput={{ name: "name", title: "Nome" }}
        />
      </CardContent>
    </Card>
  );
};

export default VehiclePage;
