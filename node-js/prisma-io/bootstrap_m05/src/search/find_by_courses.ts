import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.findMany({
    where: {
      id: "2073fb11-301c-41c4-a0f5-8eda322574bf"
    },
    include: {
      modules: true
    } 
  });

  console.log(JSON.stringify(result))
}

main();