import { Service } from "@prisma/client";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

import { scheduleServiceColumns } from "./schedule-service-columns";

interface InputScheduleServiceProps {
  services: Service[];
  handleAddService: (service: Service) => void;
}

const InputScheduleService = ({
  services,
  handleAddService,
}: InputScheduleServiceProps) => {
  const [open, setOpen] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: services,
    columns: scheduleServiceColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const handleFilterAndAddService = () => {
    Object.keys(rowSelection).forEach((index) => {
      const row = table.getRow(index, true);
      const service: Service = row.original;
      handleAddService(service);
    });
    setRowSelection([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Procedimentos</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] w-[70%] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>Adicionar procedimentos</DialogTitle>
        </DialogHeader>

        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Buscar por nome..."
              value={
                (table.getColumn("service")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("service")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="p-1" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={scheduleServiceColumns.length}
                      className="h-24 text-center"
                    >
                      Nenhum resultado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} procedimento(s)
              selecionada.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Proximo
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleFilterAndAddService}>adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InputScheduleService;
