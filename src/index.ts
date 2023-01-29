import dotenv from "dotenv";
dotenv.config();
import { Command, Option } from "commander";
import { migrateDown } from "./commands/migrate-down";
import { migrateToLatest } from "./commands/migrate-latest";
import { generateKyselyClient } from "./client";
import { createNewMigration } from "./commands/migrate-new";
import { generateFoldersIfNotExists } from "./generateFolders";

const program = new Command();

const migrateCommands = program
  .command("migrate")
  .version("0.1.0")
  .description("Commands for database migrations");

const dbOption = new Option(
  "--databaseUrl <databaseUrl>",
  "Optional database URL. Defaults to `DATABASE_URL` environment variable."
).default(process.env.DATABASE_URL, "DATABASE_URL environment variable");

interface Options {
  databaseUrl: string;
}

migrateCommands
  .command("up")
  .description("Applies every up migration on the database.")
  .addOption(dbOption)
  .action(async (options: Options) => {
    const kyselyClient = await generateKyselyClient(options);
    await generateFoldersIfNotExists();
    await migrateToLatest(kyselyClient);
    await kyselyClient.destroy();
  });

migrateCommands
  .command("down")
  .description("Applies every down migration on the database.")
  .addOption(dbOption)
  .action(async (options: Options) => {
    const kyselyClient = await generateKyselyClient(options);

    await generateFoldersIfNotExists();
    await migrateDown(kyselyClient);
    await kyselyClient.destroy();
  });

migrateCommands
  .command("reset")
  .description(
    "Resets the database by applying all down migrations and then all up migrations."
  )
  .addOption(dbOption)
  .action(async (options: Options) => {
    const kyselyClient = await generateKyselyClient(options);

    await generateFoldersIfNotExists();
    await migrateDown(kyselyClient);
    await migrateToLatest(kyselyClient);
    await kyselyClient.destroy();
  });

migrateCommands
  .command("new")
  .description("Creates a new migration file.")
  .argument("<migration_name>")
  .addOption(dbOption)
  .action(async (migrationName: string, options) => {
    await generateFoldersIfNotExists();
    await createNewMigration(migrationName);
  });

program.parse();
