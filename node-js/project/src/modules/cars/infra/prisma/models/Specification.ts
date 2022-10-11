import { v4 as uuid } from "uuid";

import { Specification as ISpecification } from "@prisma/client";

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
