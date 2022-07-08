import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByLicensePlate(licnse_plate: string): Promise<Car>;
}

export { ICarsRepository };
