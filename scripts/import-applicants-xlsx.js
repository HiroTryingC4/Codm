// One-time import of a member roster xlsx (Google Forms export) into the Applicant table.
// Rows are inserted with status "ACCEPTED" and no tryout-specific data, since this
// roster wasn't collected through the tryout form.
// Usage: node scripts/import-applicants-xlsx.js "LAST GAME RESPONSES.xlsx"
const path = require("path");
const XLSX = require("xlsx");
const { PrismaClient } = require("@prisma/client");

const COLUMN_MAP = {
  fbName: "FB NAME (ex: Juan Dela Cruz)",
  inGameName: "IN GAME NAME (ex: LG | JUAN)",
  streamerMode: "STREAMER MODE (ex: 7QxxYwd891)",
  uid: "UID (ex: 6798543213456789)",
  cityProvince: "CITY / PROVINCE",
};

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node scripts/import-applicants-xlsx.js "path/to/file.xlsx"');
    process.exit(1);
  }

  const wb = XLSX.readFile(path.resolve(file));
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

  const records = rows.map((row) => ({
    game: "MP",
    inGameName: String(row[COLUMN_MAP.inGameName] ?? "").trim(),
    uid: String(row[COLUMN_MAP.uid] ?? "").trim(),
    fbName: String(row[COLUMN_MAP.fbName] ?? "").trim(),
    cityProvince: String(row[COLUMN_MAP.cityProvince] ?? "").trim(),
    streamerMode: row[COLUMN_MAP.streamerMode] ? String(row[COLUMN_MAP.streamerMode]).trim() : null,
    status: "ACCEPTED",
  }));

  const skipped = records.filter((r) => !r.inGameName || !r.uid);
  const toInsert = records.filter((r) => r.inGameName && r.uid);

  if (skipped.length) {
    console.warn(`Skipping ${skipped.length} row(s) missing inGameName or uid.`);
  }

  const prisma = new PrismaClient();
  const result = await prisma.applicant.createMany({ data: toInsert });
  console.log(`Inserted ${result.count} applicant(s) from ${toInsert.length} eligible row(s).`);
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
