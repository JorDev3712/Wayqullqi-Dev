export function safeValueToString(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return String(value);
}

export function checkOnlyLetters(value: string, length: number): boolean {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  return regex.test(value) && value.length <= length;
}

export function checkDescriptionLetters(value: string, length: number): boolean {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s.-]+$/;
  return regex.test(value) && value.length <= length;
}

export function checkOnlyNumber(value: any, length: number): boolean {
  const regex = /^[0-9]+(\.[0-9]+)?$/;
  return regex.test(value.toString()) && value.toString().length <= length;
}

export function checkNumber(value: any, length: number): boolean {
  const regex = /^[0-9]+$/;
  return regex.test(value.toString()) && value.toString().length <= length;
}

export function checkHourFormat(value: any, length: number): boolean {
  // Formato HH:MM (00–23 y 00–59)
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  return regex.test(value.toString()) && value.toString().length <= length;
}
