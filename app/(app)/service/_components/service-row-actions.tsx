"use client";

import { Service } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import AlertDelete from "@/app/_components/alert-delete";

import { deleteService } from "../_actions/delete-service";

interface ServiceRowActionProps {
  service: Service;
}

const ServiceRowActions = ({ service }: ServiceRowActionProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteServicePromise = deleteService(service.uuid);
    toast.promise(deleteServicePromise, {
      loading: "Deletando...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        return "Serviço deletado com sucesso";
      },
      error: (error) => error.message,
    });
    setOpenAlert(false);
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="Serviço"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/service/${service.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
};

export default ServiceRowActions;
