"use client";

import { Client } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AlertDelete } from "@/app/_components/alert-delete";
import usePromiseToast from "@/app/_hooks/toast-promise";

import { deleteClient } from "../_actions/delete-client";

interface ClientRowActionProps {
  client: Client;
}

export function ClientRowActions({ client }: ClientRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteClientPromise = deleteClient(client.uuid);
    toastPromise.promise(deleteClientPromise, "delete");
    setOpenAlert(false);
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
}
