import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { User } from "./entities/User";
import { HealthSystem } from "./entities/HealthSystem";
import { Vendor } from "./entities/Vendor";

export default defineConfig({
  entities: [User, HealthSystem, Vendor],
  host: "localhost",
  port: 5432,
  dbName: "elion_interview",
  user: "elion",
  password: "elion_dev_password",
  extensions: [Migrator],
  migrations: {
    path: "./db/migrations",
    pathTs: "./db/migrations",
  },
  debug: process.env.NODE_ENV === "development",
});
