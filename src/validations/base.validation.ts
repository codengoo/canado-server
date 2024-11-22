export function isNullOrEmpty(value: string): boolean {
  if (!value || value.trim().length === 0) return true;
  return false;
}
