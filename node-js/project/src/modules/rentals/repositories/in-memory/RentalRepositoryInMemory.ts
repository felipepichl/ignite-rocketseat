import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, { car_id, user_id, expected_return_date });

    this.rentals.push(rental);

    return rental;
  }

  async findByCar(car_id: string): Promise<boolean> {
    return this.rentals.some((rental) => rental.car_id === car_id);
  }
}

export { RentalRepositoryInMemory };
