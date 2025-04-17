/*
  Warnings:

  - You are about to drop the column `serviceUuid` on the `Schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_serviceUuid_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "serviceUuid";

-- CreateTable
CREATE TABLE "ScheduleService" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "scheduleUuid" TEXT NOT NULL,
    "serviceUuid" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "ScheduleService_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "ScheduleService" ADD CONSTRAINT "ScheduleService_serviceUuid_fkey" FOREIGN KEY ("serviceUuid") REFERENCES "Service"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleService" ADD CONSTRAINT "ScheduleService_scheduleUuid_fkey" FOREIGN KEY ("scheduleUuid") REFERENCES "Schedule"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
