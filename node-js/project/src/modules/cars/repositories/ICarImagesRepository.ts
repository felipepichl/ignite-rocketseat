import { ICreateCarImagesDTO } from "@modules/cars/dtos/ICreateCarImagesDTO";

import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImagesRepository {
  create({ car_id, image_name }: ICreateCarImagesDTO): Promise<CarImage>;
}

export { ICarImagesRepository };
