import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.courses.create({
    data: {
      duration: 190,
      name: 'ReacJS Course',
      description: 'Great ReactJS course',
      teachers: {
        connect: {
          id: '8c37d221-0607-41e8-9cd8-cd165ca42c39'
        }
      }
    }
  });

  console.log(result)
}

main();