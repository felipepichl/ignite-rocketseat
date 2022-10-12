import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { PrismaClient } from "@prisma/client";

import { Car } from "../models/Car";

class CarRepository implements ICarsRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({
    name,
    description,
    daily_rate,
    available,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const result = await this.prisma.car.create({
      data: {
        name,
        description,
        daily_rate,
        available,
        license_plate,
        fine_amount,
        brand,
        fk_category_id: category_id,
      },
    });

    return result;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const result = await this.prisma.car.findFirst({
      where: { license_plate },
    });

    return result;
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const result = await this.prisma.car.findMany({});
  }
  findById(car_id: string): Promise<Car> {
    throw new Error("Method not implemented.");
  }
  updateAvailable(id: string, available: boolean): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { CarRepository };
