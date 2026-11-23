import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
// Load environment variables from .env.local
import { config as dotenvConfig } from "dotenv";
import { HealthSystem } from "./entities/HealthSystem";
import { Product } from "./entities/Product";
import { User } from "./entities/User";
import { Vendor } from "./entities/Vendor";

dotenvConfig({ path: ".env.local" });

export default defineConfig({
  entities: [User, HealthSystem, Vendor, Product],
  clientUrl: process.env.DATABASE_URL,
  extensions: [Migrator],
  migrations: {
    path: "./db/migrations",
    pathTs: "./db/migrations",
  },
  schemaGenerator: {
    disableForeignKeys: false,
  },
  schema: "public",
  debug: process.env.NODE_ENV === "development",
});
