"use server";

import { db } from "@/app/_lib/prisma";

export const getOverview = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // Quantidade de carros cadastrados
  const totalVehicles = await db.vehicle.count();

  // Quantidade de clientes cadastrados
  const totalClients = await db.client.count();

  // Faturamento do mês atual
  const currentMonthSchedules = await db.schedule.findMany({
    where: {
      createdAt: {
        gte: startOfCurrentMonth,
      },
      status: "DONE",
    },
    include: {
      service: true,
    },
  });

  const currentMonthRevenue = currentMonthSchedules.reduce(
    (total, schedule) => {
      return total + (Number(schedule.service?.price) || 0);
    },
    0,
  );

  // Faturamento do mês passado
  const lastMonthSchedules = await db.schedule.findMany({
    where: {
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
      status: "DONE",
    },
    include: {
      service: true,
    },
  });

  const lastMonthRevenue = lastMonthSchedules.reduce((total, schedule) => {
    return total + (Number(schedule.service?.price) || 0);
  }, 0);

  // Diferença de faturamento entre meses
  const revenueDifferencePercentage =
    lastMonthRevenue > 0
      ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
      : 100;

  // Quantidade de agendamentos do mês atual
  const currentMonthSchedulesCount = currentMonthSchedules.length;

  // Quantidade de agendamentos do mês passado
  const lastMonthSchedulesCount = lastMonthSchedules.length;

  // Diferença de agendamentos entre meses
  const scheduleDifferencePercentage =
    lastMonthSchedulesCount > 0
      ? ((currentMonthSchedulesCount - lastMonthSchedulesCount) /
          lastMonthSchedulesCount) *
        100
      : 100;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Array para armazenar a receita de cada mês
  const monthlyRevenue = await Promise.all(
    Array.from({ length: 12 }, async (_, index) => {
      const startOfMonth = new Date(year, index, 1);
      const endOfMonth = new Date(year, index + 1, 0);

      // Receita do mês
      const schedules = await db.schedule.findMany({
        where: {
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
          status: "DONE",
        },
        include: {
          service: true, // Inclui os dados do serviço relacionado
        },
      });

      const total = schedules
        .reduce((sum, schedule) => {
          return sum + (Number(schedule.service?.price) || 0);
        }, 0)
        .toFixed(2);

      return {
        month: monthNames[index],
        total: Number(total),
      };
    }),
  );

  return {
    totalVehicles,
    totalClients,
    currentMonthRevenue,
    revenueDifferencePercentage,
    currentMonthSchedules: currentMonthSchedulesCount,
    scheduleDifferencePercentage,
    monthlyRevenue,
  };
};
