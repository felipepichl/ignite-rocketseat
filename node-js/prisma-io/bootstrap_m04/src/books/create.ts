import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.books.create({
    data: {
      name: "NodeJS Book",
      authors: {
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
  })

  console.log(result)
}

main();