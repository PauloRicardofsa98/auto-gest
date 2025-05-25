"use client";

import { CategoryProduct } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import AlertDelete from "@/app/_components/alert-delete";

import { deleteCategoryProduct } from "../_actions/delete-category-product";

interface CategoryProductRowActionProps {
  categoryProduct: CategoryProduct;
}

const CategoryProductRowActions = ({
  categoryProduct,
}: CategoryProductRowActionProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteCategoryProductPromise = deleteCategoryProduct(
      categoryProduct.uuid,
    );
    toast.promise(deleteCategoryProductPromise, {
      loading: "Deletando categoria...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        return "Categoria deletada com sucesso!";
      },
      error: (error) => error.message,
    });
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="categoria"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/category-product/${categoryProduct.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
};

export default CategoryProductRowActions;
