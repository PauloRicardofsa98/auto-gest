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
import { listServices } from "@/app/_data/service";

import { serviceColumns } from "./_components/service-columns";

const ServicePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ serviceUuid: string }>;
}) => {
  const { serviceUuid } = await searchParams;

  const services = await listServices({
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
        />
      </CardContent>
    </Card>
  );
};

export default ServicePage;
