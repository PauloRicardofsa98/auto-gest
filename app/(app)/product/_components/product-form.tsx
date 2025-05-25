"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Product, Unit } from "@prisma/client";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputCombobox from "@/app/_components/inputs/input-combobox";
import InputField from "@/app/_components/inputs/input-field";
import InputPrice from "@/app/_components/inputs/input-price";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";

import { createProduct } from "../_actions/create-product";
import { ProductProps, productSchema } from "../_actions/product-schema";
import { updateProduct } from "../_actions/update-product";

interface FormProps {
  product?: Product;
}

const FormProduct = ({ product }: FormProps) => {
  const router = useRouter();

  const form = useForm<ProductProps>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      maximumStock: product?.maximumStock || 0,
      minimumStock: product?.minimumStock || 0,
      stock: product?.stock || 0,
      unit: product?.unit || "UN",
      sku: product?.sku || "",
      price: product?.price.toString() || "0",
      barcode: product?.barcode || "",
    },
  });

  async function onSubmit(data: ProductProps) {
    const dataFormatted = {
      name: data.name,
      maximumStock: data.maximumStock,
      minimumStock: data.minimumStock,
      stock: data.stock,
      unit: data.unit,
      sku: data.sku,
      price: Number(data.price.replace("R$", "").replace(",", ".")),
      barcode: data.barcode,
    };

    const promise = product
      ? updateProduct(product.uuid, dataFormatted)
      : createProduct(dataFormatted);

    toast.promise(promise, {
      loading: product ? "Atualizando..." : "Criando...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        router.push("/product");
        form.reset();
        return product
          ? "Produto atualizado com sucesso"
          : "Produto criado com sucesso";
      },
      error: (error) => error.message,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <InputField control={form.control} description="Nome" name="name" />
          <InputField
            control={form.control}
            name="sku"
            description="Sku"
            type="number"
          />
          <InputField
            control={form.control}
            name="barcode"
            description="Código de barras"
            type="number"
          />
          <InputPrice control={form.control} description="Preço" name="price" />
          <InputCombobox
            control={form.control}
            form={form}
            description="Unidade"
            name="unit"
            options={Object.values(Unit).map((unit) => ({
              uuid: unit,
              name: unit,
            }))}
          />
          <InputField
            control={form.control}
            description="Estoque mínimo"
            name="minimumStock"
            type="number"
          />
          <InputField
            control={form.control}
            description="Estoque máximo"
            name="maximumStock"
            type="number"
          />
          <InputField
            control={form.control}
            description="Estoque"
            name="stock"
            type="number"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => router.back()}
          >
            Cancelar/Voltar
          </Button>
          <Button type="submit" className="flex gap-2">
            {product ? (
              <>
                <Upload />
                Atualizar
              </>
            ) : (
              <>
                <Plus />
                Adicionar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormProduct;
