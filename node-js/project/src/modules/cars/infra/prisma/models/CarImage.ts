import { v4 as uuid } from "uuid";

import { CarImage as ICarImage } from "@prisma/client";

class CarImage implements ICarImage {
  id: string;
  image_name: string;
  created_at: Date;
  fk_car_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { CarImage };
