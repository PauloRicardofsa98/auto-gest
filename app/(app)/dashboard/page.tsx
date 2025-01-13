import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/_components/ui/card";
import Overview from "./_components/overview";
import RecentSchedules from "./_components/recent-schedule";
import { getOverview } from "@/app/_data/dashboard";
import {
  CalendarDaysIcon,
  CarIcon,
  CircleDollarSignIcon,
  UsersIcon,
} from "lucide-react";
import { currencyFormat } from "@/app/_utils/helper";

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
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="mt-2 space-y-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Receita Total
                </CardTitle>
                <CircleDollarSignIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currencyFormat(currentMonthRevenue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {revenueDifferencePercentage}% do mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Agendamentos
                </CardTitle>
                <CalendarDaysIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {currentMonthSchedules}
                </div>
                <p className="text-xs text-muted-foreground">
                  {scheduleDifferencePercentage}% do mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Veículos</CardTitle>
                <CarIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVehicles}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                <UsersIcon />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClients}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Overview monthlyRevenue={monthlyRevenue} />
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Agendamentos recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentSchedules />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
