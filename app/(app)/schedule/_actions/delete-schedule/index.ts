"use server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

export const deleteSchedule = async (uuid: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const deleteSchedule = await db.schedule.delete({
      where: { uuid },
    });
    revalidatePath(`/schedule`);
    return deleteSchedule;
  } catch (error) {
    console.error(error);
    return "erro ao excluir o agendamento";
  }
};
