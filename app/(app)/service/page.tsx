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
import { listServices } from "@/app/_data/service";
import { getPeriod } from "@/app/_utils/helper";

import { serviceColumns } from "./_components/service-columns";

const ServicePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string; serviceUuid: string }>;
}) => {
  const { serviceUuid, period } = await searchParams;

  const filterPeriod = getPeriod(period);

  const services = await listServices({
    AND: filterPeriod,
    uuid: serviceUuid,
  });

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Serviços</CardTitle>
          <CardDescription>Gerenciamento dos serviços</CardDescription>
        </div>
        <Button asChild>
          <Link href="/service/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={serviceColumns}
          data={services}
          filterInput={{ name: "name", title: "Nome" }}
          pageFilterPeriod="service"
        />
      </CardContent>
    </Card>
  );
};

export default ServicePage;
