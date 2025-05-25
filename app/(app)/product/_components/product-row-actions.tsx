"use client";

import { Product } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import AlertDelete from "@/app/_components/alert-delete";

import { deleteProduct } from "../_actions/delete-product";

interface ProductRowActionProps {
  product: Product;
}

const ProductRowActions = ({ product }: ProductRowActionProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteProductPromise = deleteProduct(product.uuid);
    toast.promise(deleteProductPromise, {
      loading: "Deletando...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        return "Produto deletado com sucesso";
      },
      error: (error) => error.message,
    });
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="produto"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/product/${product.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
};

export default ProductRowActions;
