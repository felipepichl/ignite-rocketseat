import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 190,
      name: 'ReactNative Course',
      description: 'Great ReactNative course',
    }
  });

  console.log(result)
}

main();