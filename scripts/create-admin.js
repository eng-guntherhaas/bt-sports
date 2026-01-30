import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

async function main() {
  const passwordHash = await bcrypt.hash("Stampede2694!", 10);

  await prisma.user.upsert({
    where: { email: "gunther@biarritz.com.br" },
    update: {
      password: passwordHash,
      role: "admin",
    },
    create: {
      email: "gunther@biarritz.com.br",
      name: "Gunther Masi Haas",
      password: passwordHash,
      role: "admin",
    },
  });

  console.log("✅ Admin criado/atualizado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
