"use server";
import { auth } from "@clerk/nextjs/server";
import { Prisma, Vehicle } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const createVehicle = async (
  customerParams: Prisma.VehicleCreateInput,
): Promise<Vehicle | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const vehicle = await db.vehicle.create({ data: customerParams });
    revalidatePath("/vehicle");
    return vehicle;
  } catch (error) {
    console.error(error);
    return "erro ao criar o serviço";
  }
};
