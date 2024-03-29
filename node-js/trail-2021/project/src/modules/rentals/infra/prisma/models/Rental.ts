import { Rental as IRental } from "@prisma/client";
import { v4 as uuid } from "uuid";

class Rental implements IRental {
  id: string;
  start_date: Date;
  end_date: Date;
  expected_return_date: Date;
  total: number;
  created_at: Date;
  updated_at: Date;

  fk_car_id: string;
  fk_user_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Rental };
