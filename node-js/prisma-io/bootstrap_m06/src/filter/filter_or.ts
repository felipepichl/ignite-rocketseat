import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.findMany({
    where: {
      OR: [
        {
          name: {
            contains: "js"
          }
        },
        {
          name: {
            contains: "elixir"
          }
        }
      ],
      AND: {
        duration: 150,
      }
    }
  });

  console.log(result)
}

main();