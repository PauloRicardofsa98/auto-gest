import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { getEmployer } from "@/app/_data/employer";

import FormEmployer from "../../employer/_components/employer-form";

const ManagerEmployerPage = async ({
  params,
}: {
  params: Promise<{ employerUuid: string }>;
}) => {
  const { employerUuid } = await params;
  const employer = await getEmployer({ uuid: employerUuid });

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{employer ? "Editar" : "Cadastrar"} funcionário</CardTitle>
        <CardDescription>Administre os dados do funcionário</CardDescription>
      </CardHeader>
      <CardContent>
        <FormEmployer employer={employer} />
      </CardContent>
    </Card>
  );
};

export default ManagerEmployerPage;
