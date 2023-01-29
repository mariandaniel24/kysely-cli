import * as path from "path";
import { promises as fs } from "fs";
import { Migrator, FileMigrationProvider, Kysely } from "kysely";
import { MIGRATIONS_PATH } from "../constants";

export async function migrateToLatest(kyselyClient: Kysely<any>) {
  const migrator = new Migrator({
    db: kyselyClient,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: MIGRATIONS_PATH,
    }),
  });
  console.log("\nRunning up migrations...");
  const { error, results = [] } = await migrator.migrateToLatest();

  for (const result of results) {
    if (result.status === "Success") {
      console.log(`✅ Up "${result.migrationName}" was executed successfully`);
    } else if (result.status === "Error") {
      console.error(`❌ Down: "${result.migrationName}"`);
    }
  }

  if (error) {
    console.error("Failed to apply all up migrations...");
    console.error(error);
    process.exit(1);
  }

  console.log("Successfully applied up migrations.\n");
}
