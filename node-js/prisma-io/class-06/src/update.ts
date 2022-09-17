import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  
  await prisma.courses.update({
    where: { id: 'eaa291ec-8d47-4e84-99b4-db4d89d156c7' },

    data: {
      name : 'ReactNative Course',
      description : 'Great ReactNative Course',
      duration : 100
    }
  })


}

main();