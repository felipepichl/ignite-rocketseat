import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/prisma/models/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.fk_car_id === car_id);
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.fk_user_id === user_id && !rental.end_date
    );
  }
  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.fk_user_id === user_id);
  }
}

export { RentalRepositoryInMemory };

/**
 * ! toBe null
 */
