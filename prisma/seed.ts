import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  await db.user.create({
    data: {
      username: process.env.USERNAME || "",
      passwordHash: process.env.PASSWORD || "",
    },
  });
}

seed();
