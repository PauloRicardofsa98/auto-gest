"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Brand, Client, Prisma, Vehicle } from "@prisma/client";
import { Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import InputCombobox from "@/app/_components/inputs/input-combobox";
import InputField from "@/app/_components/inputs/input-field";
import InputPlate from "@/app/_components/inputs/input-license-plate";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";

import { createVehicle } from "../_actions/create-vehicle";
import { updateVehicle } from "../_actions/update-vehicle";
import { VehicleProps, vehicleSchema } from "../_actions/vehicle-schema";

interface FormProps {
  vehicle?: Vehicle;
  clients: Client[];
}

const FormVehicle = ({ vehicle, clients }: FormProps) => {
  const router = useRouter();

  const form = useForm<VehicleProps>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      model: vehicle?.model || "",
      plate: vehicle?.plate || "",
      color: vehicle?.color || "",
      clientUuid: vehicle?.clientUuid || "",
      year: vehicle?.year?.toString() || undefined,
      brand: vehicle?.brand || undefined,
    },
  });

  async function onSubmit(data: VehicleProps) {
    const dataFormatted: Prisma.VehicleCreateInput = {
      model: data.model,
      plate: data.plate,
      brand: data.brand,
      year: data.year ? parseInt(data.year) : null,
      color: data.color,
      client: {
        connect: {
          uuid: data.clientUuid,
        },
      },
    };

    const promise = vehicle
      ? updateVehicle(vehicle.uuid, dataFormatted)
      : createVehicle(dataFormatted);

    toast.promise(promise, {
      loading: vehicle ? "Atualizando..." : "Criando...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        router.push("/vehicle");
        form.reset();
        return vehicle
          ? "Veículo atualizado com sucesso"
          : "Veículo criado com sucesso";
      },
      error: (error) => error.message,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <InputPlate control={form.control} description="Placa" name="plate" />
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
            {vehicle ? (
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

export default FormVehicle;
