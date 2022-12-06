import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { prisma } from "@shared/infra/prisma";

import { Rental } from "../models/Rental";

class RentalsRepository implements IRentalsRepository {
  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const result = await prisma.rental.create({
      data: {
        fk_car_id: car_id,
        fk_user_id: user_id,
        expected_return_date,
      },
    });

    return result;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const result = await prisma.rental.findFirst({
      where: { fk_car_id: car_id, end_date: null },
    });

    return result;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const result = await prisma.rental.findFirst({
      where: { fk_user_id: user_id, end_date: null },
    });

    return result;
  }

  async findById(id: string): Promise<Rental> {
    const result = await prisma.rental.findUnique({
      where: { id },
    });

    return result;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const result = await prisma.rental.findMany({
      where: { fk_user_id: user_id },
    });

    return result;
  }
}

export { RentalsRepository };
