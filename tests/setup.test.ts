import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join, resolve } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const script = resolve("verify-setup.sh");
let directory: string;

beforeAll(() => {
  directory = mkdtempSync(join(tmpdir(), "setup-test-"));
  mkdirSync(join(directory, "bin"));
  mkdirSync(join(directory, "node_modules", "dotenv"), { recursive: true });
  mkdirSync(join(directory, "node_modules", "pg"));
  writeFileSync(
    join(directory, "bin", "docker"),
    '#!/bin/sh\nif [ "$1" = "info" ]; then exit 0; fi\nif [ "$*" = "compose ps --status running --services" ]; then echo postgres; exit 0; fi\nexit 1\n',
    { mode: 0o755 },
  );
  writeFileSync(
    join(directory, "bin", "npm"),
    '#!/bin/sh\necho BUILD_CALLED\nif [ "$SETUP_TEST_CASE" = "build-failure" ]; then exit 1; fi\n',
    { mode: 0o755 },
  );
  writeFileSync(
    join(directory, "node_modules", "dotenv", "index.js"),
    "exports.config = () => {};",
  );
  writeFileSync(
    join(directory, "node_modules", "pg", "index.js"),
    `exports.Client = class {
      constructor(options) {
        if (options.connectionString !== process.env.DATABASE_URL) {
          throw new Error("Configured URL was not used");
        }
      }
      async connect() {
        if (process.env.SETUP_TEST_CASE === "connection-failure") {
          throw new Error("do-not-leak-credentials");
        }
      }
      async query() {
        if (process.env.SETUP_TEST_CASE === "missing-schema") {
          throw Object.assign(new Error("Missing relation"), { code: "42P01" });
        }
        return { rows: [{ users: "4", health_systems: "5", vendors: "8",
          products: process.env.SETUP_TEST_CASE === "missing-seed" ? "0" : "24" }] };
      }
      async end() {}
    };`,
  );
});

afterAll(() => rmSync(directory, { recursive: true, force: true }));

function verify(
  testCase = "success",
  databaseURL = "postgresql://localhost:6543/app",
) {
  return spawnSync("bash", [script], {
    cwd: directory,
    encoding: "utf8",
    timeout: 10000,
    env: {
      ...process.env,
      PATH: [join(directory, "bin"), process.env.PATH].join(delimiter),
      DATABASE_URL: databaseURL,
      SETUP_TEST_CASE: testCase,
    },
  });
}

describe("setup verification", () => {
  it("uses the configured database and runs the build after checking seed data", () => {
    const result = verify();
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Schema and seed data verified");
    expect(result.stdout).toContain("BUILD_CALLED");
    expect(result.stdout).toContain("Setup verification complete");
  });

  it.each([
    ["missing-schema", "Schema is missing"],
    ["missing-seed", "Seed data is missing"],
    ["connection-failure", "Database check failed"],
  ])("fails before the build for %s", (testCase, message) => {
    const result = verify(testCase);
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain(message);
    expect(result.stderr).not.toContain("do-not-leak-credentials");
    expect(result.stdout).not.toContain("BUILD_CALLED");
    expect(result.stdout).not.toContain("Setup verification complete");
  });

  it("reports missing configuration", () => {
    const result = verify("success", "");
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("DATABASE_URL is missing");
    expect(result.stdout).not.toContain("BUILD_CALLED");
  });

  it("does not report success when the build fails", () => {
    const result = verify("build-failure");
    expect(result.status).not.toBe(0);
    expect(result.stdout).toContain("BUILD_CALLED");
    expect(result.stdout).not.toContain("Setup verification complete");
  });
});
