import { v4 as uuid } from "uuid";

import { Car as ICar } from "@prisma/client";

class Car implements ICar {
  id: string;
  description: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  created_at: Date;
  fk_category_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Car };
