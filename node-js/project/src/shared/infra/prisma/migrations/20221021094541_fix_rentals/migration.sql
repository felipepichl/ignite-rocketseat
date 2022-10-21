-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rentals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME,
    "expected_return_date" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_car_id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    CONSTRAINT "rentals_fk_car_id_fkey" FOREIGN KEY ("fk_car_id") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rentals_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_rentals" ("created_at", "end_date", "expected_return_date", "fk_car_id", "fk_user_id", "id", "start_date", "total", "updated_at") SELECT "created_at", "end_date", "expected_return_date", "fk_car_id", "fk_user_id", "id", "start_date", "total", "updated_at" FROM "rentals";
DROP TABLE "rentals";
ALTER TABLE "new_rentals" RENAME TO "rentals";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
