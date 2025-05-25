"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Employer, Prisma } from "@prisma/client";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputCpfCnpj from "@/app/_components/inputs/input-cpf-cnpj";
import InputField from "@/app/_components/inputs/input-field";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { maskCpfCnpj, removeMask } from "@/app/_utils/helper";

import { createEmployer } from "../_actions/create-employer";
import { EmployerProps, employerSchema } from "../_actions/employer-schema";
import { updateEmployer } from "../_actions/update-employer";

interface FormProps {
  employer?: Employer;
}

const FormEmployer = ({ employer }: FormProps) => {
  const router = useRouter();

  const form = useForm<EmployerProps>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      name: employer?.name || "",
      address: employer?.address || "",
      cpf: employer ? maskCpfCnpj(employer.cpf) : "",
      phone: employer?.phone || "",
      email: employer?.email || "",
    },
  });

  async function onSubmit(data: EmployerProps) {
    const dataFormatted: Prisma.EmployerCreateInput = {
      name: data.name,
      cpf: removeMask(data.cpf),
      address: data.address,
      phone: data.phone,
      email: data.email,
    };

    const promise = employer
      ? updateEmployer(employer.uuid, dataFormatted)
      : createEmployer(dataFormatted);

    toast.promise(promise, {
      loading: employer ? "Atualizando..." : "Criando...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        router.push("/employer");
        form.reset();
        return employer
          ? "Fornecedor atualizado com sucesso"
          : "Fornecedor criado com sucesso";
      },
      error: (error) => error.message,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <InputField control={form.control} name="name" description="Nome" />
          <InputCpfCnpj control={form.control} name="cpf" />
          <InputField
            control={form.control}
            description="Email"
            name="email"
            type="email"
          />
          <InputField
            control={form.control}
            description="Contato"
            name="phone"
            format="(##) #####-####"
          />
          <InputField
            control={form.control}
            description="Endereço"
            name="address"
            className="col-span-4"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => router.back()}
          >
            Cancelar/Voltar
          </Button>
          <Button type="submit" className="flex gap-2">
            {employer ? (
              <>
                <Upload />
                Atualizar
              </>
            ) : (
              <>
                <Plus />
                Adicionar
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormEmployer;
