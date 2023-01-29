import * as path from "path";
import { promises as fs } from "fs";
import { Migrator, FileMigrationProvider, NO_MIGRATIONS, Kysely } from "kysely";
import { MIGRATIONS_PATH } from "../constants";

export async function migrateDown(kyselyClient: Kysely<any>) {
  const migrator = new Migrator({
    db: kyselyClient,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: MIGRATIONS_PATH,
    }),
  });

  console.log("\nRunning down migrations...");
  const { error, results } = await migrator.migrateTo(NO_MIGRATIONS);

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`✅ Down: "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`❌ Down: "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("Failed to apply down migrations...");
    console.error(error);
    process.exit(1);
  }

  console.log("Successfully applied all down migrations.\n");
}
