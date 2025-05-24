"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listSuppliers = async (where?: Prisma.SupplierWhereInput) => {
  return await db.supplier.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getSupplier = async (where?: Prisma.SupplierWhereInput) => {
  return await db.supplier.findFirst({ where });
};
