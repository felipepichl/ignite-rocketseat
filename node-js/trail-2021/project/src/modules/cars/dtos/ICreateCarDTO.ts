import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  available?: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  fk_category_id: string;
  specifications?: Specification[];
}

export { ICreateCarDTO };
