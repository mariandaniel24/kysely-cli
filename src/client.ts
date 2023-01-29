import { CamelCasePlugin, Kysely, PostgresDialect, sql } from "kysely";
import { Pool } from "pg";
import { Options } from "./types/options";

/*
  This function is used to generate a Kysely client with the given options.
  It is used in the CLI to connect to the database.
  * @internal 
*/
export async function generateKyselyClient(options: Options) {
  try {
    const client = new Kysely({
      dialect: new PostgresDialect({
        pool: new Pool({
          connectionString: options.databaseUrl,
        }),
      }),
      plugins: [new CamelCasePlugin()],
    });
    // Test connection
    await sql`SELECT 1`.execute(client);
    return client;
  } catch (error) {
    throw new Error(
      `Failed to connect to database with given URL: ${options.databaseUrl}`
    );
  }
}
