// import fs from "fs";
// import path from "path";

// const __dirname = process.cwd();

// const logsDir: string = path.join(__dirname, "../logs");

// const date: Date = new Date();
// export const fileName: string = `${date.toISOString().split("T")[0]}.log`;
// export const filePath: string = path.join(logsDir, fileName);

// export const DEBUG_MODE: boolean = ["true", "1", "yes"].includes(
//   process.env.DEBUG_MODE?.toLowerCase() ?? "no"
// );

// // Asegurar que exista la carpeta logs
// if (!fs.existsSync(logsDir)) {
//   fs.mkdirSync(logsDir, { recursive: true });
// }

// // 🧩 Formatea el mensaje
// export function formatMessage(message: string, ...objs: unknown[]): string {
//   let formatted = message;

//   objs.forEach((obj, index) => {
//     const value =
//       typeof obj === "object" ? JSON.stringify(obj, null, 2) : String(obj);
//     formatted = formatted.replace(`{${index}}`, value);
//   });

//   return formatted;
// }

// // 🕒 Obtiene timestamp legible
// export function getTimestamp(): string {
//   return new Date().toISOString().replace("T", " ").split(".")[0];
// }

// // 🧾 Escribe logs en archivo
// export function writeToFile(level: string, message: string): void {
//   const logLine = `[${level}] (${getTimestamp()}) ${message}\n`;

//   fs.appendFile(filePath, logLine, (err) => {
//     if (err) {
//       console.error("❌ Error escribiendo log:", err);
//     }
//   });
// }
