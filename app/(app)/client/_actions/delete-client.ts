"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const deleteClient = async (uuid: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const client = await db.client.delete({ where: { uuid } });
    revalidatePath("/client");
    return client;
  } catch (error) {
    console.error(error);
    return "erro ao excluir o cliente";
  }
};
