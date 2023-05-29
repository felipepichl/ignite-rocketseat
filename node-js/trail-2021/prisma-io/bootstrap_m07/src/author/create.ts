import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.authors.create({
    data: {
      name: 'Felipe Pichl',
      books: {
        create: [
          { name: "A book about NodeJS" },
          { name: "Other book about ReactJS" }
        ]
      }
    },

  });

  console.log(result)
}

main();