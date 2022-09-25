import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.coursesModules.create({
    data: {
      course: {
        create: {
          duration: 190,
          name: 'ReactJS Course',
          description: 'Great ReactJS course',
        }
      },
      module: {
        create: {
          name: 'Tailwind learning begin',
          description: "Tailwind learning",
        }
      }
      
    },

  });

  console.log(result)
}

main();