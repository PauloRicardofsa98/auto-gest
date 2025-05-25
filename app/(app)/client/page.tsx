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
import { listClients } from "@/app/_data/client";

import { clientColumns } from "./_components/client-columns";

const ClientPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ clientUuid: string }>;
}) => {
  const { clientUuid } = await searchParams;

  const clients = await listClients({
    uuid: clientUuid,
  });

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Clientes</CardTitle>
          <CardDescription>Gerenciamento dos clientes</CardDescription>
        </div>
        <Button asChild>
          <Link href="/client/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={clientColumns}
          data={clients}
          filterInput={{ name: "name", title: "Nome ou cpf/cnpj" }}
        />
      </CardContent>
    </Card>
  );
};

export default ClientPage;
