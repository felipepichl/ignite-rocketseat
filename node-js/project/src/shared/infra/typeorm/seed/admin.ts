import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";

import { createConnection } from "..";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
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

  await connection.destroy();
}

create().then(() => {
  console.log("Seed has been initialized");
});
