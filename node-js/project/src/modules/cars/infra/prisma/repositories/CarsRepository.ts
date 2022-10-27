import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { PrismaClient, Prisma } from "@prisma/client";

import { Car } from "../models/Car";

class CarsRepository implements ICarsRepository {
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
    fk_category_id,
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
        fk_category_id,
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
    const available = await this.prisma.$queryRaw<Car[]>(Prisma.sql`
      SELECT * FROM cars where available = true
    `);

    if (available) {
      console.log("There is a available car");
    }

    // const result = await this.prisma.car.findMany({
    //   where: {
    //     OR: [
    //       {
    //         fk_category_id: category_id,
    //       },
    //       {
    //         brand,
    //       },
    //       {
    //         name,
    //       },
    //     ],
    //   },
    // });

    return available;
  }

  async findById(car_id: string): Promise<Car> {
    const result = await this.prisma.car.findUnique({
      where: {
        id: car_id,
      },
    });

    return result;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    if (available) {
      await this.prisma.car.update({
        where: {
          id,
        },
        data: {
          available: false,
        },
      });
    }
  }
}

export { CarsRepository };
