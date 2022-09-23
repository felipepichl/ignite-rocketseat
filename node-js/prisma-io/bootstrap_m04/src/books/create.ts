import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.books.create({
    data: {
      name: "NodeJS Book",
      authors: {
        connectOrCreate: {
          where: {
            name: "Helena Pichl"
          },
          create: {
            name: "Helena Pichl"
          }
        }
      }
    }
  })

  console.log(result)
}

main();