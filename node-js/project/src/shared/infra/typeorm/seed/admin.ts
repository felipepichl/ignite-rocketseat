import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";

import { AppDataSource } from "..";

async function create() {
  AppDataSource.initialize();

  const id = uuid();
  const password = await hash("admin", 8);

  AppDataSource.query(
    `INSERT INTO USERS(
        id,
        name,
        email,
        password,
        driver_license,
        isAdmin,
        created_at
      )
      values(
        '${id}',
        'admin',
        'admin@rentx.com.br',
        '${password}',
        'XX',
        true,
        '${new Date().getTime()}'
      )
    `
  );
}

create().then(() => {
  console.log("Seed has been initialized");
});
