import { z } from "zod";

import { validateCpfCnpj } from "@/app/_utils/validations";

export const createClientSchema = z.object({
  name: z
    .string({
      required_error: "O nome é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),

  cpfCnpj: z
    .string()
    .optional()
    .refine((value) => (value ? validateCpfCnpj(value) : true), {
      message: "CPF/CNPJ inválido",
    }),
  phone: z
    .string({
      required_error: "O contato é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
  email: z
    .string({
      required_error: "O email é obrigatório",
    })
    .email({
      message: "Email inválido",
    })
    .min(1, "Este campo é obrigatório"),
  address: z
    .string({
      required_error: "O endereço é obrigatório",
    })
    .min(1, "Este campo é obrigatório"),
  observations: z
    .string({
      invalid_type_error: "Observation must be a string",
    })
    .default(""),
});

export const updateClientSchema = createClientSchema.partial();

export type CreateClientProps = z.infer<typeof createClientSchema>;
export type UpdateClientProps = z.infer<typeof updateClientSchema>;
