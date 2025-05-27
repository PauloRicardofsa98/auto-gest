"use server";
import { auth } from "@clerk/nextjs/server";
import { Prisma, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const createProduct = async (
  customerParams: Prisma.ProductCreateInput,
): Promise<Product | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const product = await db.product.create({ data: customerParams });
    revalidatePath("/product");
    return product;
  } catch (error) {
    console.error(error);
    return "erro ao criar o produto";
  }
};
