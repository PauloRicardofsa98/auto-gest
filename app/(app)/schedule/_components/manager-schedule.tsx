"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, Client, Service } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ComboboxInput } from "@/app/_components/inputs/combobox-input";
import { InputDate } from "@/app/_components/inputs/input-date";
import { InputField } from "@/app/_components/inputs/input-field";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { getVehicle } from "@/app/_data/vehicle";

import { createSchedule } from "../_actions/create-schedule";
import { ScheduleProps, scheduleSchema } from "../_actions/schedule-schema";

interface ManagerScheduleProps {
  clients: Client[];
  services: Service[];
}
const ManagerSchedule = ({ clients, services }: ManagerScheduleProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<ScheduleProps>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      brand: undefined,
      clientUuid: undefined,
      color: "",
      model: "",
      plate: "",
      year: undefined,
      date: new Date(),
    },
  });

  useEffect(() => {
    form.reset();
  }, [form, open]);

  async function onSubmit(data: ScheduleProps) {
    const promise = createSchedule(data);
    toast.promise(promise, {
      loading: "Criando agendamento...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        form.reset();
        setOpen(false);
        return "Agendamento criado com sucesso!";
      },
      error: (error) => error.message,
    });
  }

  const handleBlurPlate = async () => {
    const vehicle = await getVehicle({
      where: {
        plate: form.getValues("plate"),
      },
      include: {
        client: true,
      },
    });

    if (vehicle) {
      form.setValue("model", vehicle.model);
      form.setValue("brand", vehicle.brand);
      form.setValue("year", vehicle.year?.toString());
      form.setValue("color", vehicle.color || "");
      form.setValue("clientUuid", vehicle.clientUuid || "");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Novo Agendamento</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Adicione um agendamento</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <InputDate
                control={form.control}
                name="date"
                description="Data"
              />
              <InputField
                control={form.control}
                name="plate"
                description="Placa"
                onBlur={handleBlurPlate}
              />
              <InputField
                control={form.control}
                description="Modelo"
                name="model"
              />
              <ComboboxInput
                control={form.control}
                description="Marca"
                name="brand"
                form={form}
                options={Object.values(Brand).map((brand) => ({
                  uuid: brand,
                  name: brand,
                }))}
              />
              <InputField
                control={form.control}
                description="Ano"
                name="year"
                type="number"
              />
              <InputField
                control={form.control}
                description="Cor"
                name="color"
              />
              <ComboboxInput
                control={form.control}
                description="Serviço"
                name="serviceUuid"
                form={form}
                options={services.map((services) => ({
                  uuid: services.uuid,
                  name: services.name,
                }))}
              />
              <ComboboxInput
                control={form.control}
                description="Cliente"
                name="clientUuid"
                form={form}
                options={clients.map((client) => ({
                  uuid: client.uuid,
                  name: client.name,
                }))}
              />
            </div>

            <div className="flex w-full items-center justify-end gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex gap-2">
                <PlusIcon />
                Adicionar
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default ManagerSchedule;
