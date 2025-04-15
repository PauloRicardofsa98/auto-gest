"use server";
import { auth } from "@clerk/nextjs/server";
import { Schedule } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/app/_lib/prisma";

import { ScheduleProps } from "../schedule-schema";

export const createSchedule = async (
  scheduleParams: ScheduleProps,
): Promise<Schedule | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  let vehicle = await db.vehicle.findFirst({
    where: {
      plate: scheduleParams.plate,
    },
  });

  if (!vehicle) {
    vehicle = await db.vehicle.create({
      data: {
        model: scheduleParams.model,
        plate: scheduleParams.plate,
        brand: scheduleParams.brand,
        year: Number(scheduleParams.year),
        color: scheduleParams.color,
        clientUuid: scheduleParams.clientUuid,
      },
    });
  }

  try {
    const schedule = await db.schedule.create({
      data: {
        status: "PENDING",
        clientUuid: scheduleParams.clientUuid,
        vehicleUuid: vehicle.uuid,
        serviceUuid: scheduleParams.serviceUuid,
        date: scheduleParams.date,
      },
    });
    revalidatePath(`/schedule`);
    return schedule;
  } catch (error) {
    console.error(error);
    return "erro ao criar o agendamento";
  }
};
