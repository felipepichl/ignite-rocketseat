import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 190,
      name: 'ReactNative Course',
      description: 'Great ReactNative course',
      teachers: {
        connectOrCreate: {
          where: {
            name: "Felipe Pichl"
          }, 
          create: {
            name: "Felipe Pichl"
          }
        }
      }
    }
  });

  console.log(result)
}

main();