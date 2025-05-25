"use client";

import { Client } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import AlertDelete from "@/app/_components/alert-delete";

import { deleteClient } from "../_actions/delete-client";

interface ClientRowActionProps {
  client: Client;
}

const ClientRowActions = ({ client }: ClientRowActionProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const promise = deleteClient(client.uuid);

    toast.promise(promise, {
      loading: "Deletando cliente...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        setOpenAlert(false);
        return "Cliente deletado com sucesso";
      },
      error: (error) => error.message,
    });
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="cliente"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/client/${client.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
};

export default ClientRowActions;
