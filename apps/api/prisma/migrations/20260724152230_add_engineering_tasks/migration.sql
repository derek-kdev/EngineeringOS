-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('GENERAL', 'CALCULATION', 'SIMULATION', 'CAD', 'RESEARCH', 'REVIEW');

-- CreateTable
CREATE TABLE "EngineeringTask" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "assignedToId" TEXT,
    "createdById" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "taskType" "TaskType" NOT NULL DEFAULT 'GENERAL',
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EngineeringTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EngineeringTask_organizationId_idx" ON "EngineeringTask"("organizationId");

-- CreateIndex
CREATE INDEX "EngineeringTask_assignedToId_idx" ON "EngineeringTask"("assignedToId");

-- CreateIndex
CREATE INDEX "EngineeringTask_status_idx" ON "EngineeringTask"("status");

-- AddForeignKey
ALTER TABLE "EngineeringTask" ADD CONSTRAINT "EngineeringTask_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineeringTask" ADD CONSTRAINT "EngineeringTask_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "Membership"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EngineeringTask" ADD CONSTRAINT "EngineeringTask_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
