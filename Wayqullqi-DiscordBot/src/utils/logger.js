const fs = require('fs');
const path = require('path');
const chalk = require("chalk");

const logsDir = path.join(__dirname, '../logs');

const date = new Date();
const fileName = `${date.toISOString().split('T')[0]}.log`; // Ej: 2025-10-05.log
const filePath = path.join(logsDir, fileName);

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
  const logLine = `(${getTimestamp()}) [${level}] ${message}\n`;
  fs.appendFile(filePath, logLine, err => {
    if (err) console.error('❌ Error escribiendo log:', err);
  });
}

// 🎨 Definición del logger
class Logger {
  constructor(name){
    this.contextName = name;
  }

  information(message, ...objs) {
    const msg = formatMessage(message, ...objs);
    console.log(chalk.cyan(`(${getTimestamp()}) [INFO:${this.contextName}]`), msg);
    writeToFile(`INFO:${this.contextName}`, msg);
  }

  log(message, ...objs){
    const msg = formatMessage(message, ...objs);
    console.log(chalk.gray(`${msg}`));
    writeToFile(`LOG:${this.contextName}`, msg);
  }

  debug(message, ...objs) {
    if (DEBUG_MODE){
        const msg = formatMessage(message, ...objs);
        console.log(chalk.magenta(`(${getTimestamp()}) [DEBUG:${this.contextName}]`), msg);
        writeToFile(`DEBUG:${this.contextName}`, msg);
    }
  }

  warning(message, ...objs) {
    const msg = formatMessage(message, ...objs);
    console.log(chalk.yellow(`(${getTimestamp()}) [WARN:${this.contextName}]`), msg);
    writeToFile(`WARN:${this.contextName}`, msg);
  }

  error(message, ...objs) {
    const msg = formatMessage(message, ...objs);
    console.log(chalk.red(`(${getTimestamp()}) [ERROR:${this.contextName}]`), msg);
    writeToFile(`ERROR:${this.contextName}`, msg);
  }

  createContext(ctx_name){
    return new Logger(ctx_name);
  }
};

module.exports = new Logger('root');