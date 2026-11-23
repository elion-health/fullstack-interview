#!/bin/bash
set -euo pipefail

# Run from the repository root, like the README setup commands.
echo "Verifying application setup..."

if ! docker info > /dev/null 2>&1; then
  echo "Docker is not running. Start Docker Desktop."
  exit 1
fi

if ! docker compose ps --status running --services | grep -qx postgres; then
  echo "PostgreSQL is not running. Run: docker compose up -d --wait"
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Dependencies are missing. Run: npm ci"
  exit 1
fi

# Use the same configuration as the app and CLI, including any remapped port.
# The pg dependency avoids requiring a separate host installation of psql.
node <<'NODE'
const { config } = require("dotenv");
const { Client } = require("pg");
config({ path: ".env.local", quiet: true });

async function verifyDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing. Copy .env.example to .env.local and configure the local database.");
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000,
    query_timeout: 5000,
  });
  try {
    await client.connect();
    console.log("Database connection successful.");
    const { rows } = await client.query(`
      SELECT
        (SELECT count(*) FROM public."user") AS users,
        (SELECT count(*) FROM public.health_system) AS health_systems,
        (SELECT count(*) FROM public.vendor) AS vendors,
        (SELECT count(*) FROM public.product) AS products
    `);
    if (Object.values(rows[0]).some((count) => Number(count) === 0)) {
      throw new Error("Seed data is missing. Run npm run db:seed against your local development database.");
    }
    console.log("Schema and seed data verified:", rows[0]);
  } catch (error) {
    if (error.code === "42P01") {
      throw new Error("Schema is missing. Run npm run db:migrate:up, then npm run db:seed.");
    }
    // Connection errors can contain credentials; do not print the raw error.
    if (error.message.startsWith("Seed data is missing.")) throw error;
    throw new Error("Database check failed. Check Docker, DATABASE_URL, and the mapped port.");
  } finally {
    await client.end();
  }
}

verifyDatabase().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
NODE

# Keep diagnostics visible so setup failures are actionable.
npm run build

echo "Setup verification complete. Start the app with: npm run dev"
echo "Then open http://localhost:3000."
