import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.findMany({
    where: {
      name: {
        startsWith: 'reactnative'
      }
    }
  });

  console.log(result)
}

main();