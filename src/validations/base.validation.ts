export function isNullOrEmpty(value: string): boolean {
  if (!value || value.trim().length === 0) return true;
  return false;
}

export function isInEnum(value: any, enumType: Object): boolean {
  if (!value) return false;
  return Object.values(enumType).includes(value);
}

export function isObjectId(value: any): boolean {
  return typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value);
}
