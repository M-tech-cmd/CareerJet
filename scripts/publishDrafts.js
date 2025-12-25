#!/usr/bin/env bun
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.jobPost.updateMany({
    where: { status: "DRAFT" },
    data: { status: "ACTIVE" },
  });

  console.log(`Published ${result.count} draft job(s).`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
