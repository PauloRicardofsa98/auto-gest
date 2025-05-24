"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listProductSuppliers = async ({
  where,
  include,
}: {
  where?: Prisma.ProductSupplierWhereInput;
  include?: Prisma.ProductSupplierInclude;
}) => {
  const productSuppliers = await db.productSupplier.findMany({
    where,
    include,
    orderBy: {
      updatedAt: "desc",
    },
  });
  return JSON.parse(JSON.stringify(productSuppliers));
};

export const getProductSupplier = async ({
  where,
  include,
}: {
  where?: Prisma.ProductSupplierWhereInput;
  include?: Prisma.ProductSupplierInclude;
}) => {
  const productSupplier = await db.productSupplier.findFirst({
    where,
    include,
  });
  return JSON.parse(JSON.stringify(productSupplier));
};
