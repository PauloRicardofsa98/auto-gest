"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const deleteVehicle = async (uuid: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const vehicle = await db.vehicle.delete({ where: { uuid } });
    revalidatePath("/vehicle");
    return vehicle;
  } catch (error) {
    console.error(error);
    return "erro ao excluir o serviço";
  }
};
