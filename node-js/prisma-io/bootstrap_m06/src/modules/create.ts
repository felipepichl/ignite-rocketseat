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
              id: "c249a167-4c4f-4465-aaff-2a0dbcee6b29"
            }
          }
        }
      }
    },

  });

  console.log(result)
}

main();