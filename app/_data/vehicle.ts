"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listVehicles = async ({
  where,
  include,
}: {
  where?: Prisma.VehicleWhereInput;
  include?: Prisma.VehicleInclude;
}) => {
  const vehicles = await db.vehicle.findMany({
    where,
    include,
    orderBy: {
      updatedAt: "desc",
    },
  });
  return JSON.parse(JSON.stringify(vehicles));
};

export const getVehicle = async ({
  where,
  include,
}: {
  where: Prisma.VehicleWhereInput;
  include?: Prisma.VehicleInclude;
}) => {
  const vehicle = await db.vehicle.findFirst({ where, include });

  return vehicle ? JSON.parse(JSON.stringify(vehicle)) : undefined;
};
