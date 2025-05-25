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
import { listEmployers } from "@/app/_data/employer";

import { employerColumns } from "./_components/employer-columns";

const EmployerPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ employerUuid: string }>;
}) => {
  const { employerUuid } = await searchParams;

  const employers = await listEmployers({
    uuid: employerUuid,
  });

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Funcionários</CardTitle>
          <CardDescription>Gerenciamento dos funcionários</CardDescription>
        </div>
        <Button asChild>
          <Link href="/employer/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={employerColumns}
          data={employers}
          filterInput={{ name: "name", title: "Nome" }}
        />
      </CardContent>
    </Card>
  );
};

export default EmployerPage;
