import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.coursesModules.delete({
    where: {
      id: "6a001474-ff7b-493a-853c-4813675279c0"
    }
  });

  console.log(result)
}

main();