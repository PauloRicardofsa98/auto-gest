"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const deleteCategoryProduct = async (uuid: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const categoryProduct = await db.categoryProduct.delete({
      where: { uuid },
    });
    revalidatePath("/category-product");
    return categoryProduct;
  } catch (error) {
    console.error(error);
    return "erro ao excluir a categoria";
  }
};
