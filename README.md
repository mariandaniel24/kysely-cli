Here is a sample README.md file that explains the Kysely CLI tool:
Kysely CLI Tool

Kysely CLI is a tool used to generate and execute migrations for [Kysely](https://github.com/koskimas/kysely).
Usage

```bash

Usage: kysely-cli [options] [command]

Options:
  -V, --version     output the version number
  -h, --help        display help for command

Commands:
  migrate            Commands for database migrations
  help [command]     display help for command
```

Migrate Commands

The migrate command is used for database migrations. You can use the following sub-commands:

```bash
Usage: kysely-cli migrate [command]
Commands:
  up                 Applies every up migration on the database.
  down               Applies every down migration on the database.
  reset              Resets the database by applying all down migrations and then all up migrations.
  new <migration_name> Creates a new migration file.
  help [command]     display help for command
```

Global options:
```
--databaseUrl some-db-connection-string    If not specified, it defaults to the environment variable `DATABASE_URL` 
```
