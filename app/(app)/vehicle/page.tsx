import Link from "next/link";

import { DataTable } from "@/app/_components/table/data-table";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listVehicles } from "@/app/_data/vehicle";
import { getPeriod } from "@/app/_utils/helper";

import { vehicleColumns } from "./_components/vehicle-columns";

const VehiclePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string; vehicleUuid: string }>;
}) => {
  const { vehicleUuid, period } = await searchParams;

  const filterPeriod = getPeriod(period);

  const vehicles = await listVehicles({
    where: {
      AND: filterPeriod,
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
          pageFilterPeriod="vehicle"
        />
      </CardContent>
    </Card>
  );
};

export default VehiclePage;
