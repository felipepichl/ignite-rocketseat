import { Specification as ISpecification } from "@prisma/client";
import { v4 as uuid } from "uuid";

class Specification implements ISpecification {
  id: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Specification };
