"use client";

import { Vehicle } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import AlertDelete from "@/app/_components/alert-delete";

import { deleteVehicle } from "../_actions/delete-vehicle";

interface VehicleRowActionProps {
  vehicle: Vehicle;
}

const VehicleRowActions = ({ vehicle }: VehicleRowActionProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteVehiclePromise = deleteVehicle(vehicle.uuid);
    toast.promise(deleteVehiclePromise, {
      loading: "Deletando...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        return "Veículo deletado com sucesso";
      },
      error: (error) => error.message,
    });
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="veiculo"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/vehicle/${vehicle.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
};

export default VehicleRowActions;
