-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "driver_license" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "avatar" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "user_tokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "refresh_token" TEXT NOT NULL,
    "expires_date" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_user_id" TEXT NOT NULL,
    CONSTRAINT "user_tokens_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "daily_rate" REAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "license_plate" TEXT NOT NULL,
    "fine_amount" REAL NOT NULL,
    "brand" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_category_id" TEXT NOT NULL,
    CONSTRAINT "cars_fk_category_id_fkey" FOREIGN KEY ("fk_category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "specifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "specifications_cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fk_car_id" TEXT NOT NULL,
    "fk_specification_id" TEXT NOT NULL,
    CONSTRAINT "specifications_cars_fk_car_id_fkey" FOREIGN KEY ("fk_car_id") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "specifications_cars_fk_specification_id_fkey" FOREIGN KEY ("fk_specification_id") REFERENCES "specifications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "car_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_car_id" TEXT NOT NULL,
    CONSTRAINT "car_images_fk_car_id_fkey" FOREIGN KEY ("fk_car_id") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "rentals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "start_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" DATETIME NOT NULL,
    "expected_return_date" DATETIME NOT NULL,
    "total" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_car_id" TEXT NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    CONSTRAINT "rentals_fk_car_id_fkey" FOREIGN KEY ("fk_car_id") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rentals_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
