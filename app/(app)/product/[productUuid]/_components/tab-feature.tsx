import { Product } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import FormProduct from "../../_components/product-form";

interface TabProductSuppliersProps {
  product?: Product;
}

const TabProductSuppliers = async ({ product }: TabProductSuppliersProps) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{product ? "Editar" : "Cadastrar"} produto</CardTitle>
        <CardDescription>Administre os dados do produto</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProduct product={product} />
      </CardContent>
    </Card>
  );
};

export default TabProductSuppliers;
