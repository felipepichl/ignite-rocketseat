import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.modules.create({
    data: {
      name: 'Firebase learning begin',
      description: "Firebase learning",
      courses: {
        create: {
          course: {
            connect: {
              id: "2073fb11-301c-41c4-a0f5-8eda322574bf"
            }
          }
        }
      }
    },

  });

  console.log(result)
}

main();