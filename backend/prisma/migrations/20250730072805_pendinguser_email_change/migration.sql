/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `PendingUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PendingUser_email_key" ON "PendingUser"("email");
