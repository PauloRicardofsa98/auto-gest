"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Service } from "@prisma/client";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { InputField } from "@/app/_components/inputs/input-field";
import { InputPrice } from "@/app/_components/inputs/price";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { doubleFormat } from "@/app/_utils/helper";

import { createService } from "../_actions/create-service";
import { ServiceProps, serviceSchema } from "../_actions/service-schema";
import { updateService } from "../_actions/update-service";

interface FormProps {
  service?: Service;
}

export const FormService = ({ service }: FormProps) => {
  const router = useRouter();
  const toastPromise = usePromiseToast();

  const form = useForm<ServiceProps>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service?.name || "",
      price: service?.price.toString() || "0",
    },
  });

  async function onSubmit(data: ServiceProps) {
    const dataFormatted = {
      name: data.name,
      price: doubleFormat(data.price),
    };

    if (service) {
      const { uuid } = service;
      const update = updateService(uuid, dataFormatted).then((response) => {
        if (typeof response !== "string") {
          router.push("/service");
          form.reset();
        }
        return response;
      });
      toastPromise.promise(update, "update");
    } else {
      const create = createService(dataFormatted).then((response) => {
        if (typeof response !== "string") {
          router.push("/service");
          form.reset();
        }
        return response;
      });
      toastPromise.promise(create, "create");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <InputField
            control={form.control}
            name="name"
            description="Nome do serviço"
            className="col-span-3"
          />
          <InputPrice control={form.control} description="Preço" name="price" />
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
            {service ? (
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
