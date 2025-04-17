"use server";
import { auth } from "@clerk/nextjs/server";
import { Schedule } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

import { UpdateScheduleProps } from "../schedule-schema";

export const updateSchedule = async (
  uuid: string,
  scheduleParams: UpdateScheduleProps,
): Promise<Schedule | string> => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const schedule = await db.$transaction(async (tx) => {
      // Primeiro, encontra o veículo pelo plate
      const existingVehicle = await tx.vehicle.findFirst({
        where: {
          plate: scheduleParams.plate,
        },
      });

      if (!existingVehicle) {
        throw new Error("Veículo não encontrado");
      }

      // Atualiza o veículo
      await tx.vehicle.update({
        where: {
          uuid: existingVehicle.uuid,
        },
        data: {
          model: scheduleParams.model,
          brand: scheduleParams.brand,
          year: Number(scheduleParams.year),
          color: scheduleParams.color,
          clientUuid: scheduleParams.clientUuid,
        },
      });

      // Deleta os serviços existentes se houver novos serviços
      if (scheduleParams.services && scheduleParams.services.length > 0) {
        await tx.scheduleService.deleteMany({
          where: {
            scheduleUuid: uuid,
          },
        });
      }

      // Atualiza o agendamento
      const { services, ...rest } = scheduleParams;
      const updatedSchedule = await tx.schedule.update({
        where: { uuid },
        data: {
          date: rest.date,
          scheduleServices: {
            create: services?.map((service) => ({
              serviceUuid: service.serviceUuid,
              value: service.value,
            })),
          },
        },
      });

      return updatedSchedule;
    });
    return schedule;
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Erro desconhecido");
    return "erro ao atualizar o agendamento";
  }
};
