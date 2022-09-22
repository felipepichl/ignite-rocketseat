import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 190,
      name: 'NodeJS Course',
      description: 'Great NodeJS course',
      teachers: {
        create: {
          name: "Fernando Pichl"
        }
      }
    }
  });

  console.log(result)
}

main();