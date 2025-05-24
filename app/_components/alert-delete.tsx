"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";

interface ActionDeleteProps {
  open: boolean;
  title: string;
  toggleAlert: () => void;
  handleDelete: () => void;
}

export const AlertDelete = ({
  open,
  title,
  toggleAlert,
  handleDelete,
}: ActionDeleteProps) => {
  return (
    <AlertDialog open={open} onOpenChange={toggleAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja deletar este {title.toLowerCase()}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-destructive">
            Essa ação não pode ser desfeita. Isso excluirá permanentemente este{" "}
            {title.toLowerCase()}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="secondary" onClick={toggleAlert}>
            Voltar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDelete;
