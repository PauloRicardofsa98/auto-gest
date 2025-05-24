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
import { listCategoryProducts } from "@/app/_data/category-product";
import { getPeriod } from "@/app/_utils/helper";

import { categoryProductColumns } from "./_components/category-product-columns";

const CategoryProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ period: string; categoryProductUuid: string }>;
}) => {
  const { categoryProductUuid, period } = await searchParams;

  const filterPeriod = getPeriod(period);

  const categories = await listCategoryProducts({
    AND: filterPeriod,
    uuid: categoryProductUuid,
  });

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Categorias de produtos</CardTitle>
          <CardDescription>Gerenciamento da categorias</CardDescription>
        </div>
        <Button asChild>
          <Link href="/category-product/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={categoryProductColumns}
          data={categories}
          filterInput={{ name: "name", title: "Nome" }}
          pageFilterPeriod="category-product"
        />
      </CardContent>
    </Card>
  );
};

export default CategoryProductPage;
