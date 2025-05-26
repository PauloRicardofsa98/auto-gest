"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, Client, Prisma, Service } from "@prisma/client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputCombobox from "@/app/_components/inputs/input-combobox";
import InputDate from "@/app/_components/inputs/input-date";
import InputField from "@/app/_components/inputs/input-field";
import InputPlate from "@/app/_components/inputs/input-license-plate";
import InputScheduleService from "@/app/_components/inputs/schedule-service/input-schedule-service";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { getVehicle } from "@/app/_data/vehicle";
import { currencyFormat } from "@/app/_utils/helper";

import { createSchedule } from "../_actions/create-schedule";
import { ScheduleProps, scheduleSchema } from "../_actions/schedule-schema";
import { updateSchedule } from "../_actions/update-schedule";

type InputScheduleServiceProps = {
  serviceUuid: string;
  value: number;
};

type ScheduleAll = Prisma.ScheduleGetPayload<{
  include: {
    scheduleServices: true;
    client: true;
    vehicle: true;
    employer: true;
  };
}>;

interface FormRecordProps {
  schedule?: ScheduleAll;
  clients: Client[];
  services: Service[];
}

const FormSchedule = ({ schedule, clients, services }: FormRecordProps) => {
  const router = useRouter();

  const [servicesSchedule, setServicesSchedule] = useState<
    InputScheduleServiceProps[]
  >(() => {
    return (
      schedule?.scheduleServices.map((recoverService) => {
        return {
          scheduleUuid: recoverService.scheduleUuid,
          serviceUuid: recoverService.serviceUuid,
          value: Number(recoverService.value),
        };
      }) || []
    );
  });

  const form = useForm<ScheduleProps>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      brand: schedule ? schedule.vehicle.brand || undefined : undefined,
      clientUuid: schedule ? schedule.client.uuid || undefined : undefined,
      color: schedule ? schedule.vehicle.color || undefined : undefined,
      model: schedule ? schedule.vehicle.model || "" : "",
      plate: schedule ? schedule.vehicle.plate || "" : "",
      year: schedule
        ? schedule.vehicle.year?.toString() || undefined
        : undefined,
      date: schedule ? new Date(schedule.date) : new Date(),
    },
  });

  const handleAddService = (service: Service) => {
    setServicesSchedule((services) => [
      ...services,
      {
        scheduleUuid: schedule?.uuid || "",
        serviceUuid: service.uuid,
        value: Number(service.price),
      },
    ]);
  };

  const valueSchedule = () => {
    return servicesSchedule.reduce((accumulator, service) => {
      return accumulator + service.value;
    }, 0);
  };

  const handleRemoveService = (indexToRemove: number) => {
    const updatedServices = [...servicesSchedule];

    updatedServices.splice(indexToRemove, 1);

    setServicesSchedule(updatedServices);
  };

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

  async function onSubmit(data: ScheduleProps) {
    const scheduleData: ScheduleProps = {
      clientUuid: data.clientUuid,
      date: data.date,
      services: servicesSchedule,
      plate: data.plate,
      model: data.model,
      brand: data.brand,
      year: data.year,
      color: data.color,
    };

    const promise = schedule
      ? updateSchedule(schedule.uuid, scheduleData)
      : createSchedule(scheduleData);

    toast.promise(promise, {
      loading: schedule
        ? "Atualizando agendamento..."
        : "Adicionando agendamento...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        router.push("/schedule");
        form.reset();
        return schedule
          ? "Agendamento atualizado com sucesso"
          : "Agendamento adicionado com sucesso";
      },
      error: (error) => error.message,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <InputDate control={form.control} name="date" description="Data" />
          <InputPlate
            control={form.control}
            name="plate"
            description="Placa"
            onBlurCallback={handleBlurPlate}
          />
          <InputField
            control={form.control}
            description="Modelo"
            name="model"
          />
          <InputCombobox
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
          <InputField control={form.control} description="Cor" name="color" />
          {/* <InputCombobox
            control={form.control}
            description="Serviço"
            name="serviceUuid"
            form={form}
            options={services.map((services) => ({
              uuid: services.uuid,
              name: services.name,
            }))}
          /> */}
          <InputCombobox
            control={form.control}
            description="Cliente"
            name="clientUuid"
            form={form}
            options={clients.map((client) => ({
              uuid: client.uuid,
              name: client.name,
            }))}
          />
          <FormItem>
            <FormLabel>Valor do agendamento</FormLabel>
            <FormControl>
              <Input
                className="cursor-not-allowed disabled:opacity-100"
                value={currencyFormat(valueSchedule())}
                disabled
              />
            </FormControl>
          </FormItem>
        </div>

        <InputScheduleService
          services={services}
          handleAddService={handleAddService}
        />

        {servicesSchedule.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Grupo</TableHead>
                <TableHead>Procedimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicesSchedule.map((serviceSchedule, index) => {
                const serviceData = services.find(
                  (service) => service.uuid === serviceSchedule.serviceUuid,
                );

                return (
                  <TableRow className="m-0 p-0" key={index}>
                    <TableCell className="m-0 p-1 font-medium">
                      {serviceData?.name}
                    </TableCell>

                    <TableCell className="m-0 p-1">
                      {currencyFormat(serviceSchedule.value)}
                    </TableCell>

                    <TableCell className="m-0 p-1 text-right">
                      <Button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                      >
                        <X />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        <div className="flex w-full items-center justify-end gap-2">
          <Button type="button" variant="destructive" onClick={() => {}}>
            Cancelar
          </Button>
          <Button type="submit" className="flex gap-2">
            {schedule ? "Atualizar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormSchedule;
