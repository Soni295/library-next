export function stringToNumber(str: string) {
  const a = parseInt(str, 10);
  return isNaN(a) ? -1 : a;
}
