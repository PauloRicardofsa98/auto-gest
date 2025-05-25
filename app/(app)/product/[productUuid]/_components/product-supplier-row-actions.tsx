"use client";

import { Prisma } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import AlertDelete from "@/app/_components/alert-delete";

import { deleteProductSupplier } from "../_actions/delete-product-supplier";
import ManagerProductSupplier from "./manager-product-supplier";

type ProductSupplierAll = Prisma.ProductSupplierGetPayload<{
  include: { supplier: true; product: true };
}>;
interface ProductSupplierRowActionProps {
  productSupplier: ProductSupplierAll;
}

const ProductSupplierRowActions = ({
  productSupplier,
}: ProductSupplierRowActionProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteProductPromise = deleteProductSupplier(productSupplier.uuid);
    toast.promise(deleteProductPromise, {
      loading: "Deletando...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        return "Fornecedor deletado com sucesso";
      },
      error: (error) => error.message,
    });
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="Fornecedor do produto"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <ManagerProductSupplier
          product={productSupplier.product}
          productSupplier={productSupplier}
        >
          <PencilIcon className="cursor-pointer" />
        </ManagerProductSupplier>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
};

export default ProductSupplierRowActions;
