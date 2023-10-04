import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const profile = await prisma.profile.create({
    data: {
      bio: "Hello World",
      user: {
        connect: { email: "alice@prisma.io" },
      },
    },
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
