"use server";
import { auth } from "@clerk/nextjs/server";
import { Employer, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const updateEmployer = async (
  uuid: string,
  customerParams: Prisma.EmployerUpdateInput,
): Promise<Employer | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const employer = await db.employer.update({
      where: { uuid },
      data: customerParams,
    });
    revalidatePath("/employer");
    return employer;
  } catch (error) {
    console.error(error);
    return "erro ao atualizar o serviço";
  }
};
