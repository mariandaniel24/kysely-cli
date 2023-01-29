import { writeFile } from "fs/promises";
import { MIGRATIONS_PATH } from "../constants";

const template = `import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Write the up migration here.
}

export async function down(db: Kysely<any>): Promise<void> {
  // Write the down migration here.
}`;

export async function createNewMigration(migrationFileName: string) {
  const file = `${MIGRATIONS_PATH}/${Date.now()}_${migrationFileName}.ts`;
  await writeFile(file, template, { encoding: "utf-8" });
  console.log(`Successfully created a new migration at ${file}`);
}
