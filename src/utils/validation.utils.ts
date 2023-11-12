/* eslint-disable @typescript-eslint/no-unused-vars */
export function isValidEmail(email): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidNotEmpty(value): boolean {
  // check if string is empty or null or undefined and '' return false
  return value && value.trim().length > 0;
}

export function isValidNumber(value): boolean {
  return !isNaN(value);
}

export function isValidDate(value): boolean {
  return !isNaN(Date.parse(value));
}

export function isValidBoolean(value): boolean {
  return typeof value === 'boolean';
}

export function isValidArray(value): boolean {
  return Array.isArray(value);
}

export function isValidObject(value): boolean {
  return typeof value === 'object';
}

export function isValidString(value): boolean {
  return typeof value === 'string';
}

export function isValidJSON(value): boolean {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }

  return true;
}

export function isValidAlpha(value): boolean {
  return /^[a-zA-Z]+$/.test(value);
}

export function isValidAlphaNumeric(value): boolean {
  return /^[a-zA-Z0-9]+$/.test(value);
}

export function isValidText(value): boolean {
  return /^[a-zA-Z0-9 ]+$/.test(value);
}
