import { v4 as uuid } from "uuid";

import { Category as ICategory } from "@prisma/client";

class Category implements ICategory {
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

export { Category };
