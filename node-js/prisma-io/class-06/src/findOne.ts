import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.findUnique({
    where: {
      name: 'ReactNative Course'
    }
  })

  console.log(result)
}

main();