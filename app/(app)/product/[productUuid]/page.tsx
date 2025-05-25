import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { getProduct } from "@/app/_data/product";

import TabFeature from "./_components/tab-feature";
import TabProductSuppliers from "./_components/tab-suppliers";

const ManagerProductPage = async ({
  params,
}: {
  params: Promise<{ productUuid: string }>;
}) => {
  const { productUuid } = await params;
  const product = await getProduct({ uuid: productUuid });

  return (
    <Tabs defaultValue="feature" className="full">
      <TabsList>
        <TabsTrigger value="feature">Características</TabsTrigger>
        <TabsTrigger value="suppliers" disabled={!product}>
          Fornecedores
        </TabsTrigger>
      </TabsList>
      <TabsContent value="feature">
        <TabFeature product={product ? product : undefined} />
      </TabsContent>
      <TabsContent value="suppliers">
        <TabProductSuppliers product={product!} />
      </TabsContent>
    </Tabs>
  );
};

export default ManagerProductPage;
