"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryProduct } from "@prisma/client";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputField from "@/app/_components/inputs/input-field";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";

import {
  CategoryProductProps,
  categoryProductSchema,
} from "../_actions/category-product-schema";
import { createCategoryProduct } from "../_actions/create-category-product";
import { updateCategoryProduct } from "../_actions/update-category-product";

interface FormProps {
  categoryProduct: CategoryProduct | null;
}

const FormCategoryProduct = ({ categoryProduct }: FormProps) => {
  const router = useRouter();

  const form = useForm<CategoryProductProps>({
    resolver: zodResolver(categoryProductSchema),
    defaultValues: {
      name: categoryProduct?.name || "",
    },
  });

  async function onSubmit(data: CategoryProductProps) {
    const promise = categoryProduct
      ? updateCategoryProduct(categoryProduct.uuid, data)
      : createCategoryProduct(data);

    toast.promise(promise, {
      loading: categoryProduct
        ? "Atualizando categoria..."
        : "Criando categoria...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        router.push("/category-product");
        form.reset();
        return categoryProduct
          ? "Categoria atualizada com sucesso!"
          : "Categoria criada com sucesso!";
      },
      error: (error) => error.message,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <InputField control={form.control} description="Nome" name="name" />
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex gap-2">
            {categoryProduct ? (
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

export default FormCategoryProduct;
