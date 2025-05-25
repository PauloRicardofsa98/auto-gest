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
import { listCategoryProducts } from "@/app/_data/category-product";

import { categoryProductColumns } from "./_components/category-product-columns";

const CategoryProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ categoryProductUuid: string }>;
}) => {
  const { categoryProductUuid } = await searchParams;
  const categories = await listCategoryProducts({
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
        />
      </CardContent>
    </Card>
  );
};

export default CategoryProductPage;
