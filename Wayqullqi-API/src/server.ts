import app from "./app";
import dotenv from "dotenv";
import { db } from "./infrastructure/database/db";

dotenv.config();

const PORT = process.env.API_PORT || 3000;

async function main() {
  try {
    await db.$connect();
    app.listen(PORT, () => console.log(`🚀 API corriendo en puerto ${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar:", error);
  }
}

main();