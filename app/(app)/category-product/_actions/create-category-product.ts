"use server";
import { auth } from "@clerk/nextjs/server";
import { CategoryProduct, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const createCategoryProduct = async (
  categoryProductParams: Prisma.CategoryProductCreateInput,
): Promise<CategoryProduct | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const categoryProduct = await db.categoryProduct.create({
      data: categoryProductParams,
    });
    revalidatePath("/category-product");
    return categoryProduct;
  } catch (error) {
    console.error(error);
    return "erro ao criar a categoria";
  }
};
