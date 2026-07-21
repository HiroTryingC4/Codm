// One-time local bootstrap for the first HEAD admin account.
// Usage: node scripts/create-head-admin.js "Name" "password"
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

async function main() {
  const [name, password] = process.argv.slice(2);

  if (!name || !password) {
    console.error('Usage: node scripts/create-head-admin.js "Name" "password"');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const prisma = new PrismaClient();

  const existingHead = await prisma.admin.findFirst({ where: { role: "HEAD" } });
  if (existingHead) {
    console.error(`A head admin already exists: "${existingHead.name}". Aborting.`);
    await prisma.$disconnect();
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({
    data: { name, passwordHash, role: "HEAD" },
  });

  console.log(`Head admin "${admin.name}" created.`);
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
