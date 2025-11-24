import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { User } from "./entities/User";
import { HealthSystem } from "./entities/HealthSystem";
import { Vendor } from "./entities/Vendor";
import { Product } from "./entities/Product";

// Load environment variables from .env.local
import { config as dotenvConfig } from "dotenv";
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
