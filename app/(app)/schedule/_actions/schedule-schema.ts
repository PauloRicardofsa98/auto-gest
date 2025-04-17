import { Brand, ScheduleStatus } from "@prisma/client";
import { z } from "zod";

export const scheduleSchema = z.object({
  plate: z
    .string({
      required_error: "Placa é obrigatória",
    })
    .min(1, { message: "Placa é obrigatória" }),
  model: z
    .string({
      required_error: "O modelo é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
  brand: z.nativeEnum(Brand, {
    required_error: "A marca é obrigatória",
  }),
  year: z
    .string({
      required_error: "O ano é obrigatório",
    })
    .optional(),
  color: z
    .string({
      required_error: "A cor é obrigatória",
    })
    .optional(),
  clientUuid: z.string(),
  services: z
    .array(
      z.object({
        serviceUuid: z.string(),
        value: z.number(),
      }),
    )
    .optional(),
  status: z.nativeEnum(ScheduleStatus).optional(),
  employerUuid: z.string().optional(),
  date: z.date({
    required_error: "A data é obrigatória",
  }),
});

export const updateScheduleSchema = scheduleSchema.partial();

export type ScheduleProps = z.infer<typeof scheduleSchema>;
export type UpdateScheduleProps = z.infer<typeof updateScheduleSchema>;
