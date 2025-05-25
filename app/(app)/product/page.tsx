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
import { listProducts } from "@/app/_data/product";

import { productColumns } from "./_components/product-columns";

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ productUuid: string }>;
}) => {
  const { productUuid } = await searchParams;

  const products = await listProducts({
    uuid: productUuid,
  });

  return (
    <Card className="max-w-sm lg:max-w-full">
      <CardHeader className="flex-row justify-between">
        <div>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>Gerenciamento dos produtos</CardDescription>
        </div>
        <Button asChild>
          <Link href="/product/new">Cadastrar</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <DataTable
          columns={productColumns}
          data={JSON.parse(JSON.stringify(products))}
          filterInput={{ name: "name", title: "Nome" }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductPage;
