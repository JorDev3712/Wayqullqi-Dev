const fs = require('fs');
const path = require('path');
const chalk = require("chalk");

const logsDir = path.join(__dirname, '../logs');

const DEBUG_MODE = ["true", "1", "yes"].includes(process.env.DEBUG_MODE?.toLowerCase());

// Asegurar que exista la carpeta logs
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// 🧩 Formatea el mensaje
function formatMessage(message, ...objs) {
  let formatted = message;
  objs.forEach((obj, index) => {
    const value = typeof obj === 'object' ? JSON.stringify(obj, null, 2) : obj;
    formatted = formatted.replace(`{${index}}`, value);
  });
  return formatted;
}

// 🕒 Obtiene timestamp legible
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').split('.')[0];
}

// 🧾 Escribe logs en archivo por fecha
function writeToFile(level, message) {
  const date = new Date();
  const fileName = `${date.toISOString().split('T')[0]}.log`; // Ej: 2025-10-05.log
  const filePath = path.join(logsDir, fileName);

  const logLine = `[${level}] (${getTimestamp()}) ${message}\n`;
  fs.appendFile(filePath, logLine, err => {
    if (err) console.error('❌ Error escribiendo log:', err);
  });
}

// 🎨 Definición del logger
const logger = {
  information(message, ...objs) {
    const msg = formatMessage(message, ...objs);
    console.log(chalk.cyan(`[INFO] (${getTimestamp()})`), msg);
    writeToFile('INFO', msg);
  },

  debug(message, ...objs) {
    if (DEBUG_MODE){
        const msg = formatMessage(message, ...objs);
        console.log(chalk.gray(`[DEBUG] (${getTimestamp()})`), msg);
        writeToFile('DEBUG', msg);
    }
  },

  warning(message, ...objs) {
    const msg = formatMessage(message, ...objs);
    console.log(chalk.yellow(`[WARN] (${getTimestamp()})`), msg);
    writeToFile('WARN', msg);
  },

  error(message, ...objs) {
    const msg = formatMessage(message, ...objs);
    console.log(chalk.red(`[ERROR] (${getTimestamp()})`), msg);
    writeToFile('ERROR', msg);
  },
};

if (DEBUG_MODE){
    logger.information('Debug mode running!')   
}

module.exports = logger;