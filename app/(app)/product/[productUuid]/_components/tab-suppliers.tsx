import { Product } from "@prisma/client";

import { DataTable } from "@/app/_components/table/data-table";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { listProductSuppliers } from "@/app/_data/product-supplier";

import ManagerProductSupplier from "./manager-product-supplier";
import { productSupplierColumns } from "./product-supplier-columns";

interface TabProductSuppliersProps {
  product: Product;
}

const TabProductSuppliers = async ({ product }: TabProductSuppliersProps) => {
  const productSupplier = await listProductSuppliers({
    where: {
      productUuid: product.uuid,
    },
    include: {
      supplier: true,
      product: true,
    },
  });

  return (
    <Card className="bg-white">
      <CardHeader className="flex-row justify-between">
        <CardTitle>Fornecedores</CardTitle>
        <ManagerProductSupplier product={product}>
          <Button>Adicionar</Button>
        </ManagerProductSupplier>
      </CardHeader>
      <CardContent>
        <DataTable columns={productSupplierColumns} data={productSupplier} />
      </CardContent>
    </Card>
  );
};

export default TabProductSuppliers;
