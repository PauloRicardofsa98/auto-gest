"use server";

import { Prisma } from "@prisma/client";

import { db } from "@/app/_lib/prisma";

export const listSchedules = async ({
  where,
  include,
  take,
}: {
  where?: Prisma.ScheduleWhereInput;
  include?: Prisma.ScheduleInclude;
  take?: number;
}) => {
  const schedules = await db.schedule.findMany({
    where,
    include,
    orderBy: {
      status: "asc",
    },
    take,
  });
  return JSON.parse(JSON.stringify(schedules));
};

export const getSchedule = async ({
  where,
  include,
}: {
  where?: Prisma.ScheduleWhereInput;
  include?: Prisma.ScheduleInclude;
}) => {
  const schedule = await db.schedule.findFirst({ where, include });
  return JSON.parse(JSON.stringify(schedule));
};
