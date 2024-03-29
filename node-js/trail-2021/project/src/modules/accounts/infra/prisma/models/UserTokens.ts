import { UserTokens as IUserTokens } from "@prisma/client";
import { v4 as uuid } from "uuid";

class UserTokens implements IUserTokens {
  id: string;
  refresh_token: string;
  expires_date: Date;
  created_at: Date;
  fk_user_id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { UserTokens };
