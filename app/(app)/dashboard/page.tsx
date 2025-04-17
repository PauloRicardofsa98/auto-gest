import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarDaysIcon,
  CarIcon,
  CircleDollarSignIcon,
  UsersIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { getOverview } from "@/app/_data/dashboard";
import { currencyFormat } from "@/app/_utils/helper";
import { cn } from "@/app/_utils/helper";

import Overview from "./_components/overview";
import RecentSchedules from "./_components/recent-schedule";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const {
    currentMonthRevenue,
    currentMonthSchedules,
    revenueDifferencePercentage,
    scheduleDifferencePercentage,
    totalClients,
    totalVehicles,
    monthlyRevenue,
  } = await getOverview();

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <CircleDollarSignIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currencyFormat(currentMonthRevenue)}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span
                className={cn(
                  "flex items-center",
                  revenueDifferencePercentage >= 0
                    ? "text-green-500"
                    : "text-red-500",
                )}
              >
                {revenueDifferencePercentage >= 0 ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {Math.abs(revenueDifferencePercentage)}%
              </span>
              <span className="ml-1">do mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <CalendarDaysIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonthSchedules}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span
                className={cn(
                  "flex items-center",
                  scheduleDifferencePercentage >= 0
                    ? "text-green-500"
                    : "text-red-500",
                )}
              >
                {scheduleDifferencePercentage >= 0 ? (
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                )}
                {Math.abs(scheduleDifferencePercentage)}%
              </span>
              <span className="ml-1">do mês passado</span>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Veículos</CardTitle>
            <CarIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVehicles}</div>
            <p className="text-xs text-muted-foreground">Total cadastrados</p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <UsersIcon className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">Total cadastrados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Overview monthlyRevenue={monthlyRevenue} />
        <Card className="col-span-3 transition-all duration-300 hover:shadow-lg">
          <CardHeader>
            <CardTitle>Agendamentos recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentSchedules />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
