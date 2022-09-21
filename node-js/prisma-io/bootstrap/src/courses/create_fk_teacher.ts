import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 190,
      name: 'Java Course',
      description: 'Great Java course',
      fk_id_teacher: "a9c2062c-7add-4a60-90af-470ca5c12c4b"
    }
  });

  console.log(result)
}

main();