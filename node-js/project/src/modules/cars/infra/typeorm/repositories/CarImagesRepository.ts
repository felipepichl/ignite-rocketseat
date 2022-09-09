import { Repository } from "typeorm";

import { ICreateCarImagesDTO } from "@modules/cars/dtos/ICreateCarImagesDTO";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import dataSource from "@shared/infra/typeorm";

import { CarImage } from "../entities/CarImage";

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = dataSource.getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImagesDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarImagesRepository };
