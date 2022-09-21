import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.findMany({
    where: {
      id: 'df72a3af-3430-48da-86c9-dfada2dffad6'
    },
    include: {
      teachers: true,
    }
  })

  console.log(result)
}

main();