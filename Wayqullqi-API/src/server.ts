import app from "./app";
import dotenv from "dotenv";
import { db } from "./infrastructure/database/db";

dotenv.config();

import log from "./utils/logger";
// const logger = log.createContext('APP');

const PORT = process.env.API_PORT || 3000;

async function main() {
  try {
    await db.$connect();
    app.listen(PORT, () => log.information(`🚀 API corriendo en puerto ${PORT}`));
  } catch (error) {
    log.error("❌ Error al iniciar: {0}", error);
  }
}

main();