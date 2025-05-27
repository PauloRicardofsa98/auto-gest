"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const deleteProductSupplier = async (uuid: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const productSupplier = await db.productSupplier.delete({
      where: { uuid },
    });
    revalidatePath(`/product/${uuid}`);
    return productSupplier;
  } catch (error) {
    console.error(error);
    return "erro ao excluir o fornecedor do produto";
  }
};
