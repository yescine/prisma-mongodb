import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  const users = await prisma.user.findMany({include:{posts:true} });
  // await prisma.user.create({ data: { email: "new@new.com" } });

  await prisma.user.update({
    where: { email: "new@new.com" },
    data: { name: "old-125" },
  });
  const result = await prisma.post.create({
    data: {
      title: "hello-world",
      author: {
        connect: {
          email: "new@new.com",
        },
      },
    },
  });
  console.log({ result });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
