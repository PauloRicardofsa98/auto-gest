"use client";

import { Employer } from "@prisma/client";
import { PencilIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import AlertDelete from "@/app/_components/alert-delete";

import { deleteEmployer } from "../_actions/delete-employer";

interface EmployerRowActionProps {
  employer: Employer;
}

const EmployerRowActions = ({ employer }: EmployerRowActionProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  async function handleDelete() {
    const deleteEmployerPromise = deleteEmployer(employer.uuid);
    toast.promise(deleteEmployerPromise, {
      loading: "Deletando...",
      success: (response) => {
        if (typeof response === "string") {
          throw new Error(response);
        }
        return "Fornecedor deletado com sucesso";
      },
      error: (error) => error.message,
    });
  }

  const toggleAlert = () => setOpenAlert(!openAlert);

  return (
    <>
      <AlertDelete
        title="employere"
        open={openAlert}
        toggleAlert={toggleAlert}
        handleDelete={handleDelete}
      />
      <div className="flex items-center space-x-2">
        <Link href={`/employer/${employer.uuid}`}>
          <PencilIcon />
        </Link>

        <Trash2Icon className="cursor-pointer" onClick={toggleAlert} />
      </div>
    </>
  );
};

export default EmployerRowActions;
