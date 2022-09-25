import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.coursesModules.create({
    data: {
      fk_id_course: "2073fb11-301c-41c4-a0f5-8eda322574bf",
      fk_id_module: "4b69f709-f391-4b26-97b9-1c7d9910c3b8"
    },

  });

  console.log(result)
}

main();