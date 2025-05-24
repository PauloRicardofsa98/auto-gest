"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma, Product, ProductSupplier, Supplier } from "@prisma/client";
import { PlusIcon, UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ComboboxInput } from "@/app/_components/inputs/input-combobox";
import { InputPrice } from "@/app/_components/inputs/input-price";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { listSuppliers } from "@/app/_data/supplier";
import usePromiseToast from "@/app/_hooks/toast-promise";

import { createProductSupplier } from "../_actions/create-product-supplier";
import {
  ProductSupplierProps,
  productSupplierSchema,
} from "../_actions/product-supplier-schema";
import { updateProductSupplier } from "../_actions/update-product-supplier";

interface ManagerProductSupplierProps {
  product: Product;
  productSupplier?: ProductSupplier;
  children: React.ReactNode;
}
const ManagerProductSupplier = ({
  product,
  productSupplier,
  children,
}: ManagerProductSupplierProps) => {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const toastPromise = usePromiseToast();

  useEffect(() => {
    const loadSuppliers = async () => {
      const data = await listSuppliers();
      setSuppliers(data);
    };
    loadSuppliers();
  }, []);

  const form = useForm<ProductSupplierProps>({
    resolver: zodResolver(productSupplierSchema),
    defaultValues: {
      supplierUuid: productSupplier?.supplierUuid || "",
      costPrice: productSupplier?.costPrice.toString() || "0",
    },
  });

  async function onSubmit(data: ProductSupplierProps) {
    const dataFormatted: Prisma.ProductSupplierCreateInput = {
      costPrice: Number(data.costPrice.replace("R$", "").replace(",", ".")),
      product: {
        connect: {
          uuid: product.uuid,
        },
      },
      supplier: {
        connect: {
          uuid: data.supplierUuid,
        },
      },
    };

    if (productSupplier) {
      const { uuid } = productSupplier;
      const update = updateProductSupplier(uuid, dataFormatted).then(
        (response) => {
          if (typeof response !== "string") {
            form.reset();
            setOpen(false);
          }
          return response;
        },
      );
      toastPromise.promise(update, "update");
    } else {
      const create = createProductSupplier(dataFormatted, product.uuid).then(
        (response) => {
          if (typeof response !== "string") {
            form.reset();
            setOpen(false);
          }
          return response;
        },
      );
      toastPromise.promise(create, "create");
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicione um fornecedor</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <ComboboxInput
                control={form.control}
                form={form}
                description="Fornecedor"
                name="supplierUuid"
                options={suppliers.map((supplier) => ({
                  uuid: supplier.uuid,
                  name: supplier.name,
                }))}
              />

              <InputPrice
                control={form.control}
                description="Preço de compra"
                name="costPrice"
              />
            </div>

            <div className="flex w-full items-center justify-end gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex gap-2">
                {productSupplier ? (
                  <>
                    <UploadIcon />
                    Atualizar
                  </>
                ) : (
                  <>
                    <PlusIcon />
                    Adicionar
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ManagerProductSupplier;
