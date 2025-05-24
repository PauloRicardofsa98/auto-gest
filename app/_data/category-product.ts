"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listCategoryProducts = async (
  where?: Prisma.CategoryProductWhereInput,
) => {
  return await db.categoryProduct.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getCategoryProduct = async (
  where?: Prisma.CategoryProductWhereInput,
) => {
  return await db.categoryProduct.findFirst({ where });
};
