import chalk from "chalk";
import fs from "fs";
import path from "path";

const logsDir: string = path.join(__dirname, "../logs");

const date: Date = new Date();
const fileName: string = `${date.toISOString().split("T")[0]}.log`;
const filePath: string = path.join(logsDir, fileName);

const DEBUG_MODE: boolean = ["true", "1", "yes"].includes(
  process.env.DEBUG_MODE?.toLowerCase() ?? "no"
);

// Asegurar que exista la carpeta logs
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

export class Logger {
  private contextName: string;

  constructor(name: string) {
    this.contextName = name;
  }

  private getTimestamp(): string {
    return new Date().toISOString().replace("T", " ").split(".")[0];
  }

  // 🧾 Escribe logs en archivo
  private writeToFile(level: string, message: string): void {
    const logLine = `(${this.getTimestamp()}) [${level}] ${message}\n`;

    fs.appendFile(filePath, logLine, (err) => {
      if (err) {
        console.error("❌ Error escribiendo log:", err);
      }
    });
  }
  
  private formatMessage(message: string, ...objs: unknown[]): string {
    let formatted = message;

    objs.forEach((obj, index) => {
      const value =
        typeof obj === "object" ? JSON.stringify(obj, null, 2) : String(obj);
      formatted = formatted.replace(`{${index}}`, value);
    });

    return formatted;
  }

  public information(message: string, ...objs: unknown[]): void {
    const msg = this.formatMessage(message, ...objs);
    console.log(
      chalk.cyan(`(${this.getTimestamp()}) [INFO:${this.contextName}]`),
      msg
    );
    this.writeToFile(`INFO:${this.contextName}`, msg);
  }

  public log(message: string, ...objs: unknown[]): void {
    const msg = this.formatMessage(message, ...objs);
    console.log(chalk.gray(msg));
    this.writeToFile(`LOG:${this.contextName}`, msg);
  }

  public debug(message: string, ...objs: unknown[]): void {
    if (!DEBUG_MODE) return;

    const msg = this.formatMessage(message, ...objs);
    console.log(
      chalk.magenta(`(${this.getTimestamp()}) [DEBUG:${this.contextName}]`),
      msg
    );
    this.writeToFile(`DEBUG:${this.contextName}`, msg);
  }

  public warning(message: string, ...objs: unknown[]): void {
    const msg = this.formatMessage(message, ...objs);
    console.log(
      chalk.yellow(`(${this.getTimestamp()}) [WARN:${this.contextName}]`),
      msg
    );
    this.writeToFile(`WARN:${this.contextName}`, msg);
  }

  public error(message: string, ...objs: unknown[]): void {
    const msg = this.formatMessage(message, ...objs);
    console.log(
      chalk.red(`(${this.getTimestamp()}) [ERROR:${this.contextName}]`),
      msg
    );
    this.writeToFile(`ERROR:${this.contextName}`, msg);
  }

  public createContext(ctxName: string): Logger {
    return new Logger(ctxName);
  }
}

const rootLogger = new Logger("ROOT");
export default rootLogger;
