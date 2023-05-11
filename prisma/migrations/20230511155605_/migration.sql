/*
  Warnings:

  - A unique constraint covering the columns `[customer_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_customer_id_key" ON "users"("customer_id");
