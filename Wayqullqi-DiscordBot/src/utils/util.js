function safeValueToString(value) {
  if (value === null || value === undefined) return '—';
  if (typeof value === 'bigint') return value.toString();
  if (typeof value === 'boolean') return value ? 'Sí' : 'No';
  return String(value);
}

function checkOnlyLetters(value, length) {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  return regex.test(value) && value.length <= length;
}

function checkDescriptionLetters(value, length) {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s.-]+$/;
  return regex.test(value) && value.length <= length;
}

function checkOnlyNumber(value, length) {
  const regex = /^[0-9]+(\.[0-9]+)?$/;
  return regex.test(value) && value.length <= length;
}

function checkNumber(value, length) {
  const regex = /^[0-9]+$/;
  return regex.test(value) && value.length <= length;
}

function checkHourFormat(value, length) {
  // Formato HH:MM (00–23 y 00–59)
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  return regex.test(value) && value.length <= length;
}

function createDateString(locale, year, month, day){
  const date = new Date(year, month - 1, day);
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };

  return date.toLocaleDateString(locale, options);
}

function getDateString(locale, date) {
  const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
  return date.toLocaleDateString(locale, options);
}

function getMonthDateString(locale, year, month, day){
  const date = new Date(year, month - 1, day);
  const options = {
    month: 'long',
  };

  return date.toLocaleDateString(locale, options);
}

function buildTable(headers, rows, maxColWidth = 30) {
  // 1️⃣ Determinar el ancho máximo de cada columna
  const colWidths = headers.map((header, i) => {
    const maxRowWidth = Math.max(
      ...rows.map(row => String(row[i] ?? '').length),
      header.length
    );
    return Math.min(maxRowWidth, maxColWidth);
  });

  // 2️⃣ Función para truncar texto con "…"
  const truncate = (text, width) => {
    text = String(text);
    return text.length > width ? text.slice(0, width - 1) + "…" : text;
  };

  // 3️⃣ Función para alinear texto centrado o izquierda
  const pad = (text, width) => {
    text = truncate(text, width);
    const padding = width - text.length;
    return text + " ".repeat(padding);
  };

  // 4️⃣ Construir encabezados y separadores
  const headerLine = headers.map((h, i) => pad(h, colWidths[i])).join(" │ ");
  const separator = colWidths.map(w => "─".repeat(w)).join("─┼─");

  // 5️⃣ Construir filas del cuerpo
  const body = rows
    .map(row =>
      row.map((v, i) => pad(v, colWidths[i])).join(" │ ")
    )
    .join("\n");

  // 6️⃣ Armar la tabla final con formato de bloque para Discord
  return "```\n" + headerLine + "\n" + separator + "\n" + body + "\n```";
}

module.exports = { safeValueToString, checkOnlyLetters, checkDescriptionLetters, checkOnlyNumber, checkNumber, createDateString, checkHourFormat, getMonthDateString, getDateString, buildTable};
