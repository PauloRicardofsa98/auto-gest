"use client";

import { Employer, Prisma, ScheduleStatus } from "@prisma/client";
import { Check, ChevronsUpDown, PencilIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { listEmployers } from "@/app/_data/employer";
import usePromiseToast from "@/app/_hooks/toast-promise";
import { cn } from "@/app/_lib/utils";

import { updateSchedule } from "../_actions/update-schedule";

type ScheduleAll = Prisma.ScheduleGetPayload<{
  include: {
    client: true;
    vehicle: true;
    scheduleServices: {
      include: {
        service: true;
      };
    };
  };
}>;

interface ScheduleRowActionProps {
  schedule: ScheduleAll;
}

export function ScheduleRowActions({ schedule }: ScheduleRowActionProps) {
  const toastPromise = usePromiseToast();
  const [openCheckout, setOpenCheckout] = useState(false);
  const [open, setOpen] = useState(false);

  const [employers, setEmployers] = useState<Employer[]>([]);
  const [selectedEmployer, setSelectedEmployer] = useState<
    Employer | undefined
  >();

  useEffect(() => {
    setSelectedEmployer(undefined);
    const fetchEmployers = async () => {
      const employers = await listEmployers();
      setEmployers(employers);
    };
    fetchEmployers();
  }, [openCheckout]);

  async function handleUpdateScheduleStatus(status: ScheduleStatus) {
    const updateProductPromise = updateSchedule(schedule.uuid, {
      status,
    });
    toastPromise.promise(updateProductPromise, "update");
    setOpenCheckout(false);
  }
  async function handleCheckOutSchedule() {
    if (!selectedEmployer) {
      toast.error("Selecione o funcionário que realizou o serviço");
      return;
    }

    const updateProductPromise = updateSchedule(schedule.uuid, {
      status: "DONE",
      employerUuid: selectedEmployer.uuid,
    });
    toastPromise.promise(updateProductPromise, "update");
    setOpenCheckout(false);
  }

  const toggleCheckout = () => setOpenCheckout(!openCheckout);

  return (
    <>
      <AlertDialog open={openCheckout} onOpenChange={toggleCheckout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Selecione o funcionário que realizou o serviço
            </AlertDialogTitle>
          </AlertDialogHeader>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {selectedEmployer
                  ? selectedEmployer.name
                  : "Selecione uma opção"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Procurar ..." />
                <CommandEmpty>Não encontrado.</CommandEmpty>
                <CommandGroup>
                  {employers.map((item) => (
                    <CommandItem
                      key={item.uuid}
                      value={item.name}
                      onSelect={() => {
                        setSelectedEmployer(item);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedEmployer?.uuid === item.uuid
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <AlertDialogFooter>
            <Button variant="secondary" onClick={toggleCheckout}>
              Voltar
            </Button>
            <Button onClick={handleCheckOutSchedule}>Continuar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-center space-x-2">
        {schedule.status === "PENDING" && (
          <>
            <Button onClick={toggleCheckout} size="sm">
              Saida
            </Button>
            <Button
              variant={"destructive"}
              size="sm"
              onClick={() => handleUpdateScheduleStatus("CANCELED")}
            >
              Cancelar
            </Button>
          </>
        )}
        <Button size="icon" variant="outline">
          <Link href={`/schedule/${schedule.uuid}`}>
            <PencilIcon />
          </Link>
        </Button>
      </div>
    </>
  );
}
