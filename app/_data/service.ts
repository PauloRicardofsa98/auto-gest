"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listServices = async (where?: Prisma.ServiceWhereInput) => {
  const services = await db.service.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
  return JSON.parse(JSON.stringify(services));
};

export const getService = async (where?: Prisma.ServiceWhereInput) => {
  const service = await db.service.findFirst({ where });
  return JSON.parse(JSON.stringify(service));
};
