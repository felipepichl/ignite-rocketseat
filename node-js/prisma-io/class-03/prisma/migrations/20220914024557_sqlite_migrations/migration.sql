/*
  Warnings:

  - You are about to alter the column `created_at` on the `modules` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamp(3)")` to `DateTime`.
  - You are about to alter the column `created_at` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("timestamp(3)")` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_modules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_modules" ("created_at", "description", "id", "name") SELECT "created_at", "description", "id", "name" FROM "modules";
DROP TABLE "modules";
ALTER TABLE "new_modules" RENAME TO "modules";
CREATE UNIQUE INDEX "modules_name_key" ON "modules"("name");
CREATE TABLE "new_courses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_courses" ("created_at", "description", "duration", "id", "name") SELECT "created_at", "description", "duration", "id", "name" FROM "courses";
DROP TABLE "courses";
ALTER TABLE "new_courses" RENAME TO "courses";
CREATE UNIQUE INDEX "courses_name_key" ON "courses"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
