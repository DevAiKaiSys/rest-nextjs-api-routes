import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userWithUpdatedProfile = await prisma.user.update({
    where: { email: "alice@prisma.io" },
    data: {
      profile: {
        update: {
          bio: "Hello Friends",
        },
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
