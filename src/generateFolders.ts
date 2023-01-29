import fs from "fs/promises";
import { MIGRATIONS_PATH } from "./constants";

export async function generateFoldersIfNotExists() {
  try {
    await fs.mkdir(MIGRATIONS_PATH, { recursive: true });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
