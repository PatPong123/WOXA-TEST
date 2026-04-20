/*
  Warnings:

  - You are about to drop the `Broker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Broker";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "brokers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "hero_image" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "broker_type" TEXT NOT NULL,
    "performance_metrics" JSONB NOT NULL,
    "available_markets" JSONB NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "regulated" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "brokers_slug_key" ON "brokers"("slug");
