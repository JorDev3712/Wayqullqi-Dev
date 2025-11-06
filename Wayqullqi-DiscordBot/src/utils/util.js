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

function checkOnlyNumber(value, length) {
  const regex = /^[0-9]+(\.[0-9]+)?$/;
  return regex.test(value) && value.length <= length;
}

module.exports = { safeValueToString, checkOnlyLetters, checkOnlyNumber };
