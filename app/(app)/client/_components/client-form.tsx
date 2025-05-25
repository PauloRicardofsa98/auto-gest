"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputCpfCnpj from "@/app/_components/inputs/input-cpf-cnpj";
import InputField from "@/app/_components/inputs/input-field";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { maskCpfCnpj, removeMask } from "@/app/_utils/helper";

import { createClientSchema } from "../_actions/client-schema";
import { CreateClientProps } from "../_actions/client-schema";
import { createClient } from "../_actions/create-client";
import { updateClient } from "../_actions/update-client";

interface FormProps {
  client: Client | null;
}

const FormClient = ({ client }: FormProps) => {
  const router = useRouter();

  const form = useForm<CreateClientProps>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: client?.name || "",
      address: client?.address || "",
      cpfCnpj: client?.cpfCnpj ? maskCpfCnpj(client.cpfCnpj) : "",
      email: client?.email || "",
      observations: client?.observations || "",
      phone: client?.phone || "",
    },
  });

  async function onSubmit(data: CreateClientProps) {
    const dataFormatted: CreateClientProps = {
      name: data.name,
      cpfCnpj: data.cpfCnpj ? removeMask(data.cpfCnpj) : "",
      phone: data.phone,
      email: data.email,
      address: data.address,
      observations: data.observations,
    };

    const promise = client
      ? updateClient(client.uuid, dataFormatted)
      : createClient(dataFormatted);
    toast.promise(promise, {
      loading: client ? "Atualizando cliente..." : "Criando cliente...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        router.push("/client");
        form.reset();
        return client
          ? "Cliente atualizado com sucesso"
          : "Cliente criado com sucesso";
      },
      error: (error) => error.message,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <InputField control={form.control} description="Nome" name="name" />
          <InputCpfCnpj
            control={form.control}
            name="cpfCnpj"
            label="CPF/CNPJ (Opcional)"
          />
          <InputField
            control={form.control}
            description="Contato"
            name="phone"
            format="(##) #####-####"
          />
          <InputField
            control={form.control}
            description="Email"
            name="email"
            type="email"
          />
          <InputField
            control={form.control}
            description="Endereço completo"
            name="address"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" className="flex gap-2">
            {client ? (
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

export default FormClient;
