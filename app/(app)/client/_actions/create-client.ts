"use server";
import { auth } from "@clerk/nextjs/server";
import { Client, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const createClient = async (
  customerParams: Prisma.ClientCreateInput,
): Promise<Client | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const client = await db.client.create({ data: customerParams });
    revalidatePath("/client");
    return client;
  } catch (error) {
    console.error(error);
    return "erro ao criar o cliente";
  }
};
