import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { getCategoryProduct } from "@/app/_data/category-product";

import FormCategoryProduct from "../_components/category-product-form";

const ManagerCategoryProductPage = async ({
  params,
}: {
  params: Promise<{ categoryProductUuid: string }>;
}) => {
  const { categoryProductUuid } = await params;
  const categoryProduct = await getCategoryProduct({
    uuid: categoryProductUuid,
  });

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>
          {categoryProduct ? "Editar" : "Cadastrar"} categoria de produto
        </CardTitle>
        <CardDescription>Administre os dados da categoria</CardDescription>
        <CardContent>
          <FormCategoryProduct categoryProduct={categoryProduct} />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default ManagerCategoryProductPage;
