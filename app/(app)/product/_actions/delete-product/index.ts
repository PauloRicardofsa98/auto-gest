"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const deleteProduct = async (uuid: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const product = await db.product.delete({ where: { uuid } });
    revalidatePath("/product");
    return product;
  } catch (error) {
    console.error(error);
    return "erro ao excluir o produto";
  }
};
