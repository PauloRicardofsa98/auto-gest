"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listEmployers = async (where?: Prisma.EmployerWhereInput) => {
  const employers = await db.employer.findMany({
    where,
    orderBy: {
      updatedAt: "desc",
    },
  });
  return JSON.parse(JSON.stringify(employers));
};

export const getEmployer = async (where?: Prisma.EmployerWhereInput) => {
  const employer = await db.employer.findFirst({ where });
  return JSON.parse(JSON.stringify(employer));
};

export const getEmployerCommission = async (
  where?: Prisma.ScheduleWhereInput,
) => {
  const employers = await db.employer.findMany({
    include: {
      Schedule: {
        where: {
          status: "DONE",
          AND: where,
        },
        include: {
          scheduleServices: true,
        },
      },
    },
  });
  const employerWithCommission = employers
    .filter((employer) => employer.Schedule.length > 0)
    .map((employer) => {
      const { Schedule: schedules, ...rest } = employer;
      return {
        ...rest,
        value: schedules.reduce((acc, schedule) => {
          return (
            acc +
              Number(
                schedule.scheduleServices.reduce(
                  (acc, service) => acc + Number(service.value),
                  0,
                ),
              ) || 0
          );
        }, 0),
        quantityServices: schedules.length,
      };
    });

  return employerWithCommission;
};
