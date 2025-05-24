"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listProducts = async (where?: Prisma.ProductWhereInput) => {
  return await db.product.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getProduct = async (where?: Prisma.ProductWhereInput) => {
  const product = await db.product.findFirst({ where });
  return JSON.parse(JSON.stringify(product));
};
