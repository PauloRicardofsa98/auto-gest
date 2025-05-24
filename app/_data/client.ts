"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listClients = async (where?: Prisma.ClientWhereInput) => {
  return await db.client.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
};

export const getClient = async (where?: Prisma.ClientWhereInput) => {
  return await db.client.findFirst({ where });
};
