"use client";

import { Client, Prisma, ScheduleStatus, Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, CircleIcon, EraserIcon, FilterIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Label } from "@/app/_components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { cn } from "@/app/_lib/utils";
import { getFilterPeriod } from "@/app/_utils/helper";

import ComboboxFilter from "./combobox-filter";

interface HeaderScheduleProps {
  clients: Client[];
  services: Service[];
  handleUpdateFilter: (filter: Prisma.ScheduleWhereInput) => void;
}
type FilterPeriod =
  | "CURRENT_DAY"
  | "PREVIOUS_DAY"
  | "CURRENT_WEEK"
  | "PREVIOUS_WEEK"
  | "CURRENT_MONTH"
  | "PREVIOUS_MONTH";

const HeaderSchedule = ({
  clients,
  services,
  handleUpdateFilter,
}: HeaderScheduleProps) => {
  const [statusFilter, setStatusFilter] = useState<ScheduleStatus[]>([]);
  const [clientFilter, setClientFilter] = useState<string[]>([]);
  const [serviceFilter, setServiceFilter] = useState<string[]>([]);

  const [dateRangeFilter, setDateRange] = useState<DateRange | undefined>();
  const [dateFilter, setDateFilter] = useState<FilterPeriod>("CURRENT_DAY");

  const [dateFilterType, setDateFilterType] = useState<
    "APPOINTMENT" | "CREATED"
  >("APPOINTMENT");

  const handleUpdateStatusFilter = (values: string[]) => {
    setStatusFilter(values as ScheduleStatus[]);
  };
  const handleUpdateClientFilter = (values: string[]) => {
    setClientFilter(values);
  };
  const handleUpdateServiceFilter = (values: string[]) => {
    setServiceFilter(values);
  };
  const handleClearFilters = () => {
    setStatusFilter([]);
    setClientFilter([]);
    setServiceFilter([]);
    setDateRange(undefined);
    setDateFilter("CURRENT_DAY");
  };

  const getFilterReport = () => {
    const filters: Prisma.ScheduleWhereInput = {};
    if (statusFilter.length > 0) {
      filters.status = {
        in: statusFilter,
      };
    }

    if (clientFilter.length > 0) {
      filters.client = {
        uuid: {
          in: clientFilter,
        },
      };
    }
    if (serviceFilter.length > 0) {
      filters.service = {
        uuid: {
          in: serviceFilter,
        },
      };
    }

    if (dateFilterType === "CREATED") {
      filters.createdAt = getFilterPeriod(dateFilter, dateRangeFilter);
    } else {
      filters.date = getFilterPeriod(dateFilter, dateRangeFilter);
    }

    return filters;
  };

  const updateFilter = () => {
    handleUpdateFilter(getFilterReport());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Clientes</Label>
            <ComboboxFilter
              title="Clientes..."
              values={clientFilter}
              handleUpdateValues={handleUpdateClientFilter}
              options={clients.map((client) => ({
                label: client.name,
                value: client.uuid,
              }))}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Serviço</Label>
            <ComboboxFilter
              title="Serviços..."
              values={serviceFilter}
              handleUpdateValues={handleUpdateServiceFilter}
              options={services.map((service) => ({
                label: service.name,
                value: service.uuid,
              }))}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Status do agendamento</Label>
            <ComboboxFilter
              title="Status..."
              values={statusFilter}
              handleUpdateValues={handleUpdateStatusFilter}
              options={[
                {
                  label: "Pendente",
                  value: "PENDING",
                  icon: (
                    <CircleIcon
                      className={`h-4 w-4 fill-yellow-400 text-yellow-400`}
                    />
                  ),
                },
                {
                  label: "Cancelado",
                  value: "CANCELED",
                  icon: (
                    <CircleIcon
                      className={`h-4 w-4 fill-red-500 text-red-500`}
                    />
                  ),
                },
                {
                  label: "Finalizado",
                  value: "DONE",
                  icon: (
                    <CircleIcon
                      className={`h-4 w-4 fill-green-500 text-green-500`}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex">
              <Label>Período</Label>
              <RadioGroup
                defaultValue={dateFilterType}
                onValueChange={(value) => {
                  setDateFilterType(value as "APPOINTMENT" | "CREATED");
                }}
                className="flex w-full justify-end"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="APPOINTMENT" id="APPOINTMENT" />
                  <Label htmlFor="APPOINTMENT">Agendamento</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="CREATED" id="CREATED" />
                  <Label htmlFor="CREATED">Cadastro</Label>
                </div>
              </RadioGroup>
            </div>
            <Select
              value={dateFilter}
              onValueChange={(value) => setDateFilter(value as FilterPeriod)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Período..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURRENT_DAY">Dia atual</SelectItem>
                <SelectItem value="PREVIOUS_DAY">Dia anterior</SelectItem>
                <SelectItem value="CURRENT_WEEK">Semana atual</SelectItem>
                <SelectItem value="PREVIOUS_WEEK">Semana anterior</SelectItem>
                <SelectItem value="CURRENT_MONTH">Mês atual</SelectItem>
                <SelectItem value="PREVIOUS_MONTH">Mês anterior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Período personalizado</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateRangeFilter && "text-muted-foreground",
                  )}
                >
                  {dateRangeFilter?.from ? (
                    dateRangeFilter.to ? (
                      <>
                        {format(dateRangeFilter.from, "dd LLL y", {
                          locale: ptBR,
                        })}{" "}
                        -{" "}
                        {format(dateRangeFilter.to, "dd LLL y", {
                          locale: ptBR,
                        })}
                      </>
                    ) : (
                      format(dateRangeFilter.from, "dd LLL y")
                    )
                  ) : (
                    <span>Selecione o período</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="!w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRangeFilter?.from}
                  selected={dateRangeFilter}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={handleClearFilters} variant="outline">
              Limpar
              <EraserIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={updateFilter} variant="outline">
              Filtrar
              <FilterIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    // <div className="lg-flex-row mb-4 flex flex-col items-center justify-between space-x-2 border-b border-gray-200 pb-4">
    //   <h2 className="text-lg font-semibold">
    //     {!period
    //       ? `Hoje, ${new Date().toLocaleString("pt-BR", {
    //           weekday: "long",
    //           day: "numeric",
    //           month: "long",
    //           year: "numeric",
    //           timeZone: "America/Sao_Paulo",
    //         })}`
    //       : period.gte.toLocaleString("pt-BR", {
    //           day: "numeric",
    //           month: "long",
    //           year: "numeric",
    //           timeZone: "America/Sao_Paulo",
    //         }) +
    //         " até " +
    //         period.lte.toLocaleString("pt-BR", {
    //           day: "numeric",
    //           month: "long",
    //           year: "numeric",
    //           timeZone: "America/Sao_Paulo",
    //         })}
    //   </h2>
    //   <DataTableFilterPeriod page="schedule" />
    // </div>
  );
};

export default HeaderSchedule;
